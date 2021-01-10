<?php
    include ("../DisplayErrors.php");
    include ("../DBconn.php");
    $update = "update users set PayPal = '" . $_POST["PayPal"] . "' where UUID = '" . $_COOKIE["user"] . "'";
    $sql = $conn->prepare($update);
    $sql->execute();
    $conn = null;
?>
