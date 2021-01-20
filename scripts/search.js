function ValidateSearch() {
    var SearchKW = $("#SearchKeywords").val().trim();
    var selCat = $("#selSearchCategories").val();
    if (SearchKW.length < 3 && selCat == -1) 
        AnimateCategories();
    else
        LoadSearchResults(true);
}

function LoadSearchResults(user) {
    $("#divLoader").show();
    var url = "php/search.php";
    if (user) // regular user search
        url += "?kw=" + $("#SearchKeywords").val() + "&cat=" + $("#selSearchCategories").val();
      
    $.ajax({
        type: "GET",
        url: url,
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            if (response != "[]") {
                $("#MyFiles").hide();
                var table = SearchResultsTable(JSON.parse(response), user);
                // display the results
                $("#SearchResults").html(table).show();
            }
            else 
                AnimateCategories();

            $("#divLoader").hide();
        }
    });
}

function AnimateCategories() {
    ShowMsg([11], "redBG");
    
    $("#MyFiles").hide();
    $("#SearchResults").html("").show();
    var ScreenWidth = window.screen.availWidth;
    var ScreenHeight = window.screen.availHeight;
    $('#selSearchCategories > option').each(function() {
        var val = this.value;
        if (val != -1) {
            var cat = this.text;
            var left = Math.floor((Math.random() * ScreenWidth) * .9);
            var top = Math.floor( (Math.random() * (ScreenHeight * .75)) + (ScreenHeight * .1) );
            // transform degree
            var deg = Math.floor(Math.random() * 75);
            if (Math.random() < .5)
                deg = deg * -1;
            var style = "left:" + left + "px; top:" + top + "px; transform:rotate(" + deg + "deg);";
            var onclick = "$(\"#selSearchCategories\").val(" + val + "); $(\"#SearchKeywords\").val(\"\"); ValidateSearch();";
            $("#SearchResults").append("<a id='" + cat + "' class='NoSearchResults hover' style='" + style + "' onclick='" + onclick + "'>" + cat + "</a>");
        }
    });
}

function SearchResultsTable(json, user) {
    var table = "";
    if (user) {
        table = "<div class='LargeHeading'>Search Results</div>";
        table += "<div class='SmallHeading' style='font-weight:normal;'>" + json.length + " results</div>";
    }
    table += "<table id='tblSearchResults'>";
    for (var i = 0; i < json.length; i++) {
        if (i == 0)
            table += "<tr>";        
        var j = json[i];
        table += "<td class='SearchResultTD'>";
        table += "  <a onclick='PrepareBuyFileForm(" + JSON.stringify(j) + ");'>";
        table += "  <img class='SearchImage hover' src='data:image;base64," + j.image + "'/></a>";
        table += "  <br> " + DescriptionSpan(j.description, 40, "SearchDesc", "div");
        table += "  <div class='bold center BuyFileName'>" + j.FileName + "</div>";
        table += "  <div class='center blue'>Category: " + j.category + "</div>";
        table += "  <div class='center'>Price $" + j.price + " / Size " + FileSizeText(j.FileSize) + "</div>";
        table += "</td>";
        // look for when to close the TR
        if (i % 4 == 0 && i > 0)
            table += "</tr> <tr>";
        if (i == json.length -1)
            table += "</tr>";
    }
    table += "</table>";
    return table;
}

function PrepareBuyFileForm(json) {
    $.ajax({
        type: "GET",
        url: "php/IncrementView.php?UUID=" + json.UUID,
        data: $(this).serialize(),
        dataType: 'text'
    });
    $("#buyImage").prop("src", "data:image;base64," + json.image);
    $("#buyFileName").html(json.FileName);
    $("#msgFileName").html(json.FileName);
    $("#buyDesc").html(DescriptionSpan(json.description, 40, "SearchDesc", "div"));
    $("#buyCategory").html("Category: " + json.category);
    $("#buySize").html(FileSizeText(json.FileSize));
    $("#buyPrice").html("$" + json.price);
    $("#buyUUID").prop("UUID", json.UUID);
    PopupFormDisplay(true, 'BuyFile');
}

function SendMessage() {
    var formdata = new FormData();
    formdata.append('senderEmail', $("#msgEmail").val());
    formdata.append('FileName', $("#buyFileName").html());
    formdata.append('FileUUID', $("#buyUUID").prop("UUID"));
    $.ajax({
        url: "php/MessageSeller.php",
        method: "POST",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            if (response == "1")
                ShowMsg([12], "greenBG");
            else
                ShowMsg([13], "redBG");
        }
    });
}

function BuyFile() {
    var UUID = $('#buyUUID').prop('UUID');
}