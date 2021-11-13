(function (window) {
    var ViewBox = function (arg) {
        DrawTool.call(this, arg)
        this.initTool(arg);
    }
    ViewBox.prototype = new DrawTool()
    ViewBox.prototype.constructor = ViewBox;
    ViewBox.prototype.initTool = function (arg) {
        this.name = "view_box";
        this.type = "op::view_box";
        this.choosed = false;
        this.mouseS = false;
        this.inputS = true;
        this.scales = SettingUtil.get("draw_board|scales");
        this.lastX = 0;
        this.lastY = 0;
        // this.initHtml(arg)
        // this.originPos = null;
        // this.svgWidth = $("#svg").width();
        // this.svgHeight = $("#svg").height();
        // var view_box = SettingUtil.get("draw_board|view_box");
        // view_box.width = this.svgWidth;
        // view_box.height = this.svgHeight;
    }

    ViewBox.prototype.iconActive = function (active) {
        if(active) {
            $(SelectorUtil.get("svg_canvas")).attr("data-tool", "hand")
        }
    };
    ViewBox.prototype.onmousedown = function (e, arg) {
        this.poss.cur = arg.pos;
        this.view_box = SettingUtil.get("draw_board|view_box");

    };
    ViewBox.prototype.onmousemove = function (e, arg) {
        if(!window.EVENT_FLAGS["drag"]){return;}
        var pos = arg.pos;
        var x = (this.poss.cur.x - pos.x) * this.scales[this.view_box.scale];
        var y = (this.poss.cur.y - pos.y) * this.scales[this.view_box.scale];
        var svg = $("#svg");
        this.view_box.offsetX = this.view_box.x + x;
        this.view_box.offsetY = this.view_box.y + y;
        svg.attr("viewBox", "" + this.view_box.offsetX + " " + this.view_box.offsetY + " " + this.view_box.width + " " + this.view_box.height);
    };

    // 0.2, 0.4, 0.6, 0.8, 1, 2, 3, 4, 5
    ViewBox.prototype.onmouseup = function (e, arg){
        $(SelectorUtil.get("svg_canvas")).attr("data-tool", "hand")
        this.view_box.x = this.view_box.offsetX;
        this.view_box.y = this.view_box.offsetY;
        SettingUtil.set("draw_board|view_box",this.view_box);
    };
    ViewBox.prototype.oninputup = function (e, arg){};
    ViewBox.prototype.onscroll = function (e, arg){
        return;
        var pos = arg.pos;
        var viewBox = SettingUtil.get("draw_board|view_box");

        viewBox.scale += arg.delta;
        viewBox.scale = Math.min(Math.max(0, viewBox.scale), 8);

        SettingUtil.set("draw_board|scale", viewBox.scale);
        var svg = $("#svg");
        var svgWidth = svg.width();
        var svgHeight = svg.height();

        viewBox.x = (1-this.scales[viewBox.scale]) * pos.x;
        viewBox.y = (1-this.scales[viewBox.scale]) * pos.y;
        viewBox.width = svgWidth * this.scales[viewBox.scale];
        viewBox.height = svgHeight * this.scales[viewBox.scale];

        svg.attr("viewBox", "" + viewBox.x + " " + viewBox.y + " " + viewBox.width + " " + viewBox.height);
    };
    ViewBox.prototype.onmouseupS = function (e, arg){opPop(null, true);};

    window.ViewBox = $.ViewBox = ViewBox;
})(window);
