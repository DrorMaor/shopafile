<?php
    include ("../DisplayErrors.php");
    include ("../DBconn.php");
    $update = "update users set email = '" . $_POST["email"] . "' where id = " . $_COOKIE["user"];
    $sql = $conn->prepare($update);
    $sql->execute();
    $conn = null;
?>
