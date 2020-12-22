<?php
    include ("DBconn.php");
    $select = "select id, FileName, price, description, image, category, views, downloads, earnings
        from files where id = " . $_GET["FileID"];
    $sql = $conn->prepare($select);
    $sql->execute();
    $rows = array();
    foreach($sql as $row => $cols)
        array_push($rows, $cols);
    echo json_encode($rows);
    $conn = null;
?>
