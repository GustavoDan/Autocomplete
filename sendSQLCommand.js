const NBSP = String.fromCharCode(160);
const DATE_DB_FORMAT = "yyyy-MM-dd";
const DATE_DISPLAY_FORMAT = "dd/MM/yyyy";
const RUN_COMMAND_BACKEND_URL = "./database/run_command.php";

function sendRunCommandRequest() {
    let command = queryInput.innerText.replaceAll(NBSP, " ");
    let isSelect = command.split(" ")[0].toUpperCase() === "SELECT";
    new Tabulator("#result-area", {
        ajaxURL: RUN_COMMAND_BACKEND_URL,
        ajaxParams: {
            command,
        },
        ajaxResponse: (_, __, response) => handleResponse(response),
        layout: "fitColumns",
        movableColumns: true,
        clipboard: true,
        autoColumns: true,
        autoColumnsDefinitions: (defs) => getColumnDefinitions(defs, isSelect),
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

function handleResponse(response) {
    if (response.length === 0) {
        response = [{ "No results found for this query": "-" }];
    } else if (response.returned_data?.length > 0) {
        response = response.returned_data;
    } else {
        delete response.returned_data;
        response = [response];
    }

    return response;
}

function getColumnDefinitions(definitions, isSelect) {
    let isFilledTable =
        isSelect &&
        definitions.length > 1 &&
        definitions[0].title !== "No results found for this query";

    definitions.forEach((column) => {
        column.headerFilter = isFilledTable;
        column.headerSort = isFilledTable;
        column.title = titleCase(column.field.replace("_", " "));
        column.hozAlign = "center";
        column.headerHozAlign = "center";
        column.vertAlign = "middle";
        column.resizable = false;
        column.formatter = "textarea";

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
