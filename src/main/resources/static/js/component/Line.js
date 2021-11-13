(function (window) {
    var Line = function (arg) {
        DrawTool.call(this, arg)
        this.initTool(arg);
    }
    Line.prototype = new DrawTool();
    Line.prototype.constructor = Line
    Line.prototype.initTool = function (arg) {
        this.name = "line";
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

    Line.prototype.onmousedown = function (e, arg) {
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
    Line.prototype.onmousemove = function (e, arg) {
        var pos = arg.pos;

        var arr = this.eles.cur.attr('d').split(" ");
        var new_arr = [arr[0], arr[1], "L" + pos.x, pos.y];
        var new_attr = new_arr.join(" ")

        var updateOps = [{"attr": "d", "opera": "update", "value": new_attr}]
        SvgUtil.update(this.eles.cur,updateOps)
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id": this.eles.cur.attr("id"), "ops": updateOps});
    };
    Line.prototype.onmouseup = function (e, arg) {
        var pos = this.poss.last;

        var arr = this.eles.cur.attr('d').split(" ");
        var new_arr = [arr[0], arr[1], "L" + pos.x, pos.y];
        var new_attr = new_arr.join(" ")

        var updateOps = [{"attr": "d", "opera": "update", "value": new_attr}];
        SvgUtil.update(this.eles.cur, updateOps)
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id": this.eles.cur.attr("id"), "ops": updateOps});
    };


    window.Line = $.Line = Line;
})(window);
