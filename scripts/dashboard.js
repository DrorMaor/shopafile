function GetAccountData() {
    $("#divLoader").show();
    $.ajax({
        type: "GET",
        url: "php/account.php?user=" + user,
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            var j = JSON.parse(response)[0];
            $("#acctEmail").val(j.email);
            $("#acctPayPal").val(j.PayPal);
            $("#AcctHeading").show();
            $("#divLoader").hide();
        }, 
        error: function () {
            $("#divLoader").hide();
        }
    });
}

function GetMyFiles() {
    $("#divLoader").show();
    $.ajax({
        type: "GET",
        url: "php/files.php?user=" + user,
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            $("#SearchResults").hide();
            var table = MyFilesTable(JSON.parse(response));
            $("#MyFiles").html(table).show();
            $("#divLoader").hide();
        }, 
        error: function () {
            $("#divLoader").hide();
        }
    });
}

function MyFilesTable(json) {
    var table = "<div class='LargeHeading'>My Files</div>";
    table += "<a class='button hover greenBG' title='Upload new file to sell' onclick='UploadNewFile();'>Upload</a> <br>";
    table += "<table id='tblMyFiles'>";
    table += '<tr>';
    table += '    <th class="left">File Name</th>';
    table += '    <th class="center">Size</th>';
    table += '    <th> &nbsp; </th>';
    table += '    <th class="left">Description</th>';
    table += '    <th class="center">Category</th>';
    table += '    <th class="center">Price</th>';
    table += '    <th class="center">Views</th>';
    table += '    <th class="center">Downloads</th>';
    table += '    <th class="center">Earnings</th>';
    table += '</tr>';

    for (var i = 0; i < json.length; i++) {
        var j = json[i];
        var UUID = j.UUID;
        table += "<tr>";
        table += "<td>" + j.FileName + "</td>";
        table += "<td class='center'>" + FileSizeText(j.FileSize) + "</td>";
        table += "<td class='center'> <img style='height:50px;' src='data:image;base64," + j.image + "'/> </td>";
        table += "<td>" + DescriptionSpan(j.description, 40, "", "span") + "</td>";
        table += "<td class='center'>" + j.category + "</td>";
        table += "<td class='center'>$" + parseFloat(j.price).toFixed(2) + "</td>";
        table += "<td class='center'>" + j.views + "</td>";
        table += "<td class='center'>" + j.downloads + "</td>";
        table += "<td class='center'>$" + parseFloat(j.earnings).toFixed(2) + "</td>";
        // right side tool links
        var title = "Click to copy the purchase link. Share it with your friends so they can buy your file";
        var onclick = "CopyLink('" + UUID + "'); ShowMsg([8], 'green');";
        table += "<td> <a class='RepeatButton green' title='" + title + "' onclick=\"" + onclick + "\">Link</a> &nbsp;";
        table += "<a class='RepeatButton orange' onclick='GetUpdateData(\"" + UUID + "\");'>Edit</a> &nbsp;";
        table += "<a class='RepeatButton red' onclick='DeleteFile(\"" + UUID + "\");'>Delete</a> </td>";

        table += "</tr>";
    }
    table += "</table>";
    return table;
}

function DeleteFile(UUID) {
    if (confirm ("Are you sure you want to delete this file?")) {
        $("#divLoader").show();
        $.ajax({
            type: "GET",
            url: "php/delete.php?UUID=" + UUID,
            data: $(this).serialize(),
            dataType: 'text',
            success: function() {
                ShowMsg ([9], "red");
                GetMyFiles();
                $("#divLoader").hide();
            }, 
            error: function () {
                ShowMsg([13], "red")
                $("#divLoader").hide();
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
    CleanFileForm('Upload');
    PopulateCategories("File");
    PopupFormDisplay(true, "FileForm");
}
