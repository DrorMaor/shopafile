<div id="BuyFile" class="PopupForm">
    <div style="width:100%">
        <span class='LargeHeading'>Buy a File</span>
            <img src="images/close.png" class="ImageIcon right" onclick="PopupFormDisplay(false, 'BuyFile');"></img>
    </div>
    <br>
    <div class="center">
        <img id="buyImage" class="BuyFileImage">
        <br> <br>
        <div id="buyDesc"> </div>
        <br>
        <div class='bold center' style="width:100%;" id="buyFileName"></div>
        <div class='center blue' style="width:100%;" id="buyCategory"></div>
        <div class="center" style="width:100%;">
            Price: <span id="buyPrice"></span>
            / 
            Size: <span id="buySize"></span>
        </div>
        <br>
        <div id="buyUUID" UUID='0'></div>
        <a class="button greenBG" id="buttonUploadFile" onclick="BuyFile($('#buyUUID').prop('UUID'));" class="hide">Buy File</a>
    </div>
</div>
