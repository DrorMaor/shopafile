<?php
    /*
    if (parse_url($_SERVER['REQUEST_URI'])["query"] != "")
        die();
    else
        include_once("php/traffic.php");
    */
?>

<html>
    <head>
        <!-- cdn code -->
        <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
        <link rel="stylesheet" href="https://jqueryui.com/resources/demos/style.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins">

        <!-- our code -->
        <!-- *.js -->
        <script src="scripts/general.js"></script>
        <script src="scripts/login.js"></script>
        <script src="scripts/search.js"></script>
        <script src="scripts/SaveAccount.js"></script>
        <script src="scripts/dashboard.js"></script>
        <script src="scripts/FileForm.js"></script>
        <!-- *.css -->
        <link rel="stylesheet" href="styles/colors.css">
        <link rel="stylesheet" href="styles/general.css">
        <link rel="stylesheet" href="styles/image.css">
        <link rel="stylesheet" href="styles/MyFiles.css">
        <link rel="stylesheet" href="styles/search.css">
        <link rel="stylesheet" href="styles/TopMenu.css">

        <title>Shopafile - Buy/Sell Anything Digital</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <?php
            include("top.php");
            // these are the hidden divs
            include("popup/FileForm.php");
            include("popup/BuyFile.php");
            include("popup/LoginForm.php");
            include("popup/AccountSettings.php");
            include("popup/ItsFree.php");
            include("popup/FAQ.php");
        ?>
        <div id="overlay"></div>
        <div id="divLoader"></div>
        <div id="divMessage"></div>
        <div id="MyFiles"></div>
        <div id="SearchResults"></div>
    </body>
</html>
