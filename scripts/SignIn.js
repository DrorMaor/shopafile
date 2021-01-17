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
                ShowMsg(6, "redBG");
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
    ShowMsg(15, "greenBG");
}

function SendPasswordResetEmail() {
    if ($("#SignInUser").val() == "")
        ShowMsg(7, "redBG");
    else {
        var msg = "Would you like us to send an email to " + $("#SignInUser").val() + " to reset your password?";
        if (confirm(msg)) {
            
        }
    }
}

