<div id="LoginForm" class="PopupForm">
    <div style="width:100%">
        <span class="LargeHeading">Please Login</span>
        <img src="images/close.png" class="ImageIcon right" onclick="PopupFormDisplay(false, 'LoginForm');"></img>
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
