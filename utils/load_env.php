<?php
$envFilePath = ROOT_DIR . '/.env';

if (file_exists($envFilePath)) {
    $lines = file($envFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        list($key, $value) = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value);
        $_SERVER[trim($key)] = trim($value);
    }
}
