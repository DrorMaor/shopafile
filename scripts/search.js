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
        var j = json[i];
        if (i % 5 == 0)
            table += "<tr>";
        if (i % 5 == 4)
            table += "</tr>";
        
        table += "<td>";
        table += "<a onclick='PrepareBuyFileForm(" + j.id + ", \"" + j.image + "\", " + j.FileSize + ", " + j.price + ", \"" + j.FileName + "\");'>";
        table += "<img class='SearchImage' src='data:image;base64," + j.image + "'/></a>";
        table += "<br> " + DescriptionSpan(j.description, 40, "SearchDesc", "div");
        table += "<div class='bold center'>" + j.FileName + "</div>";
        table += "<div class='center'>Price $" + j.price + " / Size " + FileSizeText(j.FileSize) + "</div>";
        table += "</td>";
    }
    table += "</table>";
    return table;
}

function PrepareBuyFileForm(FileID, image, FileSize, price, FileName) {
    $.ajax({
        type: "GET",
        url: "php/IncrementView.php?FileID=" + FileID,
        data: $(this).serialize(),
        dataType: 'text'
    });
    $("#buyImage").prop("src", "data:image;base64," + image);
    $("#buyFileName").html(FileName);
    $("#buySize").html(FileSizeText(FileSize));
    $("#buyPrice").html("$" + price);
    PopupFormDisplay(true, 'BuyFile');
}