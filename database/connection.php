<?php
$host = $_ENV["DB_HOST"];
$port = $_ENV["DB_PORT"];
$database = $_ENV["DB_NAME"];
$user = $_ENV["DB_USER"];
$password = $_ENV["DB_PASS"];

$dsn = "mysql:host=$host;port=$port;dbname=$database;";

try {
    $connection = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
} catch (PDOException $e) {
    echo 'Falha ao conectar no banco de dados: ' . $e->getMessage();
    die;
}
