
$(document).ready(function(){
    PopulateCategories();
});

function ShowMsg(msg, BGcolor) {
    $("#divMessage").html(msg).removeClass().addClass(BGcolor).show().delay(2500).fadeOut(750);
}

function LoginScreenDisplay(show) {
    var display = (show) ? "block" : "none";
    var opacity = (show) ? .25 : 1;
    $("#overlay").css("display", display);
    $(".OtherDiv").css('opacity', opacity);
    $("#divLoginForm").css("display", display);
}

function CleanFileForm(type) {
    if (type == 'upload') {
        $("#FileFormHeading").html("Upload File");
        $("#fileDescription").val("");
        $("#selCategories").val(-1);
        $("#filePrice").val("");
        $('#fileYWR').html("");
        $("#fileImageCurrent").prop('src', "data:image;base64,");
        $("#divImageCurrent").hide();
        $("#divFileName").hide();
        $("#fileAllowed").prop("checked", false);
        $("#buttonUploadFile").show();
        $("#buttonEditFile").hide();
    }
    else {
        $("#FileFormHeading").html("Edit File");
        $("#divImageCurrent").show();
        $("#divFileName").show();
        $("#buttonUploadFile").hide();
        $("#buttonEditFile").show();
    }

    // remove yeloow highlights, if they remained
    $("#spnDescription").removeClass("yellowBG");
    $("#spnCategory").removeClass("yellowBG");
    $("#spnPrice").removeClass("yellowBG");
    $("#spnImage").removeClass("yellowBG");
    $("#spnFile").removeClass("yellowBG");
    $("#tdAllowed").removeClass("yellowBG");

    FileFormDisplay(true);
}

function FileFormDisplay(show) {
    var display = (show) ? "block" : "none";
    var opacity = (show) ? .25 : 1;
    $("#overlay").css("display", display);
    $("#dashboard").css('opacity', opacity);
    $("#FileForm").css("display", display);
}

function ComputeReceive() {
    var price = $('#filePrice').val();
    var ywr = price - 0.99;
    if (price > 33)
        ywr = 0.97 * price;
    if (price > .99)
        $('#fileYWR').html('You get $' + parseFloat(ywr).toFixed(2));
    else
        $('#fileYWR').html("");
}

function DeleteFile(FileID) {
    if (confirm ("Are you sure you want to delete this file?")) {
        $.ajax({
            type: "GET",
            url: "delete.php?FileID=" + FileID,
            data: $(this).serialize(),
            dataType: 'text',
            success: function(response) {
                ShowMsg ("This file has been deleted", "redBG");
                $("#dashboard").load("files.php");
            }
        });
    }
}

function GetUpdateData(FileID) {
    CleanFileForm('edit');
    $("#divLoader").show();
    $.ajax({
        type: "GET",
        url: "GetUpdateData.php?FileID=" + FileID,
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            var json = JSON.parse(response);
            for (var i = 0; i < json.length; i++) {
                var j = json[i];
                $("#fileDescription").val(j.description);
                $("#selCategories").val(j.category);
                $("#filePrice").val(j.price);
                ComputeReceive();
                $("#fileImageCurrent").prop("src", "data:image;base64," + j.image);
                $("#fileFileName").html(j.FileName);
                $("#buttonEditFile").prop("FileID", j.id);
                $("#divLoader").hide();
                FileFormDisplay(true);
            }
        }
    });
}

function PopulateCategories() {
    $.ajax({
        type: "GET",
        url: "categories.php",
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            $("#selCategories").remove();
            var select = $("<select id='selCategories'>");
            $("<option />", {value: -1, text: "Select ..."}).appendTo(select);
            var json = JSON.parse(response);
            for (var i = 0; i < json.length; i++) {
                var j = json[i];
                $("<option />", {value: j.id, text: j.category}).appendTo(select);
            }
            select.appendTo($("#divFileCategories"));
            select.appendTo($("#divSearchCategories"));
        }
    });
}

function SaveFile(FileID) {
    if (ValidateFileForm()) {
        var url = "";
        var formdata = new FormData();
        var msg = "";
        var BGcolor = "";
        if (FileID == -1) {
            url = "upload.php";
            msg = "Your file has been uploaded";
            BGcolor = "greenBG";
        }
        else {
            url = "update.php";
            formdata.append('FileID', FileID);
            msg = "Your changes have been saved";
            BGcolor = "orangeBG";
        }
        formdata.append('description', $("#fileDescription").val());
        formdata.append('category', $("#selCategories").val());
        formdata.append('price', $("#filePrice").val());
        formdata.append('image', $("#fileImage")[0].files[0]);
        formdata.append('file', $("#fileFile")[0].files[0]);
        $.ajax({
            url: url,
            method: "POST",
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                ShowMsg(msg, BGcolor);
                FileFormDisplay(false);
                $("#dashboard").load("files.php");
            }
        });
    }
}

function Login() {
    var formdata = new FormData();
    formdata.append('user', $("#LoginUser").val());
    formdata.append('pwd', $("#LoginPwd").val());
    $.ajax({
        url: "login.php",
        method: "POST",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            if (response != "") {
                document.cookie = "user=" + response;
                LoginScreenDisplay(false);
                ShowFiles("files");
                $("#tdLogin").hide();
                $("#tdLogoff").show();
            }
            else
                ShowMsg("There was an error in the login", "redBG");
        }
    });
}

function Logoff () {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    $("#tdLogin").show();
    $("#tdLogoff").hide();
    $("#dashboard").empty();
}

function ValidateFileForm() {
    var valid = true;
    var ErrMsg = "<br> <br>";
    if ($("#fileDescription").val() == "") {
        $("#spnDescription").addClass("yellowBG");
        valid = false;
    }
    else
        $("#spnDescription").removeClass("yellowBG");

    if ($("#selCategories").val() == -1) {
        $("#spnCategory").addClass("yellowBG");
        valid = false;
    }
    else
        $("#spnCategory").removeClass("yellowBG");

    if ($("#filePrice").val() == "" || $("#filePrice").val() < 1) {
        $("#spnPrice").addClass("yellowBG");
        valid = false;
    }
    else
        $("#spnPrice").removeClass("yellowBG");

    if ($("#fileImage").val() == "" && $("#fileImageCurrent").prop('src') == "data:image;base64,") {
        $("#spnImage").addClass("yellowBG");
        valid = false;
    }
    else
        $("#spnImage").removeClass("yellowBG");

    if ($("#fileFile").val() == "" && $("#fileFileName").html() == "") {
        $("#spnFile").addClass("yellowBG");
        valid = false;
    }
    else
        $("#spnFile").removeClass("yellowBG");

    if (!$('#fileAllowed').is(":checked")) {
        $("#tdAllowed").addClass("yellowBG");
        valid = false;
    }
    else
        $("#tdAllowed").removeClass("yellowBG");

    if (!valid)
        ShowMsg("Please correct the highlighted fields", "redBG");
    return valid;
}

function CopyLink (UUID) {
    const ta = document.createElement('textarea');
    ta.value = "https://www.shopafile.com/buy.php?l=" + UUID;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
}

function ShowFiles(type) {
    var url = (type == 'files') ? "files.php" : "search.php?kw=" + $("#SearchKeywords").val() + "&cat=" + $("#selCategories").val();
    $.ajax({
        type: "GET",
        url: url,
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            BuildTable(type, JSON.parse(response));
        }
    });
}

function BuildTable(type, json) {
    var table = "<table id='tblFiles'>";
    table += '<tr>';
    table += '    <th class="left">File Name</th>';
    table += '    <th class="left">Description</th>';
    table += '    <th class="center">Category</th>';
    table += '    <th class="center">Price</th>';
    if (type == 'files') {
        table += '    <th class="center">Views</th>';
        table += '    <th class="center">Downloads</th>';
        table += '    <th class="center">Earnings</th>';
    }
    table += '</tr>';

    for (var i = 0; i < json.length; i++) {
        var j = json[i];
        if (type == 'files') {
            var FileID = j.id;
            var onmouseout  = "$(\"#Image" + FileID + "\").hide();";
            var onmouseover = "$(\"#Image" + FileID + "\").show();";
        }

        table += "<tr>";
        if (type == 'files')
            table += "<td><span onmouseout='" + onmouseout + "' onmouseover='" + onmouseover + "'>" + j.FileName + "</span></td>";
        else
            table += "<td>" + j.FileName + "</td>";
        table += "<span class='FileImage' id='Image" + FileID + "'>";
        table += "  <img style='width:100px;' src='data:image;base64," + j.image + "'/></span>";
        var desc = j.description;
        if (desc.length <= 40)
            table += "<td>" + desc + "</td>";
        else
            table += "<td><span title='" + desc + "'>" + desc.substring(0, 40) + "<span></td>";
        table += "<td>" + j.category + "</td>";
        table += "<td>$" + parseFloat(j.price).toFixed(2) + "</td>";
        if (type == 'files') {
            table += "<td>" + j.views + "</td>";
            table += "<td>" + j.downloads + "</td>";
            table += "<td>$" + parseFloat(j.earnings).toFixed(2) + "</td>";
            // right side tool links
            var title = "Click to copy the purchase link. Share it with your friends so they can buy your file";
            var onclick = "CopyLink('" + j.UUID + "'); ShowMsg('The purchase link to this file has been copied to the clipboard', 'greenBG');";
            table += "<td> <a class='RepeatButton green' title='" + title + "' onclick=\"" + onclick + "\">Link</a> &nbsp;";
            table += "<a class='RepeatButton orange' onclick='GetUpdateData(" + FileID + ");'>Edit</a> &nbsp;";
            table += "<a class='RepeatButton red' onclick='DeleteFile(" + FileID + ");'>Delete</a> </td>";
        }
        else {
            table += "<td><a class='RepeatButton green' href='https://www.shopafile.com/buy.php?l=" + j.UUID + "'>Buy File</a></td>";
        }
        table += "</tr>";
    }
    table += "</table>";
    $("#dashboard").html(table).show();
    $("#divSearch").hide();
}
