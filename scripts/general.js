var user = "";
var PopupFiles = null;

$(document).keyup(function(e) {
    if (e.key === "Escape")
        PopupFormDisplay(false, "");
});

function PopupFormDisplay(show, form) {
    $(".PopupForm").hide();
    var display = (show) ? "block" : "none";
    var opacity = (show) ? .25 : 1;
    $("#overlay").css("display", display);
    $("#MyFiles").css('opacity', opacity);
    $("#SearchResults").css('opacity', opacity);
    $("#" + form).css("display", display);
    
    if (!show)
        ClearFormFields(form);
}

function ClearFormFields(form) {
    $.each(PopupFiles, function(index, PopupFiles) {
        $.each(PopupFiles, function(index, elements) {
            if (index == form && form != "AccountSettings") {
                $.each(elements, function(index, element) {
                    var id = $("#" + element.id);
                    switch (element.type) {
                        case "text":
                            id.val("");
                            break;
                        case "textarea":
                            id.val("");
                            break;
                        case "yelow":
                            id.css("background-color", "white");
                            break;
                        case "span":
                            id.html("");
                            break;
                        case "checkbox":
                            id.prop("checked", false);
                    }
                });
            }
        });
    });
}

$(document).ready(function() {
    if (window.location.search != "") 
        return;
    else {
        IncludePopups();

        // try to match logged in user
        if (document.cookie.length > 0 && document.cookie != "user=-1") {
            var kookie = document.cookie.split("=");
            if (kookie[0] == "user" && kookie[1] != "-1") {
                user = kookie[1];  // set user in global variable
                GetAccountData();
                GetMyFiles();
                $("#tdSignIn").hide();
                $("#tdSignOut").show();
            }
        }
        else
            LoadSearchResults(false);

        RecordTraffic();
        PopulateCategories();
    }
});

function RecordTraffic() {
    $.ajax({
        type: "GET",
        url: "php/traffic.php",
        data: $(this).serialize(),
        dataType: 'text'
    });
}

function IncludePopups() {
    $.getJSON("popup/files.json", function(json) {
        PopupFiles = json;
        $.each(PopupFiles, function(index, PopupFiles) {
            $.each(PopupFiles, function(form, elements) {
                $.get("popup/" + form + ".html", '', function (data) {
                    $("#PopupDivs").append(data); // add the actual popup form
                });
            });
        });
    });
}

function ShowMsg(msg, BGcolor) {
    $("#divMessage").html(msg).removeClass().addClass(BGcolor).show().delay(2500).fadeOut(750);
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
