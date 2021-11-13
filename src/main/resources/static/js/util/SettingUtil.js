(function (window) {
    var SettingUtil = function (arg) {
        return new SettingUtil.fn.init(arg);
    }
    SettingUtil.prototype = SettingUtil.fn = {
        constructor: SettingUtil,
        init: function (arg) {
            return this;
        }
    };
    SettingUtil.changeTheme = function (color) {
        if(isSimilarColor(rgb2Hex(SettingUtil.get("settings|theme|color", color)),  rgb2Hex(color), 0.5)){
            return;
        }
        $(SelectorUtil.get("draw_board")).css("background-color", color);
        var color_similar_threshold = SettingUtil.get("settings|color_similar_threshold");
        var colorNowSpan = $(".footer-color-state span");
        var colorNow = colorNowSpan.css("background-color");

        $(SelectorUtil.get("theme_btn")).toggleClass("toolbar-menu-popover-dark-mode-active");
        $(SelectorUtil.get("color_items")).toggleClass("blackboard");
        $(SelectorUtil.get("draw_board")).toggleClass("blackboard");

        colorNowSpan.css("background-color", getReverseColorAgainstTheme(colorNow, color, color_similar_threshold));
        SettingUtil.set("settings|theme|color", color);

        var opStacks = getAllOp();
        for(var s of opStacks) {
            var stroke = s["ele"].attr("stroke");
            SvgUtil.update(s["ele"], [{
                "attr": "fill",
                "opera": "update",
                "value": s["name"] === "eraser" ? color : getReverseColorAgainstTheme(stroke, color, color_similar_threshold)
            },
            {
                "attr": "stroke",
                "opera": "update",
                "value": s["name"] === "eraser" ? color : getReverseColorAgainstTheme(stroke, color, color_similar_threshold)
            }])
        }
    };
    SettingUtil.shapeDetection = function (b) {};
    SettingUtil.changeLanguage = function (name) {};
    SettingUtil.history = function () {};
    SettingUtil.updateBoardTitle = function (title) {};
    SettingUtil.addFeedback = function (feedback) {return true};
    SettingUtil.changeLineColor = function (color) {
        SettingUtil.set("draw_board|line_color", color);
    };
    SettingUtil.downloadImage = function (id, name = "jejo", type='png') {
        var node = document.getElementById(id);
        var width = window.getComputedStyle(node).width
        var height = window.getComputedStyle(node).height

        let serializer = new XMLSerializer()
        let source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(node)
        let image = new Image()
        image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)
        console.log(image.src)
        let canvas = document.createElement('canvas')
        canvas.width = parseInt(width.replace("px", ""));
        canvas.height = parseInt(height.replace("px", ""));
        let context = canvas.getContext('2d')
        context.fillStyle = SettingUtil.get("settings|theme|color")
        context.fillRect(0, 0, canvas.width, canvas.height)
        image.onload = function () {
            context.drawImage(image, 0, 0)
            let a = document.createElement('a')
            a.download = `${name}.${type}`
            a.href = canvas.toDataURL(`image/${type}`)
            a.click()
        }
    };
    SettingUtil.get = function (names) {
        return BaseUtil.get(window.WITE_BOARD_CONFIG, names);
    };
    SettingUtil.set = function (names, v) {
        BaseUtil.set(window.WITE_BOARD_CONFIG, names, v)
    };

    SettingUtil.fn.init.prototype = SettingUtil.fn;
    window.SettingUtil = $.SettingUtil = SettingUtil;
})(window);
