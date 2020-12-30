<table>
    <tr>
        <td>
            <img src="images/logo.png" style="width:200px;">
        </td>
        <td class="TopPadding" onclick="PopupFormDisplay(true, 'FAQ');">
            <span class="MenuItem">FAQ</span>
        </td>
        <td class="TopPadding" onclick="PopupFormDisplay(true, 'ItsFree');">
            <span class="MenuItem">It's FREE</span>
        </td>
        <td class="TopPadding" id="tdLogin" onclick="PopupFormDisplay(true, 'LoginForm');">
            <a class="MenuItem" id="menuLogin">Login</a>
        </td>
        <td class="TopPadding hide" id="tdLogout">
            <a class="MenuItem" id="menuLogout" onclick="Logout();">Logout</a>
            &nbsp;
            <img src="images/settings.png" title="Change Account Settings" class="ImageIcon right" onclick="PopupFormDisplay(true, 'AccountSettings');"></img>
        </td>
        <td class="TopPadding">
            <input type="text" id="SearchKeywords" placeholder="  Search for anything digital">
            <a onclick="ShowSearchResults();" id="SearchGlyph">&#128269;</a>
        </td>
    </tr>
</table>
