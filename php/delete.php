<?php
    include ("DBconn.php");
    $sql = $conn->prepare("delete from files where UUID = '" . $_GET["UUID"] . "'");
    $sql->execute();
    $conn = null;
?>
