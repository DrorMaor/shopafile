<?php
    include ("DBconn.php");
    //include ("DisplayErrors.php");
    $description = addslashes($_POST["description"]);
    $category = $_POST["category"];
    $price = $_POST["price"];
    $image = addslashes($_FILES["image"]["tmp_name"]);
    $fileName = addslashes(basename($_FILES["file"]["name"]));
    $fileFile = addslashes($_FILES["file"]["tmp_name"]);
    $insert = "insert into files (user, FileName, price, description, category, UUID, image, file) values ( ";
    $insert .= "(select id from users where UUID = '" . $_POST['user'] . "'), ";
    $insert .= "'" . $fileName . "', $price, '" . $description . "', $category , UUID(), ";
    $insert .= "'" . addslashes(base64_encode(file_get_contents($image))) . "', ";
    $insert .= "'" . addslashes(base64_encode(file_get_contents($fileFile))) . "')";
    $sql = $conn->prepare($insert);
    $sql->execute();
    $conn = null;
?>
