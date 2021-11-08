(function (window) {
    var ColorBoard = function (arg) {
        this.name = "ColorBoard";
        this.strokeWidth = 57;
        this.properties = {
            "class": "draw-path",
            "fill": "",
            "stroke-linejoin": "",
            "stroke-width": this.strokeWidth,
            "stroke": "",
            "d": ""
        };
        this.init(arg)
    }
    ColorBoard.prototype = DrawTool.prototype;
    ColorBoard.prototype.constructor = ColorBoard;

    ColorBoard.prototype.onmousedown = function (e, arg) {};
    ColorBoard.prototype.onmousemove = function (e, arg) {};
    ColorBoard.prototype.onmouseup = function (e, arg){};

    window.ColorBoard = $.ColorBoard = ColorBoard;
})(window);
