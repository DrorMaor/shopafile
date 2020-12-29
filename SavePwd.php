<?php
    include ("DisplayErrors.php");
    include ("DBconn.php");
    if ($_POST["NewPwd1"] == $_POST["NewPwd2"]) {
        $update = "update users set password = '" . $_POST["NewPwd1"] . "' where id = " . $_COOKIE["user"];
        $update .= " and password = '" . $_POST["OldPwd"] . "'";
        $sql = $conn->prepare($update);
        $sql->execute();
        echo $sql->rowCount();
        $conn = null;
    }
    else
        echo "0";
?>
