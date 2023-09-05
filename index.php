<?php
define('ROOT_DIR', __DIR__);
include_once('utils/load_env.php');
include_once('database/connection.php');
include_once('database/get_vars.php')
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous" />
  <link rel="stylesheet" href="style.css" />
  <title>AutoComplete</title>
</head>

<body>
  <div class="input-group mb-3 custom-input-wrapper">
    <div class="form-control" id="query-input" contenteditable></div>
    <span id="autocomplete"></span>
    <div id="sugestion-list" <?php foreach ($autocomplete_vars as $key => $value) {
                                echo "data-$key=$value ";
                              } ?>></div>

    <div class="input-group-append">
      <button class="btn btn-secondary" type="button">Executar</button>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
  <script type="module" src="autocomplete.js"></script>
</body>

</html>