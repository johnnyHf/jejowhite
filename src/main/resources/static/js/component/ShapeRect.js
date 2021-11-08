(function (window) {
    var ShapeRect = function (arg) {
        DrawTool.call(this, arg)
        this.name = "shape_rect";
        this.svgType = "path"
        this.shape = "rect"
        this.properties = {
            "class": "draw-path",
            "fill": "",
            "stroke-linejoin": "",
            "stroke-width": "",
            "stroke": "",
            "d": "",
        }
    }
    ShapeRect.prototype = new DrawTool()
    ShapeRect.prototype.constructor = ShapeRect
    // // ShapeRect.prototype.constructor = DrawTool;

    ShapeRect.prototype.onmousedown = function (e, arg) {
        var themeColor = SettingUtil.get("settings|theme|color");
        var similar = SettingUtil.get("settings|color_similar_threshold");
        var stroke = SettingUtil.get("draw_board|line_color");
        var strokeLineJoin = SettingUtil.get("draw_board|line_join");
        var pos = arg.pos;

        this.properties["fill"] = themeColor;
        this.properties["stroke-linejoin"] = strokeLineJoin;
        this.properties["stroke-width"] = this.strokeWidth;
        this.properties["stroke"] = getReverseColorAgainstTheme(stroke, themeColor, similar);
        this.properties["d"] = "M" + pos.x + " " + pos.y

        this.svgEle = SvgUtil.create(this, this.svgType, this.properties);
    };
    ShapeRect.prototype.onmousemove = function (e, arg) {
        var pos = arg.pos;
        var arr = this.svgEle.attr('d').split(" ");
        var left_top = {x: parseFloat(arr[0].substring(1)), y: parseFloat(arr[1])};
        var new_arr = ["M" + left_top.x, left_top.y, "L" + pos.x, left_top.y, "L" + pos.x, pos.y, "L" + left_top.x, pos.y, "L" + left_top.x, left_top.y];
        SvgUtil.update(this.svgEle, [{
            "attr": "d", "opera": "update", "value": new_arr.join(" ")
        }])
    };
    ShapeRect.prototype.onmouseup = function (e, arg) {
        var pos = this.lastPos;
        var arr = this.svgEle.attr('d').split(" ");
        var left_top = {x: parseFloat(arr[0].substring(1)), y: parseFloat(arr[1])};
        var new_arr = ["M" + left_top.x, left_top.y, "L" + pos.x, left_top.y, "L" + pos.x, pos.y, "L" + left_top.x, pos.y, "L" + left_top.x, left_top.y]
        SvgUtil.update(this.svgEle, [{
            "attr": "d", "opera": "update", "value": new_arr.join(" ")
        }])
    };

    window.ShapeRect = $.ShapeRect = ShapeRect;
})(window);
