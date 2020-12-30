<?php
    include ("DisplayErrors.php");
    include ("DBconn.php");
    $select = "select email, PayPal from users where id = " . $_COOKIE["user"];
    $sql = $conn->prepare($select);
    $sql->execute();
    $rows = array();
    foreach($sql as $row => $cols)
        array_push($rows, $cols);
    echo json_encode($rows);
    $conn = null;
?>
