(function (window) {
    var Line = function (arg) {
        DrawTool.call(this, arg)
        this.name = "line";
        this.properties = {
            "class": "draw-path",
            "fill": "",
            "stroke-linejoin": "",
            "stroke-width": this.strokeWidth,
            "stroke": "",
            "d": ""
        };
        this.initHtml(arg)
    }
    Line.prototype = new DrawTool();
    Line.prototype.constructor = Line

    Line.prototype.onmousedown = function (e, arg) {
        var themeColor = SettingUtil.get("settings|theme|color");
        var similar = SettingUtil.get("settings|color_similar_threshold");
        var stroke = SettingUtil.get("draw_board|line_color");
        var strokeLineJoin = SettingUtil.get("draw_board|line_join");
        var pos = arg.pos;

        this.properties["fill"] = themeColor;
        this.properties["stroke-linejoin"] = strokeLineJoin;
        this.properties["stroke-width"] = this.strokeWidth;
        this.properties["stroke"] = getReverseColorAgainstTheme(stroke, themeColor, similar);
        this.properties["d"] = "M" + pos.x + " " + pos.y;

        this.svgEle = SvgUtil.create(this, this.svgType, this.properties);
    };

    Line.prototype.onmousemove = function (e, arg) {
        var pos = arg.pos;

        var arr = this.svgEle.attr('d').split(" ");
        var new_arr = [arr[0], arr[1], "L" + pos.x, pos.y];
        var new_attr = new_arr.join(" ")

        SvgUtil.update(this.svgEle, [{
            "attr": "d", "opera": "update", "value": new_attr
        }])
    };
    Line.prototype.onmouseup = function (e, arg) {
        var pos = this.lastPos;

        var arr = this.svgEle.attr('d').split(" ");
        var new_arr = [arr[0], arr[1], "L" + pos.x, pos.y];
        var new_attr = new_arr.join(" ")

        SvgUtil.update(this.svgEle, [{
            "attr": "d", "opera": "update", "value": new_attr
        }])
    };


    window.Line = $.Line = Line;
})(window);
