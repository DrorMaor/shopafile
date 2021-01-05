function ValidateSearch() {
    var SearchKW = $("#SearchKeywords").val().trim();
    var selCat = $("#selCategories").val();
    if (SearchKW.length < 3 && selCat == -1)
        ShowMsg("Please enter valid search criteria", "redBG");
    else
        LoadSearchResults(true);
}

function LoadSearchResults(user) {
    $("#divLoader").show();
    var url = "php/search.php";
    if (user) // regular user search
        url += "?kw=" + $("#SearchKeywords").val() + "&cat=" + $("#selCategories").val();
      
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
            else {
                $("#SearchResults").html("");
                ShowMsg("No search results found", "redBG");
            }
            $("#divLoader").hide();
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
        url: "php/IncrementView.php?FileID=" + json.id,
        data: $(this).serialize(),
        dataType: 'text'
    });
    $("#buyImage").prop("src", "data:image;base64," + json.image);
    $("#buyFileName").html(json.FileName);
    $("#buyDesc").html(DescriptionSpan(json.description, 40, "SearchDesc", "div"));
    $("#buyCategory").html("Category: " + json.category);
    $("#buySize").html(FileSizeText(json.FileSize));
    $("#buyPrice").html("$" + json.price);
    $("#buyUUID").prop("UUID", json.UUID);
    PopupFormDisplay(true, 'BuyFile');
}