(function (window) {
    var BaseUtil = function (arg) {
        return new BaseUtil.fn.init(arg);
    }
    BaseUtil.prototype = BaseUtil.fn = {
        constructor: BaseUtil,
        init: function (arg) {
            return this;
        }
    };
    BaseUtil.get = function (obj, names) {
        if(!names){
            return null;
        }
        var paths = names.split("|");
        var v = obj;

        for(var i=0;i<paths.length;i++) {
            v = v[paths[i]];
        }
        return v;
    };
    BaseUtil.set = function (obj, names, v) {
        if(!names){
            return null;
        }
        var paths = names.split("|"); //[b, c, d]

        var vArr = [obj]; //[a]
        for(var i=0;i<paths.length;i++) {
            var p = paths[i]
            vArr.push(vArr[i][p]);
        }
        vArr.pop();
        vArr.push(v);
        for(var i=vArr.length-2;i>=0;i--){
            vArr[i][paths[i]] = vArr[i+1];
        }
    };

    BaseUtil.fn.init.prototype = BaseUtil.fn;
    window.BaseUtil = $.BaseUtil = BaseUtil;
})(window);