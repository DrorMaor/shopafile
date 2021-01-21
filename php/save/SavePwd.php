<?php
    //include ("../DisplayErrors.php");
    include ("../DBconn.php");
    if ($_POST["NewPwd1"] == $_POST["NewPwd2"]) {
        $update = "update users set password = md5('" . addslashes($_POST["NewPwd1"]) . "') ";
        $update .= "where UUID = '" . $_POST["user"] . "' ";
        $update .= "and password = md5('" . addslashes($_POST["OldPwd"]) . "')";
        $sql = $conn->prepare($update);
        $sql->execute();
        echo $sql->rowCount();
        $conn = null;
    }
    else
        echo "0";
?>
