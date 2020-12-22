

// general File Form functions

function HideFileForm(form) {
    $("#overlay").hide();
    $("#files").css('opacity', '1');
    $("#" + form + "Form").hide();
}

function ShowFileForm(form) {
    $("#overlay").show();
    $("#files").css('opacity', '0.25');
    $("#" + form + "Form").show();
}

function ComputeReceive() {
    var price = $('#filePrice').val();
    var ywr = price - 0.99;
    if (price > 33)
        ywr = 0.97 * price;
    $('#fileYWR').html('You will receive: $' + parseFloat(ywr).toFixed(2));
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
                alert ("This file has been deleted");
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
                $("#updateDescription").val(j.description);
                PopulateCategories(j.category);
                $("#updatePrice").val(j.price);
                $("#updateImageCurrent").attr("src", "data:image;base64," + j.image);
                $("#updateFileName").html(j.FileName);
                $("#buttonEditFile").attr("FileID", j.id);
                $("#divLoader").hide();
                ShowFileForm("Edit");
            }
        }
    });
}

function PopulateCategories(category) {
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
                var selected = (category == j.id);
                $("<option />", {value: j.id, text: j.category, selected: selected}).appendTo(select);
            }
            //$("#selCategories").val(category);
            select.appendTo($("#divCategories"));
        }
    });
}

function EditFile(FileID) {
    var formdata = new FormData();
    formdata.append('FileID', FileID);
    formdata.append('description', $("#updateDescription").val());
    formdata.append('category', $("#selCategories").val());
    formdata.append('price', $("#updatePrice").val());
    formdata.append('image', $("#updateImage")[0].files[0]);
    formdata.append('file', $("#updateFile")[0].files[0]);

    $.ajax({
        url: "update.php",
        method: "POST",
        data : formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            alert ("Your changes have been saved");
        }
    });
    HideFileForm("Edit");
    $("#EditForm").load("#EditForm");
}

// upload file

function UploadFile () {
    if (ValidateFileForm()) {
        var formdata = new FormData();
        formdata.append('description', $("#fileDescription").val());
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
                alert ("Your file has been uploaded")
            }
        });
        HideFileForm("Upload");
    }
}

function ValidateFileForm() {
    var valid = true;
    var ErrMsg = "<br> <br>";
    if ($("#fileDescription").val() == "") {
        ErrMsg += "* You must include a description <br>";
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
