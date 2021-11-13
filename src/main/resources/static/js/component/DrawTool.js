(function (window) {
    var DrawTool = function (arg) {
        AbstractComponent.call(this,arg)
        this.arg = arg;
        this.name = "drawTool";
        this.type = "draw::path";
        this.properties = {};
        this.eles = {"last": null, "cur": null};
        this.poss = {"last":null,"cur":null};
        this.dom = null;
    }
    DrawTool.prototype = AbstractComponent.fn
    DrawTool.prototype.constructor = DrawTool

    // on{event}接受全局事件，本身的事件为on{event}Self
    DrawTool.prototype.onmousedown0 = function (e, arg) {
        // TODO 可以删掉
        SettingUtil.set("draw_board|last_tool", SettingUtil.get("draw_board|cur_tool"));
        this.choose0(true);
        this.eles.last = this.eles.cur;
        if(this.getName() !== "view_box") {
            var view_box = SettingUtil.get("draw_board|view_box");
            arg.pos = {x:(arg.pos.x + view_box.x), y: (arg.pos.y + view_box.y)};
        }
        this.onmousedown(e, arg);
        if(this.eles.cur) {
            OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_NEW_SVG_ELE, {"tool_name": this.getName(), "svgEle": this.eles.cur});
        }
        this.poss.last = arg.pos;
    };
    DrawTool.prototype.onmousemove0 = function (e, arg) {
        if(this.getName() !== "view_box") {
            var view_box = SettingUtil.get("draw_board|view_box")
            arg.pos = {x:(arg.pos.x + view_box.x), y: (arg.pos.y + view_box.y)};
        }
        this.onmousemove(e, arg);
        this.poss.last = arg.pos;
    };
    DrawTool.prototype.onmouseup0 = function (e, arg){
        if(this.name !== "view_box" && arg.pos) {
            var view_box = SettingUtil.get("draw_board|view_box")
            arg.pos = {x:(arg.pos.x + view_box.x), y: (arg.pos.y + view_box.y)};
        }
        this.onmouseup(e, arg);
    };
    DrawTool.prototype.oninputup0 = function (e, arg){
        this.oninputup(e, arg);
    };
    DrawTool.prototype.oninputdown0 = function (e, arg){
        this.oninputdown(e, arg);
    };
    DrawTool.prototype.onscroll0 = function (e, arg){
        this.onscroll(e, arg);
    };
    DrawTool.prototype.choose0 = function (c) {
        this.chooose = c;
        if(this.chooose) {
            SettingUtil.set("draw_board|cur_tool", this.getName())
        }
        this.choose();
        this.iconActive(this.chooose)
    };
    DrawTool.prototype.onmousedownSelf0 = function (e) {this.onmousedownSelf(e);};
    DrawTool.prototype.onmousemoveSelf0 = function (e) {this.onmousemoveSelf(e);};
    DrawTool.prototype.onmouseupSelf0 = function (e) {this.onmouseupSelf(e);};

    DrawTool.prototype.onmousedown = function (e, arg) {};
    DrawTool.prototype.onmousemove = function (e, arg) {};
    DrawTool.prototype.onmouseup = function (e, arg) {};
    DrawTool.prototype.oninputup = function (e, arg) {};
    DrawTool.prototype.oninputdown = function (e, arg) {
        if(this.inputChoose(e)){
            this.choose0(true);
        }
    };
    DrawTool.prototype.onscroll = function (e, arg) {};
    DrawTool.prototype.choose = function (c) {
        $(SelectorUtil.get("color_tool_modal")).removeClass("hidden");
        $(SelectorUtil.get("clear_tool_btn")).addClass("hidden");
    };
    DrawTool.prototype.onmousedownSelf = function (e) {this.choose0(true)};
    DrawTool.prototype.onmousemoveSelf = function (e) {};
    DrawTool.prototype.onmouseupSelf = function (e) {};

    DrawTool.prototype.inputChoose = function (e) {
        var keyNames = window.EVENT_KEYCODE_NAME_MAPPING[""+e.keyCode].split("|");
        var cmds = SettingUtil.get("tool_mapping|"+this.getName()+"|keyboard|value");
        if(window.EVENT_FLAGS["ctrl_left"] || window.EVENT_FLAGS["ctrl_right"]) {
            cmds = cmds.replace("|ctrl_left","").replace("|ctrl_right","")
        }
        var cmdArr = cmds.split("|");
        var doAction = false;
        if(cmdArr.length === 1) {
            if(keyNames.includes(cmdArr[0])) {
                doAction = true;
            }
        } else if(cmdArr.length > 1){
            var op = cmdArr[0];
            switch (op) {
                case "and":
                    doAction = true;
                    for(var i=1;i<cmdArr.length;i++){
                        if(!keyNames.includes(cmdArr[i])){
                            doAction = false;
                            break;
                        }
                    }
                    break;
                case "or":
                    doAction = false;
                    for(var i=1;i<cmdArr.length;i++){
                        if(keyNames.includes(cmdArr[i])){
                            doAction = true;
                            break;
                        }
                    }
                    break;
            }
        }
        return doAction;
    }

    DrawTool.prototype.html = function () {
        this.dom = $("<span class=\"toolbar-item-wrapper\">\n" +
            "                    <span class=\"tooltip-wrapper\" data-tool=\""+this.getName()+"\">\n" +
            "                        <span class=\"toolbar-item toolbar-"+this.getName()+"\">\n" +
            "                            <div class=\"toolbar-icon\"></div>\n" +
            "                        </span>\n" +
            "                    </span>\n" +
            "                </span>");
    };
    DrawTool.prototype.initHtml = function (arg) {
        this.html();
        var container = arg['container'];
        if(this.dom && container) {
            container.prepend(this.dom);
        }
    };
    DrawTool.prototype.iconActive = function (active) {
        if(this.dom) {
            if(active){
                this.dom.find(".tooltip-wrapper").find(".toolbar-item").addClass("toolbar-active");
                $(SelectorUtil.get("svg_canvas")).attr("data-tool", this.dom.find(".tooltip-wrapper").attr("data-tool"))
            }else{
                this.dom.find(".tooltip-wrapper").find(".toolbar-item").removeClass("toolbar-active");
            }
        }
    };

    DrawTool.prototype.getSvgEle = function (arg) {
        return this.eles.cur;
    };
    DrawTool.prototype.getOp = function () {
        return this.type.split("::")[0];
    };
    DrawTool.prototype.getType = function () {
        return this.type.split("::")[1];
    };
    window.DrawTool = $.DrawTool = DrawTool;
})(window);
