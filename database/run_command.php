<?php
include_once '../head.php';

try {
    if (!isset($_GET["command"])) {
        throw new ValueError("");
    }

    $command = $connection->prepare($_GET["command"]);
    $command->execute();
    echo json_encode([
        "affected_rows" => $command->rowCount(),
        "returned_data" => $command->fetchAll(PDO::FETCH_ASSOC),
    ]);
} catch (PDOException | ValueError $e) {
    echo json_encode(["error" => $e->getMessage()]);
    die;
}
