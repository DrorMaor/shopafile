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
                PopupFormDisplay(false, "SignInForm");
                GetAccountData();
                GetMyFiles();
                $("#tdSignIn").hide();
                $("#tdSignOut").show();
            }
            else
                ShowMsg("An error occurred", "redBG");
        }
    });
}

function SignOut () {
    document.cookie = "user=-1";
    $("#tdSignIn").show();
    $("#tdSignOut").hide();
    $("#MyFiles").hide();
    $("#AcctHeading").hide();
    $("#AccountMenu").hide();
    $("#RightLeftArrow").html("⇢");
}

function SignUp() {
   
}