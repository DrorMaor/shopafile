<div id="AccountSettings" class="PopupForm">
    <div style="width:100%">
        <span class='LargeHeading'>Account Settings</span>
        <img src="images/close.png" class="ImageIcon right" onclick="PopupFormDisplay(false, 'AccountSettings');"></img>
    </div>
    <br>
    <table>
        <tr>
            <td class="SmallHeading">Email Address</td>
        </tr>
        <tr>
            <td>
                <input type='text' id='acctEmail'>
            </td>
            <td>
                <a class='button greenBG right' onclick='SaveEmail();'>Save</a>
            </td>
        </tr>

        <tr>
            <td class="SmallHeading">Password</td>
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
                <a class='button greenBG right' onclick='SavePwd();'>Save</a>
            </td>
        </tr>

        <tr>
            <td class="SmallHeading">PayPal Account</td>
        </tr>
        <tr>
            <td>
                <input type='text' id='acctPayPal'>
            </td>
            <td>
                <a class='button greenBG right' onclick='SavePayPal();'>Save</a>
            </td>
        </tr>
    </table>
</div>