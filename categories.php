<?php

    include ("DBconn.php");
    $sql = $conn->prepare("select id, category from categories order by category");
    $sql->execute();
    $rows = array();
    foreach($sql as $row => $cols)
        array_push($rows, $cols);
    echo json_encode($rows);
    $conn = null;
?>
