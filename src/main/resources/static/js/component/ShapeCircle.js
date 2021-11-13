(function (window) {
    var ShapeCircle = function (arg) {
        DrawTool.call(this, arg)
        this.initTool(arg);
    }

    ShapeCircle.prototype = new DrawTool()
    ShapeCircle.prototype.constructor = ShapeCircle
    ShapeCircle.prototype.initTool = function (arg) {
        this.name = "shape_circle";
        this.type = "draw::circle";
        this.shape = "circle"
        this.properties = {
            "class": "draw-path",
            "fill": "",
            "stroke-linejoin": "",
            "stroke-width": SettingUtil.get("draw_board|stroke_width"),
            "stroke": "",
            "cx": "",
            "cy": ""
        };
    }
    ShapeCircle.prototype.onmousedown = function (e, arg) {
        var themeColor = SettingUtil.get("settings|theme|color");
        var similar = SettingUtil.get("settings|color_similar_threshold");
        var stroke = SettingUtil.get("draw_board|line_color");
        var pos = arg.pos;

        this.properties["fill"] = themeColor;
        this.properties["stroke-linejoin"] = SettingUtil.get("draw_board|line_join");
        this.properties["stroke-width"] = SettingUtil.get("draw_board|stroke_width");
        this.properties["stroke"] = getReverseColorAgainstTheme(stroke, themeColor, similar);
        this.properties["cx"] = pos.x;
        this.properties["cy"] = pos.y;

        this.eles.cur = SvgUtil.create(this.getType(), this.properties);
    };
    ShapeCircle.prototype.onmousemove = function (e, arg) {
        var pos = arg.pos;
        var r = this.distance({x : this.eles.cur.attr('cx'), y : this.eles.cur.attr('cy')}, pos);
        var updateOps =[{"attr": "r", "opera": "update", "value": r}]
        SvgUtil.update(this.eles.cur, updateOps)
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id": this.eles.cur.attr("id"), "ops": updateOps});
    };
    ShapeCircle.prototype.onmouseup = function (e, arg) {
        var pos = this.poss.last;
        var r = this.distance({x : this.eles.cur.attr('cx'), y : this.eles.cur.attr('cy')}, pos);
        this.eles.cur.attr('r', r);
    };
    ShapeCircle.prototype.distance = function (p1, p2) {
        var x1 = parseFloat(p1.x), x2 = parseFloat(p2.x);
        var y1 = parseFloat(p1.y), y2 = parseFloat(p2.y);
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    };
    ShapeCircle.prototype.iconActive = function (active) {
        if(active){
            $(SelectorUtil.get("svg_canvas")).attr("data-tool", this.getName());
        }
    };
    window.ShapeCircle = $.ShapeCircle = ShapeCircle;
})(window);
