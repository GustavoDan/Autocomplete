<?php
include_once 'head.php';
include_once 'database/get_vars.php';

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    unset($_SESSION['username']);
    unset($_SESSION['authenticated']);
}

if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    header("Location: pages/login");
    exit;
}
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
    <form method="POST">
      <button>Deslogar</button>
    </form>
    <img src="./images/mysql_logo.png" />

    <div class="container">
      <div id="query-input" contenteditable></div>
      <span id="autocomplete"></span>
      <div id="sugestion-list" <?php foreach ($autocomplete_vars as $key => $value) {echo "data-$key=$value ";}?>></div>

      <button id="send-button">Executar</button>
    </div>
    <div id="result-area" class="tabulator">
    </div>
  </div>

  <script type="module" src="autocomplete.js"></script>
  <script type="module" src="sendSQLCommand.js"></script>
  <script type="text/javascript" src="https://unpkg.com/tabulator-tables@5.5.2/dist/js/tabulator.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/luxon@3.4.3/build/global/luxon.min.js"></script>
</body>

</html>