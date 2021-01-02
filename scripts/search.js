function ShowSearchResults() {
    $("#divLoader").show();
    $.ajax({
        type: "GET",
        url: "php/search.php?kw=" + $("#SearchKeywords").val() + "&cat=" + $("#selCategories").val(),
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            $("#MyFiles").hide();
            var table = SearchResultsTable(JSON.parse(response));
            $("#SearchResults").html($("#SearchResults").html() + table).show();
            $("#divLoader").hide();
        }
    });
}

function SearchResultsTable(json) {
    var html = "<div class='LargeHeading'>Search Results</div>";
    html += "<div class='SmallHeading' style='font-weight:normal;'>" + json.length + " results</div>";
    html += "<br> <div id='divSearchCategories'></div>";
    $("#SearchResults").html(html);
    $("#selCategories").appendTo($("#divSearchCategories"));

    var table = "<table id='tblSearchResults'>";
    for (var i = 0; i < json.length; i++) {
        if (i == 0)
            table += "<tr>";
        if (i % 5 == 0)
            table += "</tr> <tr>";
        if (i == json.length -1)
            table += "</tr>";
        
        var j = json[i];
        table += "<td class='SearchResultTD'>";
        table += "  <a onclick='PrepareBuyFileForm(" + JSON.stringify(j) + ");'>";
        table += "  <img class='SearchImage' src='data:image;base64," + j.image + "'/></a>";
        table += "  <br> " + DescriptionSpan(j.description, 40, "SearchDesc", "div");
        table += "  <div class='bold center BuyFileName'>" + j.FileName + "</div>";
        table += "  <div class='center blue'>Category: " + j.category + "</div>";
        table += "  <div class='center'>Price $" + j.price + " / Size " + FileSizeText(j.FileSize) + "</div>";
        table += "</td>";
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