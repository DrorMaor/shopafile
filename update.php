<?php
    include ("DBconn.php");
    //include ("DisplayErrors.php");
    $description = $_POST["description"];
    $category = $_POST["category"];
    $price = $_POST["price"];
    $image = $_FILES["image"]["tmp_name"];
    $fileName = basename($_FILES["file"]["name"]);
    $fileFile = $_FILES["file"]["tmp_name"];
    // (user, FileName, price, description, image, file)
    $update = "update files set ";
    $update .= " description = '" . $description . "', ";
    $update .= " category = " . $category . ", ";
    if ($fileName != "") {
        $update .= " fileName = '" . $fileName . "', ";
        $update .= " file = '" . base64_encode(file_get_contents($fileFile)) . "', ";
    }
    if ($image != "")
        $update .= " image = '" . base64_encode(file_get_contents($image)) . "', ";
    $update .= " price = " . $price;
    $update .= " where id = " . $_POST["FileID"];
    //echo $update;
    $sql = $conn->prepare($update);
    $sql->execute();
    $conn = null;
?>
