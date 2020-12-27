<div id="acctDivEmail" class="PopupForm">
    <div style="width:100%">
        <h3 style="float: left;">Account Email Address</h3>
        <img src="close.png" style="float: right; padding-top:16px;" class="close" onclick="PopupFormDisplay(false, 'acctDivEmail');"></img>
    </div>
    Email &nbsp; <input type='text' id='acctEmail'>
    <a class='greenBG' onclick='SaveEmail();'>Save</a>
</div>
<div id="acctDivPwd" class="PopupForm">
    <div style="width:100%">
        <h3 style="float: left;">Password</h3>
        <img src="close.png" style="float: right; padding-top:16px;" class="close" onclick="PopupFormDisplay(false, 'acctDivPwd');"></img>
    </div>
    <table>
        <tr> <td colspan='2' style='font-weight:bold;'>Password</td> </tr>
        <tr> <td>Old Password</td> <td><input type='password' id='acctOldPwd'></td> </tr>
        <tr> <td>New Password</td> <td><input type='password' id='acctNewPwd1'></td> </tr>
        <tr> <td>Confirm</td> <td><input type='password' id='acctNewPwd2'></td> </tr>
        <tr> <td colspan="2"> <a class='greenBG' onclick='SavePwd();'>Save</a> </td> </tr>
    </table>
</div>
<div id="acctDivPayPal" class="PopupForm">
    <div style="width:100%">
        <h3 style="float: left;">PayPal Account</h3>
        <img src="close.png" style="float: right; padding-top:16px;" class="close" onclick="PopupFormDisplay(false, 'acctDivPayPal');"></img>
    </div>
    PayPal &nbsp; <input type='text' id='acctPayPal'>
    <a class='greenBG' onclick='SavePayPall();'>Save</a>
</div>
