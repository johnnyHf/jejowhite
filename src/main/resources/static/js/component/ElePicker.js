(function (window) {
    var ElePicker = function (arg) {
        DrawTool.call(this, arg)
        this.initTool(arg);
    }
    ElePicker.prototype = new DrawTool();
    ElePicker.prototype.constructor = ElePicker;
    ElePicker.prototype.initTool = function (arg) {
        this.name = "ele_picker";
        this.type = "op::pick";
        this.borderAnchor = {
            "color" : "rgb(199,84,80)",
            "padding" : 10,
            "r" : 5,
        };
        this.pickTargets = {};
        this.poss.origin = null;
    }

    ElePicker.prototype.createDeleteBtn = function (arg) {
        var deleteBtn = $("<svg t=\"1636736482856\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"11431\" width=\"30\" height=\"30\"><path fill='#c8c8c8' d=\"M749.714286 859.428571V365.714286a18.285714 18.285714 0 1 1 36.571428 0v512a18.285714 18.285714 0 0 1-18.285714 18.285714H256a18.285714 18.285714 0 0 1-18.285714-18.285714V365.714286a18.285714 18.285714 0 0 1 36.571428 0v493.714285h475.428572zM146.285714 274.285714a18.285714 18.285714 0 1 1 0-36.571428h731.428572a18.285714 18.285714 0 1 1 0 36.571428H146.285714z m274.285715 164.571429a18.285714 18.285714 0 1 1 36.571428 0v292.571428a18.285714 18.285714 0 1 1-36.571428 0v-292.571428z m146.285714 0a18.285714 18.285714 0 1 1 36.571428 0v292.571428a18.285714 18.285714 0 1 1-36.571428 0v-292.571428z m-182.857143-274.285714V256a18.285714 18.285714 0 1 1-36.571429 0V146.285714a18.285714 18.285714 0 0 1 18.285715-18.285714h292.571428a18.285714 18.285714 0 0 1 18.285715 18.285714v109.714286a18.285714 18.285714 0 1 1-36.571429 0V164.571429h-256z\" p-id=\"11432\"></path></svg>")
        deleteBtn.attr("x", arg.x);
        deleteBtn.attr("y", arg.y);
        var that = this;
        deleteBtn.on("click", function (e) {
            delete that.pickTargets[arg.id];
            $("#"+arg.id).parent().parent().remove();
        });
        deleteBtn.on("mouseenter", function (e) {
            $(this).find("path").css("fill","#222222");

        });
        deleteBtn.on("mouseout", function (e) {
            $(this).find("path").css("fill","#c8c8c8");

        });

        return deleteBtn;
    };
    ElePicker.prototype.createAnchor = function (svgEle) {
        var padding = this.borderAnchor.padding;
        var r = this.borderAnchor.r;
        var color = this.borderAnchor.color;
        var box = svgEle[0].getBBox();
        var container = svgEle.parent();
        var parent = SvgUtil.create("g", {});
        var pp = SvgUtil.create("g", {});
        var trans = svgEle.attr("transform");
        parent.css("outline-offset","5px")
        parent.css("outline","2px dashed " + color)
        parent.append(svgEle);
        pp.append(parent)
        pp.attr("transform",trans);
        svgEle.attr("transform","");
        var points = [{"x":box.x - padding,"y":box.y - padding},
            {"x":box.x + box.width + padding,"y":box.y - padding},
            {"x":box.x + box.width + padding,"y":box.y + box.height +  padding},
            {"x":box.x - padding,"y":box.y + box.height + padding},
            {"x":box.x + box.width / 2,"y":box.y - padding},
            {"x":box.x + box.width + padding,"y":box.y + box.height / 2},
            {"x":box.x + box.width / 2,"y":box.y + box.height +  padding},
            {"x":box.x - padding,"y":box.y + box.height / 2}];

        for(var p of points) {
            var anchor = SvgUtil.create("circle", {
                "fill": color,
                "r": r,
                "cx": p.x,
                "cy": p.y,
            });
            pp.append(anchor);
        }

        pp.append(this.createDeleteBtn({
            "x":box.x + box.width + 1.5*padding,
            "y":box.y + 4*padding,
            "id": svgEle.attr("id")
        }));
        container.append(pp)

        this.pickTargets[svgEle.attr("id")] = {
            "ele": svgEle,
            "pick": true
        }
    }

    ElePicker.prototype.deleteAnchor = function (svgEle) {
        var p = svgEle.parent();
        var pp = p.parent();
        var container = pp.parent();
        var tans = pp.attr("transform");
        svgEle.attr("transform", tans);
        container.append(svgEle);
        p.remove();
        pp.remove();
        delete this.pickTargets[svgEle.attr("id")];
    };

    ElePicker.prototype.onmousedown = function (e, arg) {
        this.poss.origin = arg.pos;
        var obj = $(e.target)

        var id = obj.attr("id");
        if(id && id !== "svg") {
            if(!this.pickTargets[id]){
                this.createAnchor(obj);
            }else if(!window.EVENT_FLAGS["ctrl_left"]){
                this.deleteAnchor(obj);
            }
        } else {
            if((!this.pickTargets[id] && id === "svg") && !window.EVENT_FLAGS["ctrl_left"]) {
                for(var iid in this.pickTargets){
                    this.pickTargets[iid]["pick"] = false;
                    this.deleteAnchor(this.pickTargets[iid]["ele"]);
                }
            }
        }
        this.view_box = SettingUtil.get("draw_board|view_box");
    };
    ElePicker.prototype.onmousemove = function (e, arg) {
        if (!window.EVENT_FLAGS["drag"]) { return }
        var pos= arg.pos;
        var x = (pos.x - this.poss.last.x);
        var y = (pos.y - this.poss.last.y);
        for(var id in this.pickTargets) {
            var item = this.pickTargets[id];
            if(!item["pick"]){
                continue;
            }
            var ele = item["ele"].parent().parent();
            var trans = ele.attr("transform");
            var x0 = x;
            var y0 = y;
            if(trans){
                var fe = trans.split(",");
                x0 = x0 + parseInt(fe[0].split("(")[1]);
                y0 = y0 + parseInt(fe[1].split(")")[0]);
            }
            trans = "translate(" + x0 +"," + y0 + ")";
            ele.attr("transform",trans);
            OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id":id,ops:[{"attr":"transform","opera":"update", "value":trans}]});
        }
    };
    ElePicker.prototype.onmouseup = function (e, arg){
        var pos = this.poss.last;

        // var updateOps = [{"attr": "d", "opera": "add", "value": " L" + pos.x + " " + pos.y}];
        // SvgUtil.update(this.eles.cur, updateOps)
        // OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id": this.eles.cur.attr("id"), "ops": updateOps});
    };

    ElePicker.prototype.choose = function (){

    };
    ElePicker.prototype.iconActive = function (active) {
        if(active){
            $(SelectorUtil.get("svg_canvas")).attr("data-tool", this.getName());
        }
    };
    window.ElePicker = $.ElePicker = ElePicker;
})(window);
