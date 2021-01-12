<?php
    //include ("../DisplayErrors.php");
    include ("../DBconn.php");
    $update = "update users set email = '" . $_POST["email"] . "' where UUID = '" . $_POST["user"] . "'";
    $sql = $conn->prepare($update);
    $sql->execute();
    $conn = null;
?>
