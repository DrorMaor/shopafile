
$(document).ready(function(){
    if (window.location.search != "")
        return;
    else {
        $.ajax({
            type: "GET",
            url: "php/traffic.php",
            data: $(this).serialize(),
            dataType: 'text',
            success: function() {
                PopulateCategories();
                if (document.cookie.length > 0) {
                    var kookie = document.cookie.split("=");
                    if (kookie[0] == "user" && kookie[1] != "-1") {
                        GetAccountData();
                        GetMyFiles();
                        $("#tdSignIn").hide();
                        $("#tdSignOut").show();
                    }
                }
                LoadSearchResults(false);
                IncludePopups();
            }
        });
    }
});

function IncludePopups() {
    var PopupFiles  = ["AccountSettings", "MessageSeller", "FileForm", "BuyFile", "FAQ", "ItsFree", "SignInForm", "SignUpForm"];
    for (var i=0; i<PopupFiles.length; i++)
        $.get("popup/" + PopupFiles[i] + ".html", '', function (data) { $("#PopupDivs").append(data); });
}

function ShowMsg(msg, BGcolor) {
    $("#divMessage").html(msg).removeClass().addClass(BGcolor).show().delay(2500).fadeOut(750);
}

function PopupFormDisplay(show, form) {
    $(".PopupForm").hide();
    var display = (show) ? "block" : "none";
    var opacity = (show) ? .25 : 1;
    $("#overlay").css("display", display);
    $("#MyFiles").css('opacity', opacity);
    $("#SearchResults").css('opacity', opacity);
    $("#" + form).css("display", display);
}

function PopulateCategories() {
    $.ajax({
        type: "GET",
        url: "php/categories.php",
        data: $(this).serialize(),
        dataType: 'text',
        success: function(response) {
            $("#selCategories").remove();
            var select = $("<select id='selCategories'>");
            $("<option />", {value: -1, text: "Select ..."}).appendTo(select);
            var json = JSON.parse(response);
            for (var i = 0; i < json.length; i++) {
                var j = json[i];
                $("<option />", {value: j.id, text: j.category}).appendTo(select);
            }
            select.appendTo($("#divFileCategories"));
            select.appendTo($("#divSearchCategories"));
        }
    });
}

function FileSizeText(FileSize) {
    var retVal = parseFloat(FileSize / 1000 / 1.33).toFixed(0);
    if (FileSize < 1000 * 1000)
        retVal += " KB";
    else
        retVal = parseFloat(FileSize / 1000 / 1000 / 1.33).toFixed(1) + " MB";
    return retVal;
}

function DescriptionSpan(desc, chars, className, DivOrSpan) {
    var retVal = "<" + DivOrSpan + " class='" + className + "'";
    if (desc.length <= chars)
        retVal += ">" + desc;
    else
        retVal += " title='" + desc + "'>" + desc.substring(0, chars) + " ...";
    retVal += "</" + DivOrSpan + ">";
    return retVal;
}
