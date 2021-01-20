function CleanFileForm(type) {
    if (type == 'upload') {
        $("#FileFormHeading").html("Upload File");
        $("#selFileCategories").val(-1);
        $("#fileImageCurrent").prop('src', "data:image;base64,");
        $("#divImageCurrent").hide();
        $("#divFileName").hide();
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
    PopupFormDisplay(true, "FileForm");
}

function GetUpdateData(FileID) {
    CleanFileForm('edit');
    PopulateCategories("File");
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
                $("#selFileCategories").val(j.category);
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
        formdata.append('category', $("#selFileCategories").val());
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
            success: function() {
                ShowMsg(msg, BGcolor);
                PopupFormDisplay(false, "FileForm");
                GetMyFiles();
            }
        });
    }
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

    if ($("#selFileCategories").val() == -1) {
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
        ShowMsg([14], "redBG");
    return valid;
}


