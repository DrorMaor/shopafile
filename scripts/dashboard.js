function GetAccountData() {
    $.ajax({
        type: "GET",
        url: "php/account.php",
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            var j = JSON.parse(response)[0];
            $("#acctEmail").val(j.email);
            $("#acctPayPal").val(j.PayPal);
            $("#AcctHeading").show();
        }
    });
}

function GetMyFiles() {
    $("#divLoader").show();
    $.ajax({
        type: "GET",
        url: "php/files.php",
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            $("#SearchResults").hide();
            var table = MyFilesTable(JSON.parse(response));
            $("#MyFiles").html(table).show();
            $("#divLoader").hide();
        }
    });
}

function MyFilesTable(json) {
    var table = "<div class='LargeHeading'>My Files</div>";
    table += "<a class='button greenBG' title='Upload new file to sell' onclick='UploadNewFile();'>Upload</a> <br>";
    table += "<table id='tblMyFiles'>";
    table += '<tr>';
    table += '    <th class="left">File Name</th>';
    table += '    <th class="left">Size</th>';
    table += '    <th class="left"> </th>';
    table += '    <th class="left">Description</th>';
    table += '    <th class="center">Category</th>';
    table += '    <th class="center">Price</th>';
    table += '    <th class="center">Views</th>';
    table += '    <th class="center">Downloads</th>';
    table += '    <th class="center">Earnings</th>';
    table += '</tr>';

    for (var i = 0; i < json.length; i++) {
        var j = json[i];
        var FileID = j.id;
        table += "<tr>";
        table += "<td>" + j.FileName + "</td>";
        table += "<td>" + FileSizeText(j.FileSize) + "</td>";
        table += "<td class='center'> <img style='height:50px;' src='data:image;base64," + j.image + "'/> </td>";
        table += "<td>" + DescriptionSpan(j.description, 40, "", "span") + "</td>";
        table += "<td>" + j.category + "</td>";
        table += "<td>$" + parseFloat(j.price).toFixed(2) + "</td>";
        table += "<td class='center'>" + j.views + "</td>";
        table += "<td class='center'>" + j.downloads + "</td>";
        table += "<td>$" + parseFloat(j.earnings).toFixed(2) + "</td>";
        // right side tool links
        var title = "Click to copy the purchase link. Share it with your friends so they can buy your file";
        var onclick = "CopyLink('" + j.UUID + "'); ShowMsg('The purchase link to this file has been copied to the clipboard', 'greenBG');";
        table += "<td> <a class='RepeatButton green' title='" + title + "' onclick=\"" + onclick + "\">Link</a> &nbsp;";
        table += "<a class='RepeatButton orange' onclick='GetUpdateData(" + FileID + ");'>Edit</a> &nbsp;";
        table += "<a class='RepeatButton red' onclick='DeleteFile(" + FileID + ");'>Delete</a> </td>";

        table += "</tr>";
    }
    table += "</table>";
    return table;
}

function DeleteFile(FileID) {
    if (confirm ("Are you sure you want to delete this file?")) {
        $.ajax({
            type: "GET",
            url: "php/delete.php?FileID=" + FileID,
            data: $(this).serialize(),
            dataType: 'text',
            success: function(response) {
                ShowMsg ("The file has been deleted", "redBG");
                GetMyFiles();
            }
        });
    }
}

function CopyLink (UUID) {
    const ta = document.createElement('textarea');
    ta.value = "https://www.shopafile.com/buy.php?l=" + UUID;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
}

function UploadNewFile() {
    CleanFileForm('upload');
    PopupFormDisplay(true, "FileForm");
}
