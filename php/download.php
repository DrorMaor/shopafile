<?php
    if (isset($_GET["UUID"])) {
        include("DBconn.php");
        $sql = $conn->prepare("select FileName, file from files where UUID = '" . $_GET["UUID"] . "'");
        $sql->execute();
        $rows = array();
        foreach($sql as $row => $cols) {
            //header("Content-length: $size");
            //header("Content-type: $type");
            header("Content-Disposition: attachment; filename=" . $cols["FileName"]);
            ob_clean();
            flush();
            echo $cols["file"];
            exit;
        }
    }
?>
