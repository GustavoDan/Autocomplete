<?php
include_once '../../head.php';

session_start();

if (!empty($_SESSION['authenticated'])) {
    header('Location: ../..');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../../style.css" />
</head>
<body>
    <div id="content">
        <h1>Login</h1>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $storedUsername = $_ENV["ADMIN_USERNAME"];
    $storedPassword = $_ENV["ADMIN_PASSWORD"];
    if (($username == $storedUsername) && ($password == $storedPassword)) {
        $_SESSION['username'] = $username;
        $_SESSION['authenticated'] = true;
        header('Location: ../..');
    } else {
        echo '<span style="color:red">O usuario ou senha digitados estão errados</span>';
    }
}?>
        <form method="POST" class="form-container">
            <div class="input-group">
                <label for="username">Username</label>
                <input name="username" required>
            </div>

            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" name="password" required>
            </div>

            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>
