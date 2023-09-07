import autocompleteData from "./autocompleteData.js";

const AUTOCOMPLETE_DEFAULT_LEFT_MARGIN = 15;
const NBSP = String.fromCharCode(160);
const REGEX = {
  IS_VAR: /^\{.*\}$/,
  GET_BRACES: /[\{\}]/g,
};

function matchCase(str1, str2) {
  return str1.slice(-1) === str1.slice(-1).toUpperCase()
    ? str2.toUpperCase()
    : str2.toLowerCase();
}

function nonEmptyStartsWith(strCompare, strStart, caseSensitive = false) {
  if (!caseSensitive) {
    strCompare = strCompare.toUpperCase();
    strStart = strStart.toUpperCase();
  }

  return strStart !== "" && strCompare.startsWith(strStart);
}

function trimIncludingNBSP(str) {
  return str?.replaceAll(NBSP, " ").trim() || "";
}

function clearElements() {
  [...arguments].forEach((element) => (element.innerHTML = ""));
}

function setCaret(input) {
  let range = document.createRange();
  let sel = window.getSelection();

  range.setStart(input.childNodes[input.childNodes.length - 1], 1);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
}

const bodyKeyDownOptions = {
  Escape(args) {
    clearElements(sugestionList);
  },
  Enter(args) {
    args.event.preventDefault();
    completeText();
  },
  Tab(args) {
    args.event.preventDefault();
    completeText();
  },
  ArrowDown(args) {
    if (sugestionList.innerHTML === "") {
      populateSugestionList(false);
    }

    if (args.selectedOption && args.selectedOption.nextElementSibling) {
      setSelection(args.selectedOption.nextElementSibling);
      return;
    }

    setSelection(sugestionList.firstElementChild);
  },
  ArrowUp(args) {
    if (sugestionList.innerHTML === "") {
      populateSugestionList(false);
    }

    if (args.selectedOption && args.selectedOption.previousElementSibling) {
      setSelection(args.selectedOption.previousElementSibling);
      return;
    }

    setSelection(sugestionList.lastElementChild);
  },
};

function completeText() {
  if (autocomplete.textContent === "") {
    return;
  }

  let newLevel = document.createElement("span");
  newLevel.id = `level-${getCurrentLevel()}`;
  let currentText = "";

  if (queryInput.textContent !== "") {
    let textNode = queryInput.lastChild;
    currentText = trimIncludingNBSP(textNode.textContent);
    textNode.remove();
  }

  if (queryInput.querySelector("span")) {
    queryInput.append(NBSP);
  }

  newLevel.textContent = currentText + autocomplete.textContent;
  newLevel.setAttribute("value", getSelectedOption().getAttribute("value"));

  queryInput.append(newLevel);

  queryInput.append(NBSP);
  clearElements(sugestionList, autocomplete);

  setCaret(queryInput);
}

function getSelectedOption() {
  return sugestionList.querySelector("[selected]");
}

function populateSugestionList(matchText = true) {
  clearElements(sugestionList, autocomplete);
  iterateOptions(getCurrentKeys(), matchText);

  if (sugestionList.firstChild) {
    setSelection(sugestionList.firstChild);
  }
}

function getCurrentKeys() {
  let currentLevel = getCurrentLevel();

  let currentKeys = autocompleteData;
  if (currentLevel != 0) {
    let levels = getLevelsArray();
    levels.forEach((level) => {
      level = level.getAttribute("value");
      let matchingKeys = Object.keys(currentKeys).filter((key) =>
        key.split(", ").includes(level.toUpperCase())
      );

      currentKeys = currentKeys[level] || currentKeys[matchingKeys[0]];
    });
  }

  return Object.keys(currentKeys).flatMap((key) => key.split(", "));
}

function getLevelsArray() {
  return [...queryInput.querySelectorAll("[id^='level-']")];
}

function getCurrentLevel() {
  let levels = getLevelsArray();
  if (levels.length < 1) {
    return 0;
  }

  let currentLevel = levels.slice(-1)[0].id.split("-")[1];
  return parseInt(currentLevel) + 1;
}

function iterateOptions(options, matchText, value) {
  let currentText = trimIncludingNBSP(
    queryInput.lastChild?.textContent.toUpperCase()
  );

  options.forEach((option) => {
    if (REGEX.IS_VAR.test(option)) {
      iterateOptions(splitVarValues(option), matchText, option);
      return;
    }

    if (matchText && !nonEmptyStartsWith(option, currentText)) {
      return;
    }

    createOption(option, value);
  });
}

function splitVarValues(autocompleteVar) {
  autocompleteVar = autocompleteVar.replace(REGEX.GET_BRACES, "");
  autocompleteVar = sugestionList.getAttribute(`data-${autocompleteVar}`);
  return autocompleteVar.split(",");
}

function createOption(key, value = key) {
  let option = document.createElement("div");
  option.classList.add("sugestion-option");
  option.setAttribute("value", value);
  option.textContent = key.toUpperCase();

  sugestionList.append(option);

  return option;
}

function setSelection(element) {
  clearOptions();
  element.setAttribute("selected", "");
  setAutocompleteText();
}

function clearOptions() {
  [...sugestionList.children].forEach((child) => removeSelection(child));
}

function removeSelection(element) {
  element.removeAttribute("selected");
}

function setAutocompleteText() {
  let currentText = trimIncludingNBSP(queryInput.lastChild?.textContent);
  let selectedOptionText = getSelectedOption().textContent;

  autocomplete.textContent = matchCase(
    currentText,
    selectedOptionText.slice(currentText.length)
  );

  setAutocompletePosition();
}

function setAutocompletePosition() {
  let autocompleteMargin =
    AUTOCOMPLETE_DEFAULT_LEFT_MARGIN + (autocomplete.textContent === "" && 12);
  autocomplete.style.left = `${getTextWidth() + autocompleteMargin}px`;
}

function getTextWidth() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font = window.getComputedStyle(queryInput).font;
  return context.measureText(queryInput.textContent).width;
}

function handleKeyboardSelectOption(event) {
  let selectedOption = getSelectedOption();
  let pressedFunction = bodyKeyDownOptions[event.key];
  console.log(event.key);

  if (pressedFunction) {
    bodyKeyDownOptions[event.key]({ event, selectedOption });
  }
}

function handleMouseSelectOption(event) {
  if (event.target.classList.contains("sugestion-option")) {
    setSelection(event.target);
  }
}

function matchOptionsToInputSize() {
  sugestionList.style.width = `${queryInput.getBoundingClientRect().width}px`;
}

const queryInput = document.querySelector("#query-input");
const autocomplete = document.querySelector("#autocomplete");
const sugestionList = document.querySelector("#sugestion-list");

queryInput.addEventListener("input", populateSugestionList);

document.body.addEventListener("keydown", (event) => {
  handleKeyboardSelectOption(event);
});

sugestionList.addEventListener("mousemove", (event) => {
  handleMouseSelectOption(event);
});

sugestionList.addEventListener("click", completeText);

new ResizeObserver(matchOptionsToInputSize).observe(queryInput);
