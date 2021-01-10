<?php
    include ("DBconn.php");
    $select = "select u.email from users u inner join files f on f.user = u.id and f.uuid = '" . $_POST["FileUUID"] . "'";
    $sql = $conn->prepare($select);
    $sql->execute();
    $userEmail = "";
    foreach($sql as $row => $cols)
        $userEmail = $cols["email"];
    $conn = null;

    // send email
    try {
        $msg = "You have received a message from a Shopafile buyer about your file '" . $_POST["FileName"] . "'. \r";
        $msg .= "Please response to the inquiry at this email: " . $_POST["senderEmail"];
        mail($userEmail, "Message From a Shapafile Buyer", $msg);
        echo "1";
    }
    catch (Exception $e) {
        echo "0";
    }
?>
