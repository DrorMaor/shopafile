<?php
    $search = "";
    if (isset($_GET["kw"]))
        $search = $_GET["kw"];
    $illegals = array("delete", "select", "update", "insert");
    $dontSearch = 0;
    foreach ($illegals as $illegal) {
        if (strlen(stripos($search, $illegal)) > 0) {            
            $dontSearch = 1;
            break;
        }
    }

    $select = "";
    include ("DBconn.php");
    if ($dontSearch == 1)
        $select = "select id from files limit 0;";
    else {
        $select = "select f.id, f.FileName, f.price, f.description, f.UUID, c.category, f.image, length(file) as FileSize
            from files f inner join categories c on c.id = f.category where 1 = 1 ";  // this final where is to automatically include a "where" clause, so the following "and"s are valid syntax
    
        // the user initiates the search
        if ($search != -1)
            $select .= " and (f.description like '%" . $search . "%' or f.FileName like '%" . $search . "%')";
        if (isset($_GET["cat"]))
            if ($_GET["cat"] != -1)
                $select .= " and f.category = " . $_GET["cat"];
        $select .= " order by f.views desc limit 3 ";
    }
    
    $sql = $conn->prepare($select);
    //echo $select . "<br>";
    $sql->execute();
    $rows = array();
    foreach($sql as $row => $cols)
        array_push($rows, $cols);
    echo json_encode($rows);
    $conn = null;
?>
