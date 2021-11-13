(function (window) {
    var Eraser = function (arg) {
        DrawTool.call(this, arg)
        this.initTool(arg);
    }
    Eraser.prototype = new DrawTool();
    Eraser.prototype.constructor = Eraser;
    Eraser.prototype.initTool = function (arg) {
        this.name = "eraser";
        this.type = "draw::path";
        this.properties = {
            "class": "draw-path",
            "fill": "",
            "stroke-linejoin": "",
            "stroke-width": SettingUtil.get("draw_board|eraser_size"),
            "stroke": "",
            "d": ""
        };
        this.initHtml(arg)
    }

    Eraser.prototype.onmousedown = function (e, arg) {
        var themeColor = SettingUtil.get("settings|theme|color");
        var pos = arg.pos;

        this.properties["fill"] = themeColor;
        this.properties["stroke-linejoin"] = SettingUtil.get("draw_board|line_join");
        this.properties["stroke-width"] = SettingUtil.get("draw_board|eraser_size");
        this.properties["stroke"] = themeColor;
        this.properties["d"] = "M" + pos.x + " " + pos.y;
        this.eles.cur = SvgUtil.create(this.getType(), this.properties);
    };
    Eraser.prototype.onmousemove = function (e, arg) {
        var pos = arg.pos;
        var updateOps = [{"attr": "d", "opera": "add", "value": " L" + pos.x + " " + pos.y}]
        SvgUtil.update(this.eles.cur, updateOps)
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {
            "id": this.eles.cur.attr("id"),
            "ops": updateOps
        });
    };
    Eraser.prototype.onmouseup = function (e, arg){
        var pos = this.poss.last;
        var updateOps = [{"attr": "d", "opera": "add", "value": " L" + pos.x + " " + pos.y}];
        SvgUtil.update(this.eles.cur, updateOps)
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id": this.eles.cur.attr("id"), "ops": updateOps});
    };

    Eraser.prototype.choose = function (){
        $(SelectorUtil.get("color_tool_modal")).addClass("hidden");
        $(SelectorUtil.get("clear_tool_btn")).removeClass("hidden");
    };

    window.Eraser = $.Eraser = Eraser;
})(window);
