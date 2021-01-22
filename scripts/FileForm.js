function CleanFileForm(type) {
    $("#FileFormHeading").html(type + " File");
    $("#fileDescription").val("");
    $("#selFileCategories").val(-1);
    $("#fileYWR").html("");
    $("#fileAllowed").prop("checked", false);
    $("#fileFileName").html("");

    if (type == 'Upload') {
        $("#fileImageCurrent").prop('src', "");
        $("#divImageCurrent").hide();
        $("#divFileName").hide();
        $("#buttonEditFile").hide();
        $("#buttonUploadFile").show();
    }
    else {
        $("#fileImageCurrent").prop('src', "data:image;base64,");
        $("#divImageCurrent").show();
        $("#divFileName").show();
        $("#buttonEditFile").show();
        $("#buttonUploadFile").hide();
    }

    PopupFormDisplay(true, "FileForm");
}

function GetUpdateData(UUID) {
    $("#divLoader").show();
    CleanFileForm('Edit');
    PopulateCategories("File");
    
    $.ajax({
        type: "GET",
        url: "php/GetUpdateData.php?UUID=" + UUID,
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
                $("#buttonEditFile").prop("UUID", j.UUID);
                
                PopupFormDisplay(true, "FileForm");
                $("#divLoader").hide();
            }
        }, 
        error: function () {
            ShowMsg([13], "red")
            $("#divLoader").hide();
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

function SaveFile(type) {
    var url = "";
    var formdata = new FormData();
    var msgID = Array();
    var color = "";
    if (type == "-upload") {
        url = "php/upload.php";
        msgID.push(26);
        color = "green";
    }
    else {
        url = "php/update.php";
        formdata.append('UUID', $('#buttonEditFile').prop('UUID'));
        msgID.push(25);
        color = "orange";
    }
    formdata.append('description', $("#fileDescription").val());
    formdata.append('category', $("#selFileCategories").val());
    formdata.append('price', $("#filePrice").val());
    formdata.append('image', $("#fileImage")[0].files[0]);
    formdata.append('file', $("#fileFile")[0].files[0]);
    formdata.append('user', user);

    $("#divLoader").show();
    $.ajax({
        url: url,
        method: "POST",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function() {
            ShowMsg(msgID, color);
            PopupFormDisplay(false, "FileForm");
            GetMyFiles();
            $("#divLoader").hide();
        }, 
        error: function () {
            ShowMsg([13], "red")
            $("#divLoader").hide();
        }
    });
}
