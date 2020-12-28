
<div id="FileForm" class="PopupForm">
    <div style="width:100%">
        <span class="heading" id="FileFormHeading"></span>
        <img src="close.png" class="close" onclick="PopupFormDisplay(false, 'FileForm');"></img>
    </div>
    <br>
    <table>
        <tr>
            <td colspan="2">
                <span id="spnDescription">Description</span> <br>
                <textarea rows="7" cols="35" id="fileDescription"></textarea>
            </td>
        </tr>
        <tr>
            <td>
                <span id="spnCategory">Category</span>
            </td>
            <td>
                <div id="divFileCategories"></div>
            </td>
        </tr>
        <tr>
            <td>
                <span id="spnPrice">Price</span>
            </td>
            <td>
                $ <input type="number" id="filePrice" onchange="ComputeReceive();" onkeyup="ComputeReceive();" style="width:75px;">
                &nbsp;
                <span id="fileYWR"></span>
            </td>
        </tr>
        <tr>
            <td>
                <span id="spnImage">Image</span>
            </td>
            <td>
                <div id="divImageCurrent">
                    <img id="fileImageCurrent" style="width:100px;">
                    <br>
                </div>
                <input type="file" id="fileImage" accept=".gif, .jpg, .jpeg, .png">
            </td>
        </tr>
        <tr>
            <td>
                <span id="spnFile">The File</span>
            </td>
            <td>
                <div id="divFileName">
                    <span id="fileFileName"></span>
                    <br>
                </div>
                <input type="file" id="fileFile">
            </td>
        </tr>
        <tr>
            <td colspan="2" id="tdAllowed">
                <input type="checkbox" id="fileAllowed">I am legally allowed to sell this file
            </td>
        </tr>
        <tr>
            <td colspan="2" style="text-align:center;">
                <br>
                <a class="button orangeBG" FileID="" id="buttonEditFile" class="hide" onclick="SaveFile($('#buttonEditFile').prop('FileID'));">Edit File</a>
                <a class="button greenBG" id="buttonUploadFile" onclick="SaveFile(-1);" class="hide">Upload File</a>
            </td>
        </tr>
    </table>
</div>
