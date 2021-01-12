<?php
    include ("DBconn.php");
    //include ("DisplayErrors.php");
    $select = "select f.id, f.image, f.UUID, f.FileName, length(file) as FileSize, f.price, f.description, f.views, f.downloads, f.earnings, c.category
        from files f inner join categories c on c.id = f.category
        inner join users u on u.id = f.user
        where u.UUID = '" . $_GET["user"] . "' order by f.id desc;";
    $sql = $conn->prepare($select);
    $sql->execute();
    $rows = array();
    foreach($sql as $row => $cols)
        array_push($rows, $cols);
    echo json_encode($rows);
    $conn = null;
?>
