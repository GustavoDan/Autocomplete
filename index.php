<?php
include_once('head.php');
include_once('database/get_vars.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <link href="https://unpkg.com/tabulator-tables@5.5.2/dist/css/tabulator_semanticui.min.css" rel="stylesheet">

    <title>AutoComplete</title>
</head>

<body>
  <div id="content">
    <img src="./images/mysql_logo.png" />

    <div class="container">
      <div id="query-input" contenteditable></div>
      <span id="autocomplete"></span>
      <div id="sugestion-list" <?php foreach ($autocomplete_vars as $key => $value) {
                                  echo "data-$key=$value ";
                                } ?>></div>

      <button id="send-button">Executar</button>
    </div>
    <div id="result-area" >
    </div>
  </div>

  <script type="module" src="autocomplete.js"></script>
  <script type="module" src="sendSQLCommand.js"></script>
  <script type="text/javascript" src="https://unpkg.com/tabulator-tables@5.5.2/dist/js/tabulator.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/luxon@3.4.3/build/global/luxon.min.js"></script>


</body>

</html>