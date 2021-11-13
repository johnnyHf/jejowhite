(function (window) {
    var ShapeRect = function (arg) {
        DrawTool.call(this, arg)
        this.initTool(arg);
    }
    ShapeRect.prototype = new DrawTool()
    ShapeRect.prototype.constructor = ShapeRect
    ShapeRect.prototype.initTool = function (arg) {
        this.name = "shape_rect";
        this.type = "draw::path"
        this.shape = "rect"
        this.properties = {
            "class": "draw-path",
            "fill": "",
            "stroke-linejoin": "",
            "stroke-width": SettingUtil.get("draw_board|stroke_width"),
            "stroke": "",
            "d": "",
        }
    }

    ShapeRect.prototype.onmousedown = function (e, arg) {
        var themeColor = SettingUtil.get("settings|theme|color");
        var similar = SettingUtil.get("settings|color_similar_threshold");
        var stroke = SettingUtil.get("draw_board|line_color");
        var pos = arg.pos;

        this.properties["fill"] = themeColor;
        this.properties["stroke-linejoin"] = SettingUtil.get("draw_board|line_join");
        this.properties["stroke-width"] = SettingUtil.get("draw_board|stroke_width");
        this.properties["stroke"] = getReverseColorAgainstTheme(stroke, themeColor, similar);
        this.properties["d"] = "M" + pos.x + " " + pos.y

        this.eles.cur = SvgUtil.create(this.getType(), this.properties);
    };
    ShapeRect.prototype.onmousemove = function (e, arg) {
        var pos = arg.pos;
        var arr = this.eles.cur.attr('d').split(" ");
        var left_top = {x: parseFloat(arr[0].substring(1)), y: parseFloat(arr[1])};
        var new_arr = ["M" + left_top.x, left_top.y, "L" + pos.x, left_top.y, "L" + pos.x, pos.y, "L" + left_top.x, pos.y, "L" + left_top.x, left_top.y];
        var updateOps = [{"attr": "d", "opera": "update", "value": new_arr.join(" ")}]
        SvgUtil.update(this.eles.cur, updateOps)
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id": this.eles.cur.attr("id"), "ops": updateOps});
    };
    ShapeRect.prototype.onmouseup = function (e, arg) {
        var pos = this.poss.last;
        var arr = this.eles.cur.attr('d').split(" ");
        var left_top = {x: parseFloat(arr[0].substring(1)), y: parseFloat(arr[1])};
        var new_arr = ["M" + left_top.x, left_top.y, "L" + pos.x, left_top.y, "L" + pos.x, pos.y, "L" + left_top.x, pos.y, "L" + left_top.x, left_top.y]
        var updateOps = [{"attr": "d", "opera": "update", "value": new_arr.join(" ")}]
        SvgUtil.update(this.eles.cur, updateOps)
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id": this.eles.cur.attr("id"), "ops": updateOps});
    };
    ShapeRect.prototype.iconActive = function (active) {
        if(active){
            $(SelectorUtil.get("svg_canvas")).attr("data-tool", this.getName());
        }
    };
    window.ShapeRect = $.ShapeRect = ShapeRect;
})(window);
