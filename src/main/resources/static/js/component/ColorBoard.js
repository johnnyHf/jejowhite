(function (window) {
    /**
     * 提供颜色，粗细，线条样式等功能
     * @param arg
     * @constructor
     */
    var ColorBoard = function (arg) {
        this.name = "color_board";
        this.initTool(arg)
    }

    ColorBoard.prototype = DrawTool.prototype;
    ColorBoard.prototype.constructor = ColorBoard;
    ColorBoard.prototype.initTool = function (arg) {
        this.initHtml(arg)
    }

    ColorBoard.prototype.onmousedown = function (e, arg) {};
    ColorBoard.prototype.onmousemove = function (e, arg) {};
    ColorBoard.prototype.onmouseup = function (e, arg){};

    ColorBoard.prototype.html = function (e, arg){

    };
    ColorBoard.prototype.initHtml = function (e, arg){

    };


    window.ColorBoard = $.ColorBoard = ColorBoard;
})(window);
