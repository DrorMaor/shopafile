function ShowSearchResults() {
    $.ajax({
        type: "GET",
        url: "php/search.php?kw=" + $("#SearchKeywords").val(),
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            $("#MyFiles").hide();
            $("#SearchResults").html(SearchResultsTable(JSON.parse(response))).show();
        }
    });
}

function SearchResultsTable(json) {
    var table = "<div class='LargeHeading'>Search Results</div>";
    table += "<table id='tblSearchResults'>";
    for (var i = 0; i < json.length; i++) {
        if (i % 5 == 0)
            table += "<tr>";
        if (i % 5 == 4)
            table += "</tr>";
        
        var j = json[i];
        table += "<td>";
        table += "<a onclick='PrepareBuyFileForm(" + JSON.stringify(j) + ");'>";
        table += "<img class='SearchImage' src='data:image;base64," + j.image + "'/></a>";
        table += "<br> " + DescriptionSpan(j.description, 40, "SearchDesc", "div");
        table += "<div class='bold center'>" + j.FileName + "</div>";
        table += "<div class='center'>Price $" + j.price + " / Size " + FileSizeText(j.FileSize) + "</div>";
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
    $("#buySize").html(FileSizeText(json.FileSize));
    $("#buyPrice").html("$" + json.price);
    PopupFormDisplay(true, 'BuyFile');
}