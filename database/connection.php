<?php
$host = $_ENV["DB_HOST"];
$database = $_ENV["DB_NAME"];
$user = $_ENV["DB_USER"];
$senha = $_ENV["DB_PASS"];

try {
  $connection = new PDO("mysql:host=$host;dbname=$database;", $user, $senha, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
} catch (PDOException $e) {
  echo 'Falha ao conectar no banco de dados: ' . $e->getMessage();
  die;
}
