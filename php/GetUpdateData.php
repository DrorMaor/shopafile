<?php
    include ("DBconn.php");
    $select = "select id, FileName, UUID, price, description, image, category, views, downloads, earnings
        from files where UUID = '" . $_GET["UUID"] . "'";
    $sql = $conn->prepare($select);
    $sql->execute();
    $rows = array();
    foreach($sql as $row => $cols)
        array_push($rows, $cols);
    echo json_encode($rows);
    $conn = null;
?>
