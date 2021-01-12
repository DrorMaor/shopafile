<?php
    //include ("DisplayErrors.php");
    include ("DBconn.php");
    $select = "select UUID from users where email = '" . $_POST["user"] . "' and password = '" . $_POST["pwd"] . "'";
    $sql = $conn->prepare($select);
    $sql->execute();
    foreach($sql as $row => $cols)
        echo $cols["UUID"];
    $conn = null;
?>
