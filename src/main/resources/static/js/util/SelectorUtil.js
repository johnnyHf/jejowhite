(function (window) {
    var SelectorUtil = function (arg) {
        return new SelectorUtil.fn.init(arg);
    }
    SelectorUtil.prototype = SelectorUtil.fn = {
        constructor: SelectorUtil,
        init: function (arg) {
            return this;
        }
    };
    SelectorUtil.get = function (names) {
        return BaseUtil.get(window.DRAW_TOOL_SELECTOR, names);
    };
    SelectorUtil.set = function (names, v) {
        BaseUtil.set(window.DRAW_TOOL_SELECTOR, names, v);
    };
    SelectorUtil.fn.init.prototype = SelectorUtil.fn;
    window.SelectorUtil = $.SelectorUtil = SelectorUtil;
})(window);