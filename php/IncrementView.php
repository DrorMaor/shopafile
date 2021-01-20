<?php
    include ("DBconn.php");
    //include ("DisplayErrors.php");
    $update = "update files set views = views + 1 where UUID = " . $_GET["UUID"];
    echo $update;
    $sql = $conn->prepare($update);
    $sql->execute();
    $conn = null;
?>
