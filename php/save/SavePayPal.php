<?php
    //include ("../DisplayErrors.php");
    include ("../DBconn.php");
    $update = "update users set PayPal = '" . $_POST["PayPal"] . "' where UUID = '" . $_POST["user"] . "'";
    $sql = $conn->prepare($update);
    $sql->execute();
    $conn = null;
?>
