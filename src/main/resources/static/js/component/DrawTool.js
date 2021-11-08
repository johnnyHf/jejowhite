(function (window) {
    var DrawTool = function (arg) {
        AbstractComponent.call(this,arg)
        this.arg = arg;
        this.name = "drawTool";
        this.svgType = "path";
        this.properties = {

        };
        this.strokeWidth = 5.3;
        this.svgEle = null;
        this.lastSvgEle = null;
        this.lastPos = null;
        this.dom = null;
    }
    DrawTool.prototype = AbstractComponent.fn
    DrawTool.prototype.constructor = DrawTool

    DrawTool.prototype.onmousedown0 = function (e, arg) {
        SettingUtil.set("draw_board|last_tool", SettingUtil.get("draw_board|cur_tool"))
        this.lastSvgEle = this.svgEle;
        this.onmousedown(e, arg);
        this.lastPos = arg.pos;
    };
    DrawTool.prototype.onmousemove0 = function (e, arg) {
        this.onmousemove(e, arg);
        this.lastPos = arg.pos;
    };
    DrawTool.prototype.onmouseup0 = function (e, arg){
        this.onmouseup(e, arg);
    };
    DrawTool.prototype.oninputup0 = function (e, arg){
        this.oninputup(e, arg);
    };
    DrawTool.prototype.oninputdown0 = function (e, arg){
        this.oninputdown(e, arg);
    };

    // on{event}接受全局事件，本身的事件为on{event}S
    DrawTool.prototype.onmousedown = function (e, arg) {};
    DrawTool.prototype.onmousemove = function (e, arg) {};
    DrawTool.prototype.onmouseup = function (e, arg) {};
    DrawTool.prototype.oninputup = function (e, arg) {};
    DrawTool.prototype.oninputdown = function (e, arg) {
        if(this.inputChoose(e)){
            this.choose(true);
        }
    };
    DrawTool.prototype.onmouseupS = function (e) {console.log(12);this.choose(true)};
    DrawTool.prototype.prepend = function (container) {
        if(this.dom && container) {
            container.prepend(this.dom);
        }
    };
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
        this.prepend(arg['container']);
    };
    DrawTool.prototype.getSvgEle = function (arg) {
        return this.svgEle;
    };
    DrawTool.prototype.choose = function (c) {
        this.choosed = c;
        if(this.choosed) {
            SettingUtil.set("draw_board|cur_tool", this.getName())
        }
        this.choose2();
        if(!this.dom){
            return
        }
        if(this.choosed){
            this.dom.find(".tooltip-wrapper").find(".toolbar-item").addClass("toolbar-active");
            
            $(SelectorUtil.get("svg_canvas")).attr("data-tool", this.dom.find(".tooltip-wrapper").attr("data-tool"))
        }else{
            this.dom.find(".tooltip-wrapper").find(".toolbar-item").removeClass("toolbar-active");
        }
    };
    DrawTool.prototype.choose2 = function (c) {
        $(SelectorUtil.get("color_tool_modal")).removeClass("hidden");
        $(SelectorUtil.get("clear_tool_btn")).addClass("hidden");
    };
    DrawTool.prototype.isChoosed = function (c) {
        return this.choosed;
    };
    DrawTool.prototype.inputChoose = function (e) {
        var keyNames = window.EVENT_KEYCODE_NAME_MAPPING[""+e.keyCode].split("|");
        var cmds = SettingUtil.get("tool_mapping|"+this.getName()+"|keyboard|value");
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
    window.DrawTool = $.DrawTool = DrawTool;
})(window);
