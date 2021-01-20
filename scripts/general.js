var user = "";
var messages = null;
var PopupFiles = null;
var categories = null;

$(document).keyup(function(e) {
    if (e.key === "Escape")
        PopupFormDisplay(false, "");
});

function PopupFormDisplay(show, form) {
    $(".PopupForm").hide();
    var display = (show) ? "block" : "none";
    var opacity = (show) ? .25 : 1;
    var MouseEvents = (show) ? "none" : "auto";
    $("#overlay").css("display", display);
    $(".MouseEvents").css('opacity', opacity).css("pointer-events", MouseEvents);
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
        PopulateCategories("Search");
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
        else {
         //   LoadSearchResults(false);
        }
        RecordTraffic();
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

function ShowMsg(msgArray, BGcolor) {
    var ul = (msgArray.length > 1);
    var msg = (ul) ? "<ul>" : "";
    for (var i=0; i<msgArray.length; i++) {
        $.each(messages, function(index, messages) {
            $.each(messages, function(index, message) {
                if (message.id == msgArray[i])
                    msg += (ul) ? "<li>" + message.msg + "</li>" : message.msg;
            });
        });
    }

    if (ul) {
        msg += "</ul>";
        $("#divMessage").css("text-align", "left");
    }
    else
        $("#divMessage").css("text-align", "center");

    // finally, show the msg
    $("#divMessage").html(msg).removeClass().addClass(BGcolor).show().delay(2500).fadeOut(750)
}

function PopulateCategories(type) {
    if ($("#sel" + type + "Categories").length)
        $("#sel" + type + "Categories").remove();
    var select = $("<select id='sel" + type + "Categories'>");
    $("<option />", {value: -1, text: "Select ..."}).appendTo(select);
    
    $.getJSON("json/categories.json", function(json) {
        categories = json;
        $.each(categories, function(index, categories) {
            $.each(categories, function(index, cat) {
                $("<option />", {value: cat.id, text: cat.cat}).appendTo(select);
            });
        });
    });

    select.appendTo($("#spn" + type + "Categories"));
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
    ShowMsg([10], "greenBG");
}

function IsEmailValid(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var valid = regex.test(email);
    return valid;
}

function ValidateForm(form) {
    var msgArray = Array();
    $.each(PopupFiles, function(index, PopupFiles) {
        $.each(PopupFiles, function(index, elements) {
            if (index == form) {
                $.each(elements, function(index, element) {
                    var id = $("#" + element.id);
                    if (element.validate != "") {
                        switch (element.validate) {
                            case "text":
                                if (id.val() == "")
                                    msgArray.push(16);
                                break;
                            case "email":
                                if (id.val() == "")
                                    msgArray.push(17);
                                else 
                                    if (!IsEmailValid(id.val()))
                                        msgArray.push(18);
                                break;
                            case "checkbox":
                                if (!id.prop("checked")) 
                                    msgArray.push(19);
                                break;
                            case "pwd":
                                if (id.val() == "")
                                    msgArray.push(20);
                                break;
                            case "PayPal":
                                if (id.val() == "")
                                    msgArray.push(21);
                                else
                                    if (!IsEmailValid(id.val()))
                                    msgArray.push(22);
                                break;
                        }
                    }
                });
            }
        });
    });
    if (msgArray.length > 0) {
        ShowMsg(msgArray, "redBG");
        return false;
    }
    else
        return true;
}
