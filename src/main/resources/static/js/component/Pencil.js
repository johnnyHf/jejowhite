(function (window) {
    var Pencil = function (arg) {
        DrawTool.call(this, arg)
        this.initTool(arg)
    }
    Pencil.prototype = new DrawTool()
    Pencil.prototype.constructor = Pencil
    Pencil.prototype.initTool = function (arg) {
        this.name = "pencil";
        this.type = "draw::path";
        this.properties = {
            "class": "draw-path",
            "fill": "",
            "stroke-linejoin": "",
            "stroke-width": SettingUtil.get("draw_board|stroke_width"),
            "stroke": "",
            "d": ""
        };
        this.initHtml(arg)
    }

    Pencil.prototype.onmousedown = function (e, arg) {
        var themeColor = SettingUtil.get("settings|theme|color");
        var similar = SettingUtil.get("settings|color_similar_threshold");
        var stroke = SettingUtil.get("draw_board|line_color");
        var pos = arg.pos;

        this.properties["fill"] = themeColor;
        this.properties["stroke-linejoin"] = SettingUtil.get("draw_board|line_join");
        this.properties["stroke-width"] = SettingUtil.get("draw_board|stroke_width");
        this.properties["stroke"] = getReverseColorAgainstTheme(stroke, themeColor, similar);
        this.properties["d"] = "M" + pos.x + " " + pos.y;

        this.eles.cur = SvgUtil.create(this.getType(), this.properties);
    };
    Pencil.prototype.onmousemove = function (e, arg) {
        var pos = arg.pos;
        var updateOps = [{"attr": "d", "opera": "add", "value": " L" + pos.x + " " + pos.y}]
        SvgUtil.update(this.eles.cur, updateOps)
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id": this.eles.cur.attr("id"), "ops": updateOps});
    };
    Pencil.prototype.onmouseup = function (e, arg) {
        var pos = this.poss.last;
        if(pos) {
            var updateOps = [{"attr": "d", "opera": "add", "value": " L" + pos.x + " " + pos.y}]
            SvgUtil.update(this.eles.cur, updateOps)
            OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id": this.eles.cur.attr("id"), "ops": updateOps});
        }
};

    window.Pencil = $.Pencil = Pencil;
})(window);
