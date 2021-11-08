(function (window) {
    var Pencil = function (arg) {
        DrawTool.call(this, arg)
        this.name = "pencil";
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
    Pencil.prototype = new DrawTool()
    Pencil.prototype.constructor = Pencil

    Pencil.prototype.onmousedown = function (e, arg) {

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
    Pencil.prototype.onmousemove = function (e, arg) {
        var pos = arg.pos;
        SvgUtil.update(this.svgEle, [{
            "attr": "d", "opera": "add", "value": " L" + pos.x + " " + pos.y
        }])
    };
    Pencil.prototype.onmouseup = function (e, arg) {
        var pos = this.lastPos;
        SvgUtil.update(this.svgEle, [{
            "attr": "d", "opera": "add", "value": " L" + pos.x + " " + pos.y
        }])
    };

    window.Pencil = $.Pencil = Pencil;
})(window);
