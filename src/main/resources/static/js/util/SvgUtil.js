(function (window) {
    var SvgUtil = function (arg) {
        return new SvgUtil.fn.init(arg);
    }
    SvgUtil.prototype = SvgUtil.fn = {
        constructor: SvgUtil,
        init: function (arg) {
            return this;
        }
    };
    SvgUtil.getAllSvgEles = function () {
        var op_stack = window.WITE_BOARD_OP["stack"];
        var svgEles = [];
        for(var i=0;i<op_stack.length;i++){
            svgEles.push(op_stack[i]["ele"]);
        }
        return svgEles;
    };
    SvgUtil.create = function (tool, tag, attr) {
        if(!document.createElementNS) return;//防止IE8报错
        var $svg = $(document.createElementNS('http://www.w3.org/2000/svg', tag));
        for(var key in attr) {
            switch(key) {
                case 'xlink:href'://文本路径添加属性特有
                    $svg[0].setAttributeNS('http://www.w3.org/1999/xlink', key, attr[key]);
                    break;
                default:
                    $svg.attr(key, attr[key]);
            }
        }
        if(tool) { // 如果传入tool证明是用户自己创建的，而不是通过获取的消息创建的
            var uuid = witeboardClient.option.userName + "-" + new Date().getTime();
            $svg.attr("id", uuid)
            OnlineAction.createNewSvgEle({
                "tool_name": tool.name,
                "tag": tool.svgType,
                "svgEle": $svg
            });
        }
        return $svg;
    };
    /**
     * [
     *  {"attr":"d", "opera":"add | remove | update | substring | func", "value":"L10 10", "param":{}}
     * ]
     * @param svgEle
     * @param ops
     */
    SvgUtil.update = function (svgEle, ops, fromServer) {
        if(!ops){
            return;
        }
        for(var op of ops){
            SvgUtil.update0(svgEle, op);
        }
        if(!fromServer) {
            OnlineAction.updateSvgEle({
                "id": svgEle.attr("id"),
                "ops": ops
            });
        }
    }
    SvgUtil.update0 = function (svgEle, op) {
        switch (op["opera"]) {
            case "add":
                svgEle.attr(op["attr"], svgEle.attr(op["attr"]) + op["value"]);
                break;
            case "remove":
                svgEle.removeAttr(op["attr"]);
                break;
            case "update":
                svgEle.attr(op["attr"], op["value"]);
                break;
            case "substring":
                svgEle.attr(op["attr"], svgEle.attr(op["attr"]).substring(op["s"],op["e"]));
                break;
            case "func":
                op["value"](svgEle, op["param"]);
                break;
            case "text":
                svgEle.text(op["value"]);
                break;
        }
    }
    SvgUtil.remove = function (ele, fromServer) {
        if(!fromServer) {
            OnlineAction.deleteSvgEle({
                "id": ele.attr("id")
            });
        }

        ele.remove();
    };
    SvgUtil.fn.init.prototype = SvgUtil.fn;
    window.SvgUtil = $.SvgUtil = SvgUtil;
})(window);