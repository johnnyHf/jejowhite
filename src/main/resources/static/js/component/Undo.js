(function (window) {
    var Undo = function (arg) {
        DrawTool.call(this, arg)
        this.initTool(arg)
    }
    Undo.prototype = new DrawTool()
    Undo.prototype.constructor = Undo;
    Undo.prototype.initTool = function (arg) {
        this.name = "undo";
        this.type = "op::path"
        this.choosed = false;
        this.mouseS = false;
        this.inputS = true;
        this.initHtml(arg)
    }
    Undo.prototype.onmousedown = function (e, arg) {};
    Undo.prototype.onmousemove = function (e, arg) {};
    Undo.prototype.onmouseup0 = function (e, arg){
        SettingUtil.set("draw_board|cur_tool", SettingUtil.get("draw_board|last_tool"));
        this.onmouseup(e, arg);
    };
    Undo.prototype.onmouseup = function (e, arg){};
    Undo.prototype.oninputdown = function (e, arg) {
        if(this.inputChoose(e)){
            this.choose0(true);
            opPop(null, true);
        }
    };
    Undo.prototype.oninputup = function (e, arg){
        if(!this.inputChoose(e)){
            this.choose0(false)
            if(SettingUtil.get("draw_board|cur_tool") === this.getName()) {
                getDrawTool(SettingUtil.get("draw_board|last_tool")).choose0(true);
            }
        }
    };

    Undo.prototype.onmouseupS = function (e, arg){opPop(null, true);};

    window.Undo = $.Undo = Undo;
})(window);
