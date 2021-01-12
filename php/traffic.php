<?php
    include ("DBconn.php");
    //include ("DisplayErrors.php");
    $sql = $conn->prepare("insert into traffic (referer, ip) values ('" . $_SERVER['HTTP_REFERER'] . "', '" . $_SERVER['REMOTE_ADDR'] . "') ");
    $sql->execute();
    $conn = null;
?>