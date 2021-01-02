<?php
    include ("DBconn.php");
    include ("DisplayErrors.php");
    $select = "select f.id, f.FileName, f.price, f.description, f.UUID, c.category, f.image, length(file) as FileSize
        from files f inner join categories c on c.id = f.category
        where f.description like '%" . $_GET["kw"] . "%' ";
    if (isset($_GET["cat"]))
        if ($_GET["cat"] != -1 && $_GET["cat"] != "undefined")
            $select .= " and f.category = " . $_GET["cat"];
    $sql = $conn->prepare($select);
    $sql->execute();
    $rows = array();
    foreach($sql as $row => $cols)
        array_push($rows, $cols);
    echo json_encode($rows);
    $conn = null;
?>
