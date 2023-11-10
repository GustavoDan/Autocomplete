const NBSP = String.fromCharCode(160);
const DATE_DB_FORMAT = "yyyy-MM-dd";
const DATE_DISPLAY_FORMAT = "dd/MM/yyyy";

function sendRunCommandRequest() {
  new Tabulator("#result-area", {
    ajaxURL: "./database/run_command.php",
    ajaxParams: {
      command: queryInput.innerText.replaceAll(NBSP, " "),
    },
    layout: "fitColumns",
    movableColumns: true,
    clipboard: true,
    autoColumns: true,
    autoColumnsDefinitions: get_column_definitions,
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

function get_column_definitions(definitions) {
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
