(function (window) {
    var Text = function (arg) {
        DrawTool.call(this, arg)
        this.name = "text";
        this.svgType = "text";
        this.strokeWidth = "57";
        this.fontFamily = "Microsoft YaHei";
        this.properties = {
            "fill": "",
            "font-size": "",
            "font-family": "Microsoft YaHei",
        };
        this.lastInput = null;
        this.initHtml(arg)
    }
    Text.prototype = new DrawTool()
    Text.prototype.constructor = Text

    Text.prototype.onmousedown = function (e, arg) {
        var fillColor = SettingUtil.get("settings|theme|color");
        var stroke = SettingUtil.get("draw_board|line_color");
        var similar = SettingUtil.get("settings|color_similar_threshold");
        var pos = arg.pos;

        this.properties["fill"] = getReverseColorAgainstTheme(stroke, fillColor, similar);
        this.properties["stroke"] = getReverseColorAgainstTheme(stroke, fillColor, similar);
        this.properties["font-size"] = this.strokeWidth;
        this.properties["font-family"] = this.fontFamily;

        this.svgEle = SvgUtil.create(this, this.svgType, this.properties);
    };
    Text.prototype.onmousemove = function (e, arg) {

    };
    Text.prototype.onmouseup = function (e, arg) {
        var pos = this.lastPos;
        this.clickTextInput(arg.svg, pos, $(".drawing-board:first"));
    };
    Text.prototype.createTextInput = function (container, pos, callbacks) {
        var that = this;
        var styles = {
            "position": 'absolute',
            "z-index": 1000,
            "left": pos.x + "px",
            "top": pos.y + "px",
            "width": window.innerWidth
        }

        var spanStyles = {
            "color": SettingUtil.get("draw_board|line_color"),
            "font-size": this.strokeWidth + "px",
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
        SvgUtil.update(this.svgEle, [{
            "attr":"x", "opera": "update", "value": pos.x
        },{
            "attr":"y", "opera": "update", "value": pos.y
        }])
        function onInput(e, $this){
            OnlineAction.updateSvgEle({
                "id": that.lastSvgEle.attr("id"),
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
                    "svgEle": that.lastSvgEle
                });
                OnlineAction.deleteSvgEle({
                    "id": that.lastSvgEle.attr("id")
                })
            }else{
                SvgUtil.update(that.lastSvgEle, [
                    {"attr":"", "opera":"text", "value": input.trim()}
                ])
            }
            that.lastInput.remove();
        }
        function onBlur(e, $this){
            var input = $this.val().replace(/(^\s*)|(\s*$)/g, "");

            if(input.trim().length <= 0){
                opPop({
                    "svgEle": that.lastSvgEle
                });
                OnlineAction.deleteSvgEle({
                    "id": that.lastSvgEle.attr("id")
                })
            }else{
                SvgUtil.update(that.lastSvgEle, [
                    {"attr":"", "opera":"text", "value": input.trim()}
                ])
            }

            that.lastInput.remove();
        }

        this.lastSvgEle = this.svgEle;
        this.lastInput = this.createTextInput(inputContainer, pos, {
            "onInput": onInput,
            "onKeyDown": onKeyDown,
            "onComplete": onComplete,
            "onBlur": onBlur
        });
    };

    window.Text = $.Text = Text;
})(window);