<?php
    //include ("../DisplayErrors.php");
    include ("../DBconn.php");
    if ($_POST["NewPwd1"] == $_POST["NewPwd2"]) {
        $update = "update users set password = '" . addslashes($_POST["NewPwd1"]) . "' where UUID = '" . addslashes$_POST["user"]) . "' ";
        $update .= "and password = '" . addslashes($_POST["OldPwd"]) . "'";
        $sql = $conn->prepare($update);
        $sql->execute();
        echo $sql->rowCount();
        $conn = null;
    }
    else
        echo "0";
?>
