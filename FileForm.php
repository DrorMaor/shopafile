
<div id="FileForm">
    <div style="width:100%">
        <h3 style="float: left;">Edit File</h3>
        <img src="close.png" style="float: right; padding-top:16px;" class="close" onclick="FileFormDisplay(false);"></img>
    </div>
    <br>
    <table>
        <tr>
            <td colspan="2">
                Description <br>
                <textarea rows="7" cols="35" id="fileDescription"></textarea>
            </td>
        </tr>
        <tr>
            <td>Category</td>
            <td>
                <div id="divCategories"></div>
            </td>
        </tr>
        <tr>
            <td>Price</td>
            <td>
                $ <input type="number" id="filePrice" onchange="ComputeReceive();" onkeyup="ComputeReceive();" style="width:75px;">
                &nbsp;
                <span id="fileYWR"></span>
            </td>
        </tr>
        <tr>
            <td>Image</td>
            <td>
                <div id="divImageCurrent">
                    <img id="fileImageCurrent" style="width:100px;">
                    <br>
                </div>
                <input type="file" id="fileImage">
            </td>
        </tr>
        <tr>
            <td>The File</td>
            <td>
                <div id="divFileName">
                    <span id="fileFileName"></span>
                    <br>
                </div>
                <input type="file" id="fileFile">
            </td>
        </tr>
        <tr id="trLegallyAllowed" style="display:none;">
            <td colspan="2">
                <input type="checkbox" id="fileAllowed"> I am legally allowed to sell this file
            </td>
        </tr>
    </table>
    <br>
    <a class="button orangeBG" FileID="" id="buttonEditFile" style="display:none;" onclick="EditFile($('#buttonEditFile').attr('FileID'));">Edit File</a>
    <a class="button greenBG" id="buttonUploadFile" onclick="UploadFile();" style="display:none;">Upload File</a>
</div>
