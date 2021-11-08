(function (window) {
    var Undo = function (arg) {
        DrawTool.call(this, arg)
        this.name = "undo";
        this.choosed = false;
        this.mouseS = false;
        this.inputS = true;
        this.initHtml(arg)
    }
    Undo.prototype = new DrawTool()
    Undo.prototype.constructor = Undo;

    Undo.prototype.onmousedown = function (e, arg) {};
    Undo.prototype.onmousemove = function (e, arg) {};
    Undo.prototype.onmouseup0 = function (e, arg){
        SettingUtil.set("draw_board|cur_tool", SettingUtil.get("draw_board|last_tool"));
        this.onmouseup(e, arg);
    };
    Undo.prototype.onmouseup = function (e, arg){};
    Undo.prototype.oninputup = function (e, arg){
        if(this.inputChoose(e)){
            opPop();
        }
    };

    Undo.prototype.onmouseupS = function (e, arg){opPop();};


    window.Undo = $.Undo = Undo;
})(window);
