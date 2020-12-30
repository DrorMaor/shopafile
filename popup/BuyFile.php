<div id="BuyFile" class="PopupForm">
    <div style="width:100%">
        Buy a File
        <img src="images/close.png" class="ImageIcon right" onclick="PopupFormDisplay(false, 'BuyFile');"></img>
    </div>
    <br>
    You are about to purchase this file:
    <br>
    <img id="buyImage" style="width:100px;">
    <br>
    Price: <span id="buyPrice"></span>
    <br>
    Size: <span id="buySize"></span>
    <br>
    <a class="button greenBG" id="buttonUploadFile" onclick="SaveFile(-1);" class="hide">Buy File</a>
</div>
