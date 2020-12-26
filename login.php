<?php
    include ("DisplayErrors.php");
    include ("DBconn.php");
    $select = "select id, email from users where email = '" . $_POST["user"] . "' and password = '" . $_POST["pwd"] . "'";
    $sql = $conn->prepare($select);
    $sql->execute();
    foreach($sql as $row => $cols) {
        setcookie("user", $cols["id"], time() + (86400 * 30), "/"); // 86400 = 1 day
        echo $cols["id"];
    }
    $conn = null;
?>
