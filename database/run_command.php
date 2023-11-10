<?php
include_once('../head.php');

$sql = $_GET["command"];
if (!empty($sql)) {
    $command = $connection->prepare($sql);
    if ($command->execute()) {
        echo json_encode([
            "affected_rows" => $command->rowCount(),
            "returned_data" => $command->fetchAll(PDO::FETCH_ASSOC)
        ]);
    }
}
