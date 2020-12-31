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
        <div class="center" style="width:100%;">
            Price: <span id="buyPrice"></span>
            / 
            Size: <span id="buySize"></span>
        </div>
        <br>
        <a class="button greenBG" id="buttonUploadFile" onclick="SaveFile(-1);" class="hide">Buy File</a>
    </div>
</div>
