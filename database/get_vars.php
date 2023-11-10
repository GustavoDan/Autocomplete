<?php
include_once ROOT_DIR . "/utils/array_change_key_case_recursive.php";

$autocomplete_vars = [];

$command = $connection->prepare("SELECT table_name
                                   FROM information_schema.tables
                                   WHERE table_schema = '$_ENV[DB_NAME]'
                                  ");
$command->execute();
$tables = $command->fetchAll(PDO::FETCH_ASSOC);
$tables = array_change_key_case_recursive($tables, CASE_LOWER);
$tables = array_column($tables, "table_name");

$autocomplete_vars['tables'] = implode(",", $tables);
