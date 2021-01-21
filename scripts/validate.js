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
                                    msgArray.push(27);
                                else 
                                    if (!IsPasswordValid(id.val()))
                                        msgArray.push(14);
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

function IsPasswordValid(pwd) {
    /*
        The string must contain at least:
        * 1 lowercase alphabetical character
        * 1 uppercase alphabetical character
        * 1 numeric character
        * must be 8 characters or longer
    */
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    var valid = regex.test(pwd);
    return valid;
}