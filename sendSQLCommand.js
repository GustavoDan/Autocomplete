const NBSP = String.fromCharCode(160);
const DATE_DB_FORMAT = "yyyy-MM-dd";
const DATE_DISPLAY_FORMAT = "dd/MM/yyyy";
const RUN_COMMAND_BACKEND_URL = "./database/run_command.php";

function sendRunCommandRequest() {
  new Tabulator("#result-area", {
    ajaxURL: RUN_COMMAND_BACKEND_URL,
    ajaxParams: {
      command: queryInput.innerText.replaceAll(NBSP, " "),
    },
    layout: "fitColumns",
    movableColumns: true,
    clipboard: true,
    autoColumns: true,
    autoColumnsDefinitions: getColumnDefinitions,
  });
}

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function getColumnDefinitions(definitions) {
  definitions.forEach((column) => {
    column.headerFilter = true;
    column.title = titleCase(column.field.replace("_", " "));
    column.hozAlign = "center";
    column.headerHozAlign = "center";
    column.vertAlign = "middle";
    column.resizable = false;

    if (column.field.toLowerCase().includes("data")) {
      column.formatter = "datetime";
      column.formatterParams = {
        inputFormat: DATE_DB_FORMAT,
        outputFormat: DATE_DISPLAY_FORMAT,
        invalidPlaceholder: "-",
      };
    }
  });

  return definitions;
}

const queryInput = document.querySelector("#query-input");
const sendButton = document.querySelector("#send-button");

sendButton.addEventListener("click", sendRunCommandRequest);
