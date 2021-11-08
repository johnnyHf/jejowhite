(function (window) {
    var Eraser = function (arg) {
        DrawTool.call(this, arg)
        this.name = "eraser";
        this.strokeWidth = 57;
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
    Eraser.prototype = new DrawTool();
    Eraser.prototype.constructor = Eraser;

    Eraser.prototype.onmousedown = function (e, arg) {
        var themeColor = SettingUtil.get("settings|theme|color");
        var strokeLineJoin = SettingUtil.get("draw_board|line_join");
        var pos = arg.pos;

        this.properties["fill"] = themeColor;
        this.properties["stroke-linejoin"] = strokeLineJoin;
        this.properties["stroke-width"] = this.strokeWidth;
        this.properties["stroke"] = themeColor;
        this.properties["d"] = "M" + pos.x + " " + pos.y;

        this.svgEle = SvgUtil.create(this, this.svgType, this.properties);
    };
    Eraser.prototype.onmousemove = function (e, arg) {
        var pos = arg.pos;
        SvgUtil.update(this.svgEle, [{
            "attr": "d", "opera": "add", "value": " L" + pos.x + " " + pos.y
        }])
    };
    Eraser.prototype.onmouseup = function (e, arg){
        var pos = this.lastPos;
        SvgUtil.update(this.svgEle, [{
            "attr": "d", "opera": "add", "value": " L" + pos.x + " " + pos.y
        }])
    };
    
    Eraser.prototype.choose2 = function (){
        $(SelectorUtil.get("color_tool_modal")).addClass("hidden");
        $(SelectorUtil.get("clear_tool_btn")).removeClass("hidden");
    };

    window.Eraser = $.Eraser = Eraser;
})(window);
