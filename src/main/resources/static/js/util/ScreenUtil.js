(function (window) {
    var ScreenUtil = function (arg) {
        return new ScreenUtil.fn.init(arg);
    }
    ScreenUtil.prototype = ScreenUtil.fn = {
        constructor: ScreenUtil,
        init: function (arg) {
            return this;
        }
    };
    ScreenUtil.requestFullScreen = function(elem) {
        //兼容不同的浏览器
        var requestMethod = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullScreen;

        if (requestMethod) {
            requestMethod.call(elem)
        } else if (typeof window.ActiveXObject !== 'undefined') {
            //模拟F11 实现全屏
            var wscript = new ActiveXObject('WScript.Shell')

            if (wscript !== null) {
                wscript.SendKeys('{F11}')
            }
        }
    };

    ScreenUtil.isFullscreen = function() {
        return document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement || false;
    };

    ScreenUtil.openBig = function(className) {
        //想要全屏展示的模块包含class名content
        var elem = document.querySelector(className);
        ScreenUtil.requestFullScreen(elem);
    };

    ScreenUtil.closeBig = function() {
        ScreenUtil.exitFullScreen();
    };

    //退出全屏
    ScreenUtil.exitFullScreen = function () {
        var el = document;
        var cfs = el.cancelFullScreen || el.webkitCancelFullScreen ||
            el.mozCancelFullScreen || el.exitFullScreen;
        if (typeof cfs != "undefined" && cfs) {
            cfs.call(el);
        } else if (typeof window.ActiveXObject != "undefined") {
            //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
    };
    ScreenUtil.fn.init.prototype = ScreenUtil.fn;
    window.ScreenUtil = $.ScreenUtil = ScreenUtil;
})(window);