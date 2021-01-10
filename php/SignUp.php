<?php
    include ("DisplayErrors.php");
    include ("DBconn.php");
    $insert = "insert into users (email, password, PayPal, active) values(";
    $insert .= "'" . $_POST["email"] . "', ";
    $insert .= "'" . $_POST["pwd"] . "', ";
    $insert .= "'" . $_POST["PayPal"] . "', 0)";
    $sql = $conn->prepare($insert);
    $sql->execute();

    $select = "select UUID from users where email = '" . $_POST["email"] . "'";
    $sql = $conn->prepare($select);
    $sql->execute();
    foreach($sql as $row => $cols)
        $UUID = cols["UUID"];
    $conn = null;
    // email them for verifecation
    $msg = "Thank you for signing up at Shapafile.com. Please verify your account by clicking the following link:\r";
    $msg .= "https://www.shopafile.com/verify.php?UUID=" & $UUID;
    mail($_POST["email"], "Sign Up at Shopafile", $msg);
?>