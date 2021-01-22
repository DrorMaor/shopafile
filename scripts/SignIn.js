function SignIn() {
    var formdata = new FormData();
    formdata.append('user', $("#SignInUser").val());
    formdata.append('pwd', $("#SignInPwd").val());

    $("#divLoader").show();
    $.ajax({
        url: "php/SignIn.php",
        method: "POST",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            if (response != "") {
                document.cookie = "user=" + response;
                user = response;
                PopupFormDisplay(false, "SignInForm");
                GetAccountData();
                GetMyFiles();
                $("#tdSignIn").hide();
                $("#tdSignOut").show();
            }
            else
                ShowMsg([6], "red");
            
            $("#divLoader").hide();
        }, 
        error: function () {
            ShowMsg([13], "red")
            $("#divLoader").hide();
        }
    });
}

function SignOut () {
    document.cookie = "user=-1";
    $("#tdSignIn").show();
    $("#tdSignOut").hide();
    $("#MyFiles").hide();
    $("#AcctHeading").hide();
    LoadSearchResults(false);
}

function SignUp() {
    if ($("#SignUpNewPwd1").val() != $("#SignUpNewPwd2").val())
        ShowMsg([3], 'red');
    else {
        var formdata = new FormData();
        formdata.append('email', $("#SignUpEmail").val());
        formdata.append('pwd', $("#SignUpNewPwd1").val());
        formdata.append('PayPal', $("#SignUpPayPal").val());
        $("#divLoader").show();
        $.ajax({
            url: "php/SignUp.php",
            method: "POST",
            data: formdata,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response) {
                switch (response) {
                    case "0":
                        ShowMsg([15], "green");
                        break;
                    case "1":
                        ShowMsg([24], "red");
                        break;
                    default:
                        ShowMsg([13], "red");
                        break;   
                }
                $("#divLoader").hide();
            }, 
            error: function () {
                ShowMsg([13], "red")
                $("#divLoader").hide();
            }
        });
    }
}

function SendPasswordResetEmail() {
    if ($("#SignInUser").val() == "")
        ShowMsg([7], "red");
    else {
        var msg = "Would you like us to send an email to " + $("#SignInUser").val() + " to reset your password?";
        if (confirm(msg)) {
            
        }
    }
}

