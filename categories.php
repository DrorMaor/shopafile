<?php
    include ("DBconn.php");
    $sql = $conn->prepare("select * from categories order by category");
    $sql->execute();
    foreach($sql as $row => $cols)
        echo "<option value='" . $cols["id"] . "'>" . $cols["category"];
    $conn = null;
?>
