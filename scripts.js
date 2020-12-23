
$(document).ready(function(){
    PopulateCategories();
});

// general File Form functions

function ShowMsg(msg, BGcolor) {
    $("#divMessage").html(msg).addClass(BGcolor).show().delay(2500).fadeOut(500);
}

function AfterFileAction(msg, BGcolor) {
    ShowMsg(msg, BGcolor);
    FileFormDisplay(false);
    $("#divFiles").load("files.php");
}

function CleanFileForm(type) {
    if (type == 'upload') {
        $("#fileDescription").val("");
        $("#selCategories").val(-1);
        $("#filePrice").val("");
        $('#fileYWR').html("");
        $("#divImageCurrent").hide();
        $("#divFileName").hide();
        $("#fileAllowed").val("");
        $("#trLegallyAllowed").show();
        $("#buttonUploadFile").show();
        $("#buttonEditFile").hide();
    }
    else {
        $("#divImageCurrent").show();
        $("#divFileName").show();
        $("#trLegallyAllowed").hide();
        $("#buttonUploadFile").hide();
        $("#buttonEditFile").show();
    }
    FileFormDisplay(true);
}

function FileFormDisplay(show) {
    var display = (show) ? "block" : "none";
    var opacity = (show) ? .25 : 1;
    $("#overlay").css("display", display);
    $("#divFiles").css('opacity', opacity);
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

////////////////////////

// delete file

function DeleteFile(FileID) {
    if (confirm ("Are you sure you want to delete this file?")) {
        $.ajax({
            type: "GET",
            url: "delete.php?FileID=" + FileID,
            data: $(this).serialize(),
            dataType: 'text',
            success: function(response) {
                ShowMsg ("This file has been deleted", "greenBG");
            }
        });
    }
}

// update file

function GetUpdateData(FileID) {
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
                $("#fileImageCurrent").attr("src", "data:image;base64," + j.image);
                $("#fileFileName").html(j.FileName);
                $("#buttonEditFile").attr("FileID", j.id).show();
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
            select.appendTo($("#divCategories"));
        }
    });
}

function EditFile(FileID) {
    var formdata = new FormData();
    formdata.append('FileID', FileID);
    formdata.append('description', $("#fileDescription").val());
    formdata.append('category', $("#selCategories").val());
    formdata.append('price', $("#filePrice").val());
    formdata.append('image', $("#fileImage")[0].files[0]);
    formdata.append('file', $("#fileFile")[0].files[0]);

    $.ajax({
        url: "update.php",
        method: "POST",
        data : formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            AfterFileAction("Your changes have been saved", "greenBG");
        }
    });
}

// upload file

function UploadFile () {
    if (ValidateFileForm()) {
        var formdata = new FormData();
        formdata.append('description', $("#fileDescription").val());
        formdata.append('category', $("#selCategories").val());
        formdata.append('price', $("#filePrice").val());
        formdata.append('image', $("#fileImage")[0].files[0]);
        formdata.append('file', $("#fileFile")[0].files[0]);

        $.ajax({
            url: "upload.php",
            method: "POST",
            data : formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                AfterFileAction("Your file has been uploaded", "greenBG");
            }
        });
    }
}

function ValidateFileForm() {
    var valid = true;
    var ErrMsg = "<br> <br>";
    if ($("#fileDescription").val() == "") {
        ErrMsg += "* You must include a description <br>";
        valid = false;
    }
    if ($("#selCategories").val() == -1) {
        ErrMsg += "* You must include a category <br>";
        valid = false;
    }
    if ($("#filePrice").val() == "" || $("#filePrice").val() < 0) {
        ErrMsg += "* You haven't listed the price <br>";
        valid = false;
    }
    if ($("#fileImage").val() == "") {
        ErrMsg += "* You must upload an image <br>";
        valid = false;
    }
    if ($("#fileFile").val() == "") {
        ErrMsg += "* You forgot to include the file <br>";
        valid = false;
    }
    if (!$('#fileAllowed').is(":checked")) {
        ErrMsg += "* You must be legally allowed to sell this file <br>";
        valid = false;
    }

    if (!valid)
        $("#uploadErrorMessages").html(ErrMsg).show();
    return valid;
}

function CopyLink (UUID) {
    const ta = document.createElement('textarea');
    ta.value = "https://www.shopafile.com/buy.php?b=" + UUID;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
}
