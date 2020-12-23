<?php

    include ("DBconn.php");
    $sql = $conn->prepare("select id, category from categories order by category");
    $sql->execute();
    $rows = array();
    foreach($sql as $row => $cols)
        array_push($rows, $cols);
    echo json_encode($rows);
    $conn = null;
    /*
    echo "<select id='selCategories' style='display:block;'>";
    include ("DBconn.php");
    $sql = $conn->prepare("select id, category from categories order by category");
    $sql->execute();
    foreach($sql as $row => $cols)
        echo "<option value='" . $cols["id"] . "'>" . $cols["category"];
    echo "</select>";
    $conn = null;
    */
?>
