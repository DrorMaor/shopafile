function SignIn() {
    var formdata = new FormData();
    formdata.append('user', $("#SignInUser").val());
    formdata.append('pwd', $("#SignInPwd").val());
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
                ShowMsg([6], "redBG");
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
        ShowMsg([3], 'redBG');
    else {
        var formdata = new FormData();
        formdata.append('email', $("#SignUpEmail").val());
        formdata.append('pwd', $("#SignUpNewPwd1").val());
        formdata.append('PayPal', $("#SignUpPayPal").val());
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
                        ShowMsg([15], "greenBG");
                        break;
                    case "1":
                        ShowMsg([24], "redBG");
                        break;
                    default:
                        ShowMsg([13], "redBG");
                        break;   
                }
            }
        });
    }
}

function SendPasswordResetEmail() {
    if ($("#SignInUser").val() == "")
        ShowMsg([7], "redBG");
    else {
        var msg = "Would you like us to send an email to " + $("#SignInUser").val() + " to reset your password?";
        if (confirm(msg)) {
            
        }
    }
}

