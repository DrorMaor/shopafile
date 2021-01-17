var user = "";
var PopupFiles = null;
var messages = null;

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
                        case "textarea":
                            id.val("");
                            break;
                        case "yellow":
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
        LoadMessages();
       
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
    $.getJSON("json/files.json", function(json) {
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

function LoadMessages() {
    $.getJSON("json/messages.json", function(json) {
        messages = json;
    });
}

function ShowMsg(msg, BGcolor) {
    $.each(messages, function(index, messages) {
        $.each(messages, function(index, message) {
            if (message.id == msg) 
                msg = message.msg;
        });
    });

    if (msg.indexOf("<ul>") >= 0)
        $("#divMessage").css("text-align", "left");
    else
        $("#divMessage").css("text-align", "center");
    // finally, show the msg
    $("#divMessage").html(msg).removeClass().addClass(BGcolor).show().delay(2500).fadeOut(750)
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

function ContactUs() {
    ShowMsg(10, "greenBG");
}

function IsEmailValid(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var valid = regex.test(email);
    return valid;
}

function ValidateForm(form) {
    var msg = "<ul>";
    $.each(PopupFiles, function(index, PopupFiles) {
        $.each(PopupFiles, function(index, elements) {
            if (index == form) {
                $.each(elements, function(index, element) {
                    var id = $("#" + element.id);
                    if (element.validate != "") {
                        switch (element.validate) {
                            case "text":
                                if (id.val() == "")
                                    msg += "<li>Please provide some text</li>";
                                break;
                            case "email":
                                if (id.val() == "" || !IsEmailValid(id.val()))
                                    msg += "<li>The email is invalid </li>";
                                break;
                            case "checkbox":
                                if (!id.prop("checked")) 
                                    msg += "<li>You must check the checkbox</li>";
                                break;
                            case "pwd":
                                if (id.val() == "")
                                    msg += "<li>Enter your password</li>";
                                break;
                        }
                    }
                });
            }
        });
    });
    msg += "</ul>";
    if (msg != "<ul></ul>") {
        ShowMsg(msg, "redBG");
        return false;
    }
    else
        return true;
}
