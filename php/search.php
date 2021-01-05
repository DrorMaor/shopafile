<?php
    include ("DBconn.php");
    include ("DisplayErrors.php");
    $select = "select f.id, f.FileName, f.price, f.description, f.UUID, c.category, f.image, length(file) as FileSize
        from files f inner join categories c on c.id = f.category where 1 = 1 ";  // this final where is to automatically include a "where" clause, so the following "and"s are valid syntax
    
    // the user initiates the search
    if (isset($_GET["kw"]))
        if ($_GET["kw"] != -1)
            $select .= " and (f.description like '%" . $_GET["kw"] . "%' or f.FileName like '%" . $_GET["kw"] . "%')";
    if (isset($_GET["cat"]))
        if ($_GET["cat"] != -1)
            $select .= " and f.category = " . $_GET["cat"];
    $select .= " order by f.views desc limit 3 ";
      
    $sql = $conn->prepare($select);
    //echo $select;
    $sql->execute();
    $rows = array();
    foreach($sql as $row => $cols)
        array_push($rows, $cols);
    echo json_encode($rows);
    $conn = null;
?>
