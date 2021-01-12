<?php
    include ("DBconn.php");
    //include ("DisplayErrors.php");
    $select = "select email, PayPal from users where UUID = '" . $_GET["user"] . "'";
    $sql = $conn->prepare($select);
    $sql->execute();
    $rows = array();
    foreach($sql as $row => $cols)
        array_push($rows, $cols);
    echo json_encode($rows);
    $conn = null;
?>
