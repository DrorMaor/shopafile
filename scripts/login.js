function Login() {
    var formdata = new FormData();
    formdata.append('user', $("#LoginUser").val());
    formdata.append('pwd', $("#LoginPwd").val());
    $.ajax({
        url: "php/login.php",
        method: "POST",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            if (response != "") {
                document.cookie = "user=" + response;
                PopupFormDisplay(false, "LoginForm");
                GetAccountData();
                GetMyFiles();
                $("#tdLogin").hide();
                $("#tdLogout").show();
            }
            else
                ShowMsg("There was an error in the login", "redBG");
        }
    });
}

function Logout () {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    $("#tdLogin").show();
    $("#tdLogout").hide();
    $("#MyFiles").hide();
    $("#AcctHeading").hide();
    $("#AccountMenu").hide();
    $("#RightLeftArrow").html("⇢");
}