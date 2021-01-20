function SaveEmail() {
    var msgArray = Array();
    var email = $("#acctEmail").val();
    if (email == "")
        msgArray.push(17);
    else 
        if (!IsEmailValid(email))
            msgArray.push(18);

    if (msg != "") {
        var formdata = new FormData();
        formdata.append('email', email);
        formdata.append('user', user);
        $.ajax({
            url: "php/save/SaveEmail.php",
            method: "POST",
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function() {
                ShowMsg([1], 'greenBG');
            }
        });
    }
    else
        ShowMsg(msgArray, "redBG");
}

function SavePayPal() {
    var msgArray = Array();
    var PayPal = $("#acctPayPal").val();
    if (PayPal == "")
        msgArray.push(21);
    else 
        if (!IsEmailValid(PayPal))
            msgArray.push(22);

    if (msg != "") {
        var formdata = new FormData();
        formdata.append('PayPal', PayPal);
        formdata.append('user', user);
        $.ajax({
            url: "php/save/SavePayPal.php",
            method: "POST",
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function() {
                ShowMsg([2], 'greenBG');
            }
        });
    }
    else
        ShowMsg(msgArray, "redBG");
}

function SavePwd() {
    if ($("#acctNewPwd1").val() != $("#acctNewPwd2").val()) {
        ShowMsg([3], 'redBG');
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
                    ShowMsg([4], 'greenBG');
                    $("#acctOldPwd").val("");
                    $("#acctNewPwd1").val("");
                    $("#acctNewPwd2").val("");
                }
                else
                    ShowMsg([5], 'redBG');
            }
        });
    }
}