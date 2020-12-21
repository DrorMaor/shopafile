
<div id="EditForm" class="FileForm">
    <div style="width:100%">
        <h3 style="float: left;">Edit File</h3>
        <img src="close.png" style="float: right; padding-top:16px;" class="close" onclick="HideFileForm('Edit');"></img>
    </div>
    <br>
    <table>
        <tr>
            <td colspan="2">
                Description <br>
                <textarea id="updateDescription"></textarea>
            </td>
        </tr>
        <tr>
            <td>Price</td>
            <td>
                $ <input type="number" id="updatePrice" onkeyup="ComputeReceive();" style="width:100px;">
                <br>
                <span id="fileYWR"></span>
            </td>
        </tr>
        <tr>
            <td>Image</td>
            <td>
                <img id="updateImageCurrent" style="width:100px;"
                    onmouseover1="$('#updateImageCurrent').css('width','100%');"
                    onmouseout1="$('#updateImageCurrent').css('width','100px');"
                    >
                <br>
                <input type="file" id="updateImage">
            </td>
        </tr>
        <tr>
            <td>The File</td>
            <td>
                <span id="updateFileName"></span> <br>
                <input type="file" id="updateFile">
            </td>
        </tr>
    </table>
    <br>
    <a FileID="" class="button orangeBG" id="buttonEditFile" onclick="EditFile($('#buttonEditFile').attr('FileID'));">Edit File</a>
</div>
