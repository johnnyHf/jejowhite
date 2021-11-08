(function (window) {
    var ShapeCircle = function (arg) {
        DrawTool.call(this, arg)
        this.name = "shape_circle";
        this.svgType = "circle"
        this.shape = "circle"
        this.properties = {
            "class": "draw-path",
            "fill": "",
            "stroke-linejoin": "",
            "stroke-width": "",
            "stroke": "",
            "cx": "",
            "cy": ""
        };
    }

    ShapeCircle.prototype = new DrawTool()
    ShapeCircle.prototype.constructor = ShapeCircle

    ShapeCircle.prototype.onmousedown = function (e, arg) {
        var themeColor = SettingUtil.get("settings|theme|color");
        var similar = SettingUtil.get("settings|color_similar_threshold");
        var stroke = SettingUtil.get("draw_board|line_color");
        var strokeLineJoin = SettingUtil.get("draw_board|line_join");
        var pos = arg.pos;

        this.properties["fill"] = themeColor;
        this.properties["stroke-linejoin"] = strokeLineJoin;
        this.properties["stroke-width"] = this.strokeWidth;
        this.properties["stroke"] = getReverseColorAgainstTheme(stroke, themeColor, similar);
        this.properties["cx"] = pos.x;
        this.properties["cy"] = pos.y;

        this.svgEle = SvgUtil.create(this, this.svgType, this.properties);
    };
    ShapeCircle.prototype.onmousemove = function (e, arg) {
        var pos = arg.pos;
        var r = this.distance({x : this.svgEle.attr('cx'), y : this.svgEle.attr('cy')}, pos);
        SvgUtil.update(this.svgEle, [{
            "attr": "r", "opera": "update", "value": r
        }])
    };
    ShapeCircle.prototype.onmouseup = function (e, arg) {
        var pos = this.lastPos;
        var r = this.distance({x : this.svgEle.attr('cx'), y : this.svgEle.attr('cy')}, pos);
        // SvgUtil.update(this.svgEle, [{
        //     "attr": "r", "opera": "update", "value": r
        // }])
        // var r = this.distance({x : this.svgEle.attr('cx'), y : this.svgEle.attr('cy')}, pos);
        this.svgEle.attr('r', r);
    };
    ShapeCircle.prototype.distance = function (p1, p2) {
        var x1 = parseFloat(p1.x), x2 = parseFloat(p2.x);
        var y1 = parseFloat(p1.y), y2 = parseFloat(p2.y);
        var a = x1 - x2;
        var b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    };

    window.ShapeCircle = $.ShapeCircle = ShapeCircle;
})(window);
