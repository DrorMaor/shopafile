<?php
    include ("DBconn.php");
    //include ("DisplayErrors.php");

    // check if this user exists
    $select = "select count(*) as num from users where email = '" . $_POST["email"] . "'";
    $sql = $conn->prepare($select);
    $sql->execute();
    $exists = 0;
    foreach($sql as $row => $cols)
        $exists = $cols["num"];
    
    // now, try to insert
    if ($exists == 0) {
        $insert = "insert into users (email, password, PayPal, UUID) values(";
        $insert .= "'" . $_POST["email"] . "', ";
        $insert .= "'" . addslashes($_POST["pwd"]) . "', ";
        $insert .= "'" . $_POST["PayPal"] . "', UUID() )";
        $sql = $conn->prepare($insert);
        $sql->execute();

        // email them for verifecation
        $msg = "Thank you for signing up at Shapafile.com. Please verify your account by clicking the following link:\r";
        $msg .= "https://www.shopafile.com/verify.php?UUID=" . $UUID;
        mail($_POST["email"], "Sign Up at Shopafile", $msg);
    }
    $conn = null;
    echo $exists;
?>