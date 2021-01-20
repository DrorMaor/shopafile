<?php
    include ("DBconn.php");
    //include ("DisplayErrors.php");
    $description = addslashes($_POST["description"]);
    $category = $_POST["category"];
    $price = $_POST["price"];
    $image = addslashes($_FILES["image"]["tmp_name"]);
    $fileName = addslashes(basename($_FILES["file"]["name"]));
    $fileFile = addslashes($_FILES["file"]["tmp_name"]);
    $update = "update files set ";
    $update .= " description = '" . $description . "', ";
    $update .= " category = " . $category . ", ";
    if ($fileName != "") {
        $update .= " fileName = '" . $fileName . "', ";
        $update .= " file = '" . addslashes(base64_encode(file_get_contents($fileFile))) . "', ";
    }
    if ($image != "")
        $update .= " image = '" . addslashes(base64_encode(file_get_contents($image))) . "', ";
    $update .= " price = " . $price;
    $update .= " where UUID = '" . $_POST["UUID"] . "'";
    //echo $update;
    $sql = $conn->prepare($update);
    $sql->execute();
    $conn = null;
?>
