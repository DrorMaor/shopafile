
<div id="LoginForm" class="PopupForm">
    <div style="width:100%">
        <h3 style="float: left;">Please Login</h3>
        <img src="close.png" style="float: right; padding-top:16px;" class="close" onclick="PopupFormDisplay(false, 'LoginForm');"></img>
    </div>
    <br>
    <table>
        <tr>
            <td>
                User
            </td>
            <td>
                <input type="text" id="LoginUser" value="dror.m.maor@gmail.com">
            </td>
        </tr>
        <tr>
            <td>
                Password
            </td>
            <td>
                <input type="password" id="LoginPwd" value="testing123">
            </td>
        </tr>
        <tr>
            <td colspan="2" style="text-align:center;">
                <br>
                <a class="button greenBG" id="buttonLogin" onclick="Login();">Login</a>
            </td>
        </tr>
    </table>
</div>
