
$(document).ready(function(){
    PopulateCategories();
});

function ShowMsg(msg, BGcolor) {
    $("#divMessage").html(msg).removeClass().addClass(BGcolor).show().delay(3000).fadeOut(750);
}

function CleanFileForm(type) {
    if (type == 'upload') {
        $("#FileFormHeading").html("Upload File");
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
        $("#FileFormHeading").html("Edit File");
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

function DeleteFile(FileID) {
    if (confirm ("Are you sure you want to delete this file?")) {
        $.ajax({
            type: "GET",
            url: "delete.php?FileID=" + FileID,
            data: $(this).serialize(),
            dataType: 'text',
            success: function(response) {
                ShowMsg ("This file has been deleted", "redBG");
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
                $("#fileImageCurrent").attr("src", "data:image;base64," + j.image);
                $("#fileFileName").html(j.FileName);
                $("#buttonEditFile").attr("FileID", j.id);
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

function SaveFile(FileID) {
    var valid = true;
    var url = "";
    var formdata = new FormData();
    var msg = "";
    var BGcolor = "";
    if (FileID == -1) {
        valid = ValidateFileForm();
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
    if (valid) {
        formdata.append('description', $("#fileDescription").val());
        formdata.append('category', $("#selCategories").val());
        formdata.append('price', $("#filePrice").val());
        formdata.append('image', $("#fileImage")[0].files[0]);
        formdata.append('file', $("#fileFile")[0].files[0]);
        $.ajax({
            url: url,
            method: "POST",
            data : formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                ShowMsg(msg, BGcolor);
                FileFormDisplay(false);
                $("#divFiles").load("files.php");
            }
        });
    }
}

function ValidateFileForm() {
    var valid = true;
    var ErrMsg = "<br> <br>";
    if ($("#fileDescription").val() == "") {
        $("#tdDescription").addClass("yellowBG");
        valid = false;
    }
    else
        $("#tdDescription").removeClass("yellowBG");

    if ($("#selCategories").val() == -1) {
        $("#tdCategory").addClass("yellowBG");
        valid = false;
    }
    else
        $("#tdCategory").removeClass("yellowBG");

    if ($("#filePrice").val() == "" || $("#filePrice").val() < 0) {
        $("#tdPrice").addClass("yellowBG");
        valid = false;
    }
    else
        $("#tdPrice").removeClass("yellowBG");

    if ($("#fileImage").val() == "") {
        $("#tdImage").addClass("yellowBG");
        valid = false;
    }
    else
        $("#tdImage").removeClass("yellowBG");

    if ($("#fileFile").val() == "") {
        $("#tdFile").addClass("yellowBG");
        valid = false;
    }
    else
        $("#tdFile").removeClass("yellowBG");

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
