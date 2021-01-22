function SaveEmail() {
    var msgArray = Array();
    var email = $("#acctEmail").val();
    if (email == "")
        msgArray.push(17);
    else 
        if (!IsEmailValid(email))
            msgArray.push(18);

    if (msgArray.length == 0) {
        var formdata = new FormData();
        formdata.append('email', email);
        formdata.append('user', user);
        $("#divLoader").show();
        $.ajax({
            url: "php/save/SaveEmail.php",
            method: "POST",
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function() {
                ShowMsg([1], 'green');
                $("#divLoader").hide();
            }, 
            error: function () {
                ShowMsg([13], "red")
                $("#divLoader").hide();
            }
        });
    }
    else
        ShowMsg(msgArray, "red");
}

function SavePayPal() {
    var msgArray = Array();
    var PayPal = $("#acctPayPal").val();
    if (PayPal == "")
        msgArray.push(21);
    else 
        if (!IsEmailValid(PayPal))
            msgArray.push(22);

    if (msgArray.length == 0) {
        var formdata = new FormData();
        formdata.append('PayPal', PayPal);
        formdata.append('user', user);
        
        $("#divLoader").show();
        $.ajax({
            url: "php/save/SavePayPal.php",
            method: "POST",
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function() {
                ShowMsg([2], 'green');
                $("#divLoader").hide();
            }, 
            error: function () {
                ShowMsg([13], "red")
                $("#divLoader").hide();
            }
        });
    }
    else
        ShowMsg(msgArray, "red");
}

function SavePwd() {
    if ($("#acctOldPwd").val() == "")
        ShowMsg([23], 'red');
    else if ($("#acctNewPwd1").val() != $("#acctNewPwd2").val())
        ShowMsg([3], 'red');
    else if (!IsPasswordValid($("#acctNewPwd1").val()))
        ShowMsg([14], 'red');
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
                    ShowMsg([4], 'green');
                    $("#acctOldPwd").val("");
                    $("#acctNewPwd1").val("");
                    $("#acctNewPwd2").val("");
                }
                else
                    ShowMsg([5], 'red');
            }
        });
    }
}