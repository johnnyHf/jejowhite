(function (window) {
    var Text = function (arg) {
        DrawTool.call(this, arg)
        this.initTool(arg)
    }
    Text.prototype = new DrawTool()
    Text.prototype.constructor = Text
    Text.prototype.initTool = function (arg) {
        this.name = "text";
        this.type = "draw::text";
        this.properties = {
            "fill": "",
            "font-size": SettingUtil.get("draw_board|eraser_size"),
            "font-family": "Microsoft YaHei",
        };
        this.lastInput = null;
        this.initHtml(arg);
    }

    Text.prototype.onmousedown = function (e, arg) {
        var fillColor = SettingUtil.get("settings|theme|color");
        var stroke = SettingUtil.get("draw_board|line_color");
        var similar = SettingUtil.get("settings|color_similar_threshold");

        this.properties["fill"] = getReverseColorAgainstTheme(stroke, fillColor, similar);
        this.properties["stroke"] = getReverseColorAgainstTheme(stroke, fillColor, similar);
        this.properties["font-size"] = SettingUtil.get("draw_board|eraser_size");

        this.eles.cur = SvgUtil.create(this.getType(), this.properties);
    };
    Text.prototype.onmousemove = function (e, arg) {

    };
    Text.prototype.onmouseup = function (e, arg) {
        var pos = this.poss.last;
        this.clickTextInput(arg.svg, pos, $(".drawing-board:first"));
    };
    Text.prototype.createTextInput = function (container, pos, callbacks) {
        var styles = {
            "position": 'absolute',
            "z-index": 1000,
            "left": pos.x + "px",
            "top": pos.y + "px",
            "width": window.innerWidth
        }

        var spanStyles = {
            "color": SettingUtil.get("draw_board|line_color"),
            "font-size": this.properties["font-size"] + "px",
            "width": '100%',
        };
        var input = $("<input autoFocus class=\"text-input\"/>");
        input.css(spanStyles);
        input.bind("input propertychange", function (e) {
            var onInput = callbacks["onInput"];
            if(onInput) {
                onInput(e, $(this))
            }
        });
        input.keydown(callbacks["onKeyDown"]);
        input.blur(function(e){
            var onBlur = callbacks["onBlur"];
            if(onBlur) {
                onBlur(e, $(this));
            }
        });
        input.keypress(function (e){
            if(e.which === 13){
                var onComplete = callbacks["onComplete"];
                if(onComplete) {
                    onComplete(e, $(this));
                }
            }
        });

        var input_wrapper = $("<div class=\"text-input-wrapper\"></div>");
        input_wrapper.css(styles);
        input_wrapper.append(input);
        container.append(input_wrapper);
        input.focus();
        return input_wrapper;
    };
    Text.prototype.clickTextInput = function (svg, pos, inputContainer){
        var that = this;
        var updateOps = [{
            "attr":"x", "opera": "update", "value": pos.x
        },{
            "attr":"y", "opera": "update", "value": pos.y
        }]
        SvgUtil.update(this.eles.cur, updateOps)
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {"id": this.eles.cur.attr("id"), "ops": updateOps});
        function onInput(e, $this){
            OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {
                "id": that.eles.last.attr("id"),
                "ops": [
                    {"attr":"", "opera":"text", "value":  $this.val().replace(/(^\s*)|(\s*$)/g, "").trim()}
                ]
            });
        }
        function onKeyDown(e, $this){

        }
        function onComplete(e, $this){
            var input = $this.val().replace(/(^\s*)|(\s*$)/g, "");

            if(input.trim().length <= 0){
                opPop({
                    "svgEle": that.eles.last
                }, true);
            }else{
                BaseUtil.speckText(input.trim());
                var ops = [{"attr":"", "opera":"text", "value": input.trim()}]
                SvgUtil.update(that.eles.last, ops)
                OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {
                    "id": that.eles.last.attr("id"),
                    "ops": ops
                });
            }
            that.lastInput.remove();
        }
        function onBlur(e, $this){
            var input = $this.val().replace(/(^\s*)|(\s*$)/g, "");

            if(input.trim().length <= 0){
                opPop({
                    "svgEle": that.eles.last
                }, true);
            }else{
                var ops = [{"attr":"", "opera":"text", "value": input.trim()}]
                SvgUtil.update(that.eles.last, ops)
                OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, {
                    "id": that.eles.cur.attr("id"),
                    "ops": ops
                });
            }

            that.lastInput.remove();
        }

        this.eles.last = this.eles.cur;
        this.lastInput = this.createTextInput(inputContainer, pos, {
            "onInput": onInput,
            "onKeyDown": onKeyDown,
            "onComplete": onComplete,
            "onBlur": onBlur
        });
    };

    window.Text = $.Text = Text;
})(window);