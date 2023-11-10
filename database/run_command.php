<?php
include_once('../head.php');

$sql = $_GET["command"];
if (!empty($sql)) {
    $command = $connection->prepare($sql);
    if ($command->execute()) {
        echo json_encode($command->fetchAll(PDO::FETCH_ASSOC));
    }
}
