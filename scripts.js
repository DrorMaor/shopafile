
$(document).ready(function(){
    PopulateCategories();
});

function ShowMsg(msg, BGcolor) {
    $("#divMessage").html(msg).removeClass().addClass(BGcolor).show().delay(2500).fadeOut(750);
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

    // remove yellow highlights, if they remained
    $("#spnDescription").removeClass("yellowBG");
    $("#spnCategory").removeClass("yellowBG");
    $("#spnPrice").removeClass("yellowBG");
    $("#spnImage").removeClass("yellowBG");
    $("#spnFile").removeClass("yellowBG");
    $("#tdAllowed").removeClass("yellowBG");

    PopupFormDisplay(true, "FileForm");
}

function PopupFormDisplay(show, form) {
    var display = (show) ? "block" : "none";
    var opacity = (show) ? .25 : 1;
    $("#overlay").css("display", display);
    $("#MyFiles").css('opacity', opacity);
    $("#SearchResults").css('opacity', opacity);
    $("#" + form).css("display", display);
}

function ComputeReceive() {
    // ywr = You Will Receive
    var price = $('#filePrice').val();
    var ywr = price * 0.92;  // regular 8% commission
    if (price < 12.5)
        ywr = price - 0.99;
    if (price > .99)
        $('#fileYWR').html('You get $' + parseFloat(ywr).toFixed(2));
    else
        $('#fileYWR').html("");
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

function GetUpdateData(FileID) {
    CleanFileForm('edit');
    $("#divLoader").show();
    $.ajax({
        type: "GET",
        url: "php/GetUpdateData.php?FileID=" + FileID,
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
                PopupFormDisplay(true, "FileForm");
            }
        }
    });
}

function PopulateCategories() {
    $.ajax({
        type: "GET",
        url: "php/categories.php",
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
            url = "php/upload.php";
            msg = "Your file has been uploaded";
            BGcolor = "greenBG";
        }
        else {
            url = "php/update.php";
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
                PopupFormDisplay(false, "FileForm");
                GetMyFiles();
            }
        });
    }
}

// LOGIN & LOGOUT //
function Login() {
    var formdata = new FormData();
    formdata.append('user', $("#LoginUser").val());
    formdata.append('pwd', $("#LoginPwd").val());
    $.ajax({
        url: "php/login.php",
        method: "POST",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            if (response != "") {
                document.cookie = "user=" + response;
                PopupFormDisplay(false, "LoginForm");
                GetAccountData();
                GetMyFiles();
                $("#tdLogin").hide();
                $("#tdLogout").show();
            }
            else
                ShowMsg("There was an error in the login", "redBG");
        }
    });
}

function Logout () {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    $("#tdLogin").show();
    $("#tdLogout").hide();
    $("#MyFiles").hide();
    $("#AcctHeading").hide();
    $("#AccountMenu").hide();
    $("#RightLeftArrow").html("⇢");
}
///////////////////

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
    const tb = document.createElement('textbox');
    tb.value = "https://www.shopafile.com/buy.php?l=" + UUID;
    document.body.appendChild(tb);
    tb.select();
    document.execCommand('copy');
    document.body.removeChild(tb);
}

// SEARCH //
function ShowSearchResults() {
    $.ajax({
        type: "GET",
        url: "php/search.php?kw=" + $("#SearchKeywords").val() + "&cat=" + $("#selCategories").val(),
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            $("#SearchResults").html(SearchResultsTable(JSON.parse(response))).show();
        }
    });
}

function SearchResultsTable(json) {
    // f.id, f.FileName, f.price, f.description, f.UUID, c.category
    var table = "<div class='LargeHeading'>Search Results</div>";
    table += "<table id='tblSearchResults'>";
    for (var i = 0; i < json.length; i++) {
        var j = json[i];
        if (i % 5 == 0)
            table += "<tr>";
        if (i % 5 == 4)
            table += "</tr>";
        
        table += "<td>";
        table += "<a onclick='PrepareBuyFileForm(\"" + j.image + "\", " + j.FileSize + ", " + j.price + ");'>";
        table += "<img class='SearchImage' style='width:200px;' src='data:image;base64," + j.image + "'/></a>";
        table += "<br> " + DescriptionSpan(j.description, 40, "SearchDesc", "div");
        table += "<br>Price $" + j.price;
        table += "<br>Size " + FileSizeText(j.FileSize);
        table += "</td>";
        
    }
    table += "</table>";
    return table;
}

function PrepareBuyFileForm(image, FileSize, price) {
    $("#buyImage").prop("src", "data:image;base64," + image);
    $("#buySize").html(FileSizeText(FileSize));
    $("#buyPrice").html("$" + price);
    PopupFormDisplay(true, 'BuyFile');
}

///////////

// SAVE ACCOUNT SETTINGS

function SaveEmail() {
    var formdata = new FormData();
    formdata.append('email', $("#acctEmail").val());
    $.ajax({
        url: "php/save/SaveEmail.php",
        method: "POST",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            console.log(response);
            ShowMsg("Your email address has been updated", 'greenBG');
        }
    });
}

function SavePayPal() {
    var formdata = new FormData();
    formdata.append('PayPal', $("#acctPayPal").val());
    $.ajax({
        url: "php/save/SavePayPal.php",
        method: "POST",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            ShowMsg("Your PayPal account has been updated", 'greenBG');
        }
    });
}

function SavePwd() {
    if ($("#acctNewPwd1").val() != $("#acctNewPwd2").val()) {
        ShowMsg("The new passwords don't match", 'redBG');
    }
    else {
        var formdata = new FormData();
        formdata.append('OldPwd', $("#acctOldPwd").val());
        formdata.append('NewPwd1', $("#acctNewPwd1").val());
        formdata.append('NewPwd2', $("#acctNewPwd2").val());
        $.ajax({
            url: "php/save/SavePwd.php",
            method: "POST",
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                console.log(response);
                if (response != "0") {
                    ShowMsg("Your password has been updated", 'greenBG');
                    $("#acctOldPwd").val("");
                    $("#acctNewPwd1").val("");
                    $("#acctNewPwd2").val("");
                }
                else
                    ShowMsg("An error occurred. Please try again", 'redBG');
            }
        });
    }
}

////////////////////////


// DASHBOARD FUNCTIONS //
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
    $.ajax({
        type: "GET",
        url: "php/files.php",
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            $("#MyFiles").html(MyFilesTable(JSON.parse(response))).show();
        }
    });
}

function UploadNewFile() {
    CleanFileForm('upload');
    PopupFormDisplay(true, "FileForm");
}

function FileSizeText(FileSize) {
    var retVal = parseFloat(FileSize / 1000 / 1.33).toFixed(0);
    if (FileSize < 1000 * 1000)
        retVal += " KB";
    else
        retVal = parseFloat(FileSize / 1000 / 1000 / 1.33).toFixed(1) + " MB";
    return retVal;
}

function DescriptionSpan(desc, chars, className, DivOrSpan) {
    var retVal = desc
    if (desc.length <= chars)
        retVal = "<span>" + desc + "</span>";
    else
        retVal =  "<" + DivOrSpan + " class='" + className + "' title='" + desc + "'>" + desc.substring(0, chars) + " ...</" + DivOrSpan + ">";
    return retVal;
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
////////////////////////
