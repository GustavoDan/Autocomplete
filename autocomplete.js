import autocompleteData from "./autocompleteData.js";

const AUTOCOMPLETE_DEFAULT_LEFT_MARGIN = 15;
const NBSP = String.fromCharCode(160);

function matchCase(str1, str2) {
  return str1.slice(-1) === str1.slice(-1).toUpperCase()
    ? str2.toUpperCase()
    : str2.toLowerCase();
}

function nonEmptyStartsWith(strCompare, strStart) {
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

  queryInput.append(newLevel);
  indexList.push(newLevel.textContent.toUpperCase());

  queryInput.append(NBSP);
  clearElements(sugestionList, autocomplete);

  setCaret(queryInput);
}

function populateSugestionList(matchText = true) {
  clearElements(sugestionList, autocomplete);
  let keys = getCurrentKeys();
  let options = keys;

  if (matchText) {
    let currentText = trimIncludingNBSP(
      queryInput.lastChild?.textContent.toUpperCase()
    );
    options = keys.filter((option) => nonEmptyStartsWith(option, currentText));
  }

  options.forEach((option) => createOption(option));

  if (options.length > 0) {
    setSelection(sugestionList.firstChild);
  }
}

function getCurrentKeys() {
  let currentLevel = getCurrentLevel();

  let currentKeys = autocompleteData;
  if (currentLevel != 0) {
    indexList.forEach((level) => {
      let matchingKeys = Object.keys(currentKeys).filter((key) =>
        key.split(", ").includes(level.toUpperCase())
      );

      currentKeys = currentKeys[level] || currentKeys[matchingKeys[0]];
    });
  }

  return Object.keys(currentKeys).flatMap((key) => key.split(", "));
}

function getCurrentLevel() {
  let levels = [...queryInput.querySelectorAll("[id^='level-']")];
  if (levels.length < 1) {
    return 0;
  }

  let currentLevel = levels.slice(-1)[0].id.split("-")[1];
  return parseInt(currentLevel) + 1;
}

function createOption(key) {
  let option = document.createElement("div");
  option.classList.add("sugestion-option");
  option.textContent = key;

  sugestionList.append(option);
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
  let selectedOptionText =
    sugestionList.querySelector("[selected]").textContent;

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
  let selectedOption = sugestionList.querySelector("[selected]");
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

var indexList = [];
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
