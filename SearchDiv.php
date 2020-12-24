<div id="divSearch">
    <table>
        <tr>
            <td class="SearchTablePadding">Keywords</td>
            <td class="SearchTablePadding">
                <input type="text" id="SearchKeywords">
            </td>
        </tr>
        <tr>
            <td class="SearchTablePadding">Category</td>
            <td class="SearchTablePadding">
                <div id="divSearchCategories"></div>
            </td>
        </tr>
        <tr>
            <td class="SearchTablePadding" colspan="2">
                <a class="button greenBG" onclick="ShowFiles('search');" style="color:white; font-weight:bold; float:left;">Search</a>
                <img src="close.png" style="float: right; padding-top:16px;" class="close" onclick="$('#divSearch').hide();"></img>
            </td>
        </tr>
    </table>
</div>
