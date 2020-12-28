<div id="acctDivEmail" class="PopupForm">
    <div style="width:100%">
        <div class='heading'>Email Address</div>
        <img src="close.png" class="close" onclick="PopupFormDisplay(false, 'acctDivEmail');"></img>
    </div>
    <br>
    <input type='text' id='acctEmail'> &nbsp;
    <a class='button greenBG' onclick='SaveEmail();'>Save</a>
</div>
<div id="acctDivPwd" class="PopupForm">
    <div style="width:100%">
        <div class='heading'>Password</div>
        <img src="close.png" class="close" onclick="PopupFormDisplay(false, 'acctDivPwd');"></img>
    </div>
    <table>
        <tr>
            <td>Old Password</td>
            <td><input type='password' id='acctOldPwd'></td>
        </tr>
        <tr>
            <td>New Password</td>
            <td><input type='password' id='acctNewPwd1'></td>
        </tr>
        <tr>
            <td>Confirm</td>
            <td><input type='password' id='acctNewPwd2'></td>
        </tr>
        <tr>
            <td colspan="2" style="text-align:center;">
                <a class='button greenBG' onclick='SavePwd();'>Save</a>
            </td>
        </tr>
    </table>
</div>
<div id="acctDivPayPal" class="PopupForm">
    <div style="width:100%">
        <div class='heading'>PayPal Account</div>
        <img src="close.png" class="close" onclick="PopupFormDisplay(false, 'acctDivPayPal');"></img>
    </div>
    <br>
    <input type='text' id='acctPayPal'> &nbsp;
    <a class='button greenBG' onclick='SavePayPall();'>Save</a>
</div>
