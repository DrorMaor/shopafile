<?php
    include ("DBconn.php");
    include ("DisplayErrors.php");
    $description = $_POST["description"];
    $category = $_POST["category"];
    $price = $_POST["price"];
    $image = $_FILES["image"]["tmp_name"];
    $fileName = basename($_FILES["file"]["name"]);
    $fileFile = $_FILES["file"]["tmp_name"];
    $insert = "INSERT INTO files (user, FileName, price, description, category, UUID, image, file) values ( ";
    $insert .= "(select id from users where UUID = '" . $_COOKIE['user'] . ")";
    $insert .+ ", '" . $fileName . "', $price, '" . $description . "', $category , UUID(), ";
    $insert .= "'" . base64_encode(file_get_contents($image)) . "', '" . base64_encode(file_get_contents($fileFile)) . "')";
    $sql = $conn->prepare($insert);
    $sql->execute();
    $conn = null;
?>
