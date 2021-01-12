function SaveEmail() {
    var formdata = new FormData();
    formdata.append('email', $("#acctEmail").val());
    formdata.append('user', user);
    $.ajax({
        url: "php/save/SaveEmail.php",
        method: "POST",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function() {
            ShowMsg("Your email address has been updated", 'greenBG');
        }
    });
}

function SavePayPal() {
    var formdata = new FormData();
    formdata.append('PayPal', $("#acctPayPal").val());
    formdata.append('user', user);
    $.ajax({
        url: "php/save/SavePayPal.php",
        method: "POST",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function() {
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
        formdata.append('user', user);
        $.ajax({
            url: "php/save/SavePwd.php",
            method: "POST",
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
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