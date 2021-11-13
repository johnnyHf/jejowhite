function initEventBtns() {
    //全屏
    $(SelectorUtil.get("fullscreen_btn")).bind("click", function (e){
        $(this).toggleClass("toggle-fullscreen-exit");
        if(!ScreenUtil.isFullscreen()){
            ScreenUtil.openBig(".drawing-board");
        }else{
            ScreenUtil.closeBig()
        }
    })
}

function initSettings() {
    // 设置
    $(SelectorUtil.get("setting_menu")).bind("click", function (e){
        $(this).toggleClass("toolbar-menu-button-active");
        $(SelectorUtil.get("setting_menu_popover")).toggleClass("toolbar-menu-popover-active");
    })
    // 主题颜色
    $(SelectorUtil.get("theme_btn")).bind("click", function (e){
        var themeColor = $(this).hasClass("toolbar-menu-popover-dark-mode-active") ? "#ffffff" : "#222222";
        SettingUtil.changeTheme(themeColor);
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_THEME_COLOR, {"color":themeColor});
    });
    // TODO 形状检测
    $(SelectorUtil.get("shape_detection_btn")).bind("click", function (e){
        $(this).toggleClass("toolbar-menu-popover-shape-detect-active");
        SettingUtil.shapeDetection($(this).hasClass("toolbar-menu-popover-shape-detect-active"));
    });
    // 保存图片下载
    $(SelectorUtil.get("img_download_btn")).bind("click", function (e){
        SettingUtil.downloadImage("svg")
    });
    // TODO 语言选择
    $(SelectorUtil.get("language_menu_btn")).bind("click", function (e){
        $(SelectorUtil.get("language_menu")).toggleClass("hidden");
    });
    // TODO newboard
    $(SelectorUtil.get("new_board")).bind("click", function (e){

    });
    $(SelectorUtil.get("language_items")).bind("click", function (e){
        var icon = $(this).find(SelectorUtil.get("language_icon")).attr("src");
        var name = $(this).find(SelectorUtil.get("language_name")).text();
        $(SelectorUtil.get("cur_language_icon")).find("img").attr("src", icon);
        SettingUtil.changeLanguage(name);
    })

    // TODO 历史记录
    $(SelectorUtil.get("history_btn")).bind("click", function (e){
        SettingUtil.history();
    });
}

function initTitle(){
    // title
    var titleInput = $(SelectorUtil.get("title_input"))
    titleInput.bind('input propertychange',function(){
        var input = $(this).val().replace(/(^\s*)|(\s*$)/g, "");
        $(this).val("");
        if(input && input.trim().length > 0 && input !== ""){
            $(this).val(input.trim());
            $(SelectorUtil.get("title_tip")).addClass("visible");
        }else{
            $(SelectorUtil.get("title_tip")).removeClass("visible");
        }
    });
    titleInput.keypress(function (even) {
        if (even.which === 13) {
            $(SelectorUtil.get("title_tip")).removeClass("visible");
            var input = $(this).val().replace(/(^\s*)|(\s*$)/g, "");
            if(input && input.trim().length > 0 && input !== ""){
                SettingUtil.updateBoardTitle(input.trim());
            }
        }
    });
}

function initHelp(){
    $(SelectorUtil.get("help_btn")).bind("click", function (e){
        $(SelectorUtil.get("help_page")).toggleClass("help-sidebar-active");
    });
    $(SelectorUtil.get("help_close_btn")).bind("click", function (e){
        $(SelectorUtil.get("help_page")).removeClass("help-sidebar-active");
    });
}
function initFeedBack(){

    $(SelectorUtil.get("feedback_btn")).bind("click", function (e){
        $(SelectorUtil.get("feedback_form")).toggleClass("feedback-popover-active");
    });
    var feedback = $(SelectorUtil.get("feedback_input"))
    feedback.keypress(function (even) {
        if (even.which === 13) {
            var input = $(this).val().replace(/(^\s*)|(\s*$)/g, "");
            if(input && input.trim().length > 0 && input !== ""){
                var res = SettingUtil.addFeedback(input.trim());
                if(res){
                    $(".feedback-popover").addClass("feedback-popover-confirm-active");
                    setTimeout(function (){
                        $(".feedback-wrapper").toggleClass("feedback-popover-active");
                        setTimeout(function (){
                            $(".feedback-popover").removeClass("feedback-popover-confirm-active");
                            feedback.val('');
                        },300);

                    }, 800)
                }
            }
        }
    });
}

function initUserEvent(shareUser){
    shareUser.hover(function (e){
        $(".toolbar-share-user .tooltip-wrapper").each(function (index, element){
            $(this).find(".tooltip-inner-wrapper").remove();
        });

        var name = OnlineAction.get("share_users|users|" + $(this).attr("data-userid") + "|name");
        var you = OnlineAction.get("share_users|users|" + $(this).attr("data-userid") + "|you");
        $("<span class=\"tooltip-inner-wrapper tooltip-below\"><span class=\"tooltip\">\n" +
            "<span>"+ getUserName($(this).attr("data-userid"), "未知者") + " " + $(this).attr("data-userid") + (you ? " (you)": "") +"</span></span></span>").appendTo($(this));
    }, function (e){
        $(this).find(".tooltip-inner-wrapper").remove();
    })
}

function getUserName(userid, defaultName){
    var userName = OnlineAction.get("share_users|users|" + userid + "|name");
    if(userName && userName.trim().length > 0){
        return userName;
    }else{
        return defaultName;
    }
}

function initUserList() {
    function userNameEvent(userid){
        var nameInput = $(".toolbar-share-user-popover-you-name");
        nameInput.keypress(function (even) {
            if (even.which === 13) {
                var input = $(this).val().replace(/(^\s*)|(\s*$)/g, "");
                $(this).val("");
                if(input && input.trim().length > 0 && input !== ""){
                    $(this).val(input.trim());
                    var res = OnlineAction.updateUserName(input.trim());
                    if(res){
                        $(".toolbar-share-user-wrapper[data-userid="+userid+"]").find(".toolbar-share-user-item").html(input.trim().substring(0, 1));
                    }
                }
            }
        });
    }
    var tsus = $(".toolbar-share-user");
    tsus.bind("click", function (e){
        $(".toolbar-share-user-popover").toggleClass("toolbar-share-user-popover-active")
    });

    var rsups = $(".toolbar-share-user-popover")
    var users = OnlineAction.getUsers();

    if(OnlineAction.getUserCount() === 1){
        $("<div class=\"toolbar-share-user-empty-state\">这里只有你一个人!</div>").appendTo(rsups);
    }

    var shareUserYou = {
        "userid": null,
        "ele": null
    };
    for(var userid in users){
        var shareUserH = $("<span class=\"tooltip-wrapper toolbar-share-user-wrapper\" data-userid=\""+userid+"\">\n" +
            "                        <div class=\"toolbar-share-user-item \" style=\"background-color: "+users[userid]["color"]+";\">\n" +
            "                            <span class=\"toolbar-share-user-anonymous "+userid+"\"></span>\n" +
            "                        </div>\n" +
            "                    </span>");
        shareUserH.appendTo(tsus);
        initUserEvent(shareUserH);
        var shareUserC = null;
        if(!users[userid]["you"]) {
            shareUserC = $("<div class=\"toolbar-share-user-popover-item clearfix\">\n" +
                "                        <div class=\"toolbar-share-user-item \" style=\"background-color: "+users[userid]["color"]+";\">\n" +
                "                            <span class=\"toolbar-share-user-anonymous "+userid+"\"></span>\n" +
                "                        </div>\n" +
                "                        <div class=\"toolbar-share-user-popover-name\">"+getUserName(userid, "未知者") + " " + userid +"</div>\n" +
                "                    </div>");
            shareUserC.appendTo(rsups);
        }else {
            shareUserYou["userid"] = userid;
            shareUserYou["ele"] = $("<div class=\"toolbar-share-user-popover-item toolbar-share-user-popover-you clearfix\">\n" +
                "                        <div class=\"toolbar-share-user-item \" style=\"background-color: "+users[userid]["color"]+";\">\n" +
                "                            <span class=\"toolbar-share-user-anonymous "+userid+"\"></span>\n" +
                "                        </div>\n" +
                "                        <input class=\"toolbar-share-user-popover-you-name\" placeholder=\"What's your name?\" value=\""+getUserName(userid, "")+"\">\n" +
                "                    </div>")
        }
    }
    shareUserYou["ele"].appendTo(rsups);
    userNameEvent(shareUserYou["userid"]);
}
function initMenu() {
    initEventBtns();
    initSettings();
    initTitle();
    initHelp();
    initFeedBack();
    initUserList();
}