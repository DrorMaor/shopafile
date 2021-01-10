<?php
    include ("../DisplayErrors.php");
    include ("../DBconn.php");
    $update = "update users set email = '" . $_POST["email"] . "' where UUID = '" . $_COOKIE["user"] . "'";
    $sql = $conn->prepare($update);
    $sql->execute();
    $conn = null;
?>
