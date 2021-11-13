(function (window) {
    // 1.create a new svg element msg
    var NewSvgEleMsgHandler = function (arg) {
        return new NewSvgEleMsgHandler.fn.init(arg);
    }
    NewSvgEleMsgHandler.prototype = NewSvgEleMsgHandler.fn = {
        constructor: NewSvgEleMsgHandler,
        init: function (arg) {
            return this;
        }
    };
    /**
     * svgEle: svg element (get by jquery)
     * tool_name: the name of tool which create the svg element
     * @param arg
     */
    NewSvgEleMsgHandler.prototype.create = function (arg) {
        var uuid = witeboardClient.option.userName + "-" + new Date().getTime();
        arg.svgEle.attr("id", uuid)

        var tag = arg.svgEle[0].tagName;
        var svgEle = arg.svgEle;
        var tool_name = arg.tool_name;
        var attrList = ["id","class","fill","stroke-linejoin","stroke-width","stroke","d","font-size","font-family","cx","cy"];
        var attr = {};
        for(var a of attrList) {
            var atr = svgEle.attr(a);
            if(atr) {
                attr[a] = atr;
            }
        }
        return {
            "type": window.WITE_BOARD_ENUM.MSG_NEW_SVG_ELE,
            "msg": {
                "data": {
                    "tag": tag,
                    "toolName": tool_name,
                    "attr": attr
                }
            }
        };
    };
    NewSvgEleMsgHandler.prototype.solve = function (data) {
        appendEle2Svg({
            "svg": $("#svg"),
            "svgEle": SvgUtil.create(data.tag, data.attr),
            "tool_name": data.toolName
        });
    };
    NewSvgEleMsgHandler.fn.init.prototype = NewSvgEleMsgHandler.fn;
    window.NewSvgEleMsgHandler = $.NewSvgEleMsgHandler = NewSvgEleMsgHandler;


    // 2.update a svg element's attrs msg
    var UpdateSvgEleMsgHandler = function (arg) {
        return new UpdateSvgEleMsgHandler.fn.init(arg);
    }
    UpdateSvgEleMsgHandler.prototype = UpdateSvgEleMsgHandler.fn = {
        constructor: UpdateSvgEleMsgHandler,
        init: function (arg) {
            return this;
        }
    };
    /**
     * id: svg's attr: id (get by jquery)
     * ops: descript how to update svg element
     * @param arg
     */
    UpdateSvgEleMsgHandler.prototype.create = function (arg) {
        return {
            "type": window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE,
            "msg": {
                "data": {
                    "id": arg.id,
                    "ops": arg.ops
                }
            }
        };
    };
    UpdateSvgEleMsgHandler.prototype.solve = function (data) {
        SvgUtil.update($("#"+data.id), data.ops, true);
    };
    UpdateSvgEleMsgHandler.fn.init.prototype = UpdateSvgEleMsgHandler.fn;
    window.UpdateSvgEleMsgHandler = $.UpdateSvgEleMsgHandler = UpdateSvgEleMsgHandler;

    // 3.delete a svg element msg
    var DeleteSvgEleMsgHandler = function (arg) {
        return new DeleteSvgEleMsgHandler.fn.init(arg);
    }
    DeleteSvgEleMsgHandler.prototype = DeleteSvgEleMsgHandler.fn = {
        constructor: DeleteSvgEleMsgHandler,
        init: function (arg) {
            return this;
        }
    };
    /**
     * id: svg's attr: id (get by jquery)
     * @param arg
     */
    DeleteSvgEleMsgHandler.prototype.create = function (arg) {
        return {
            "type": window.WITE_BOARD_ENUM.MSG_DELETE_SVG_ELE,
            "msg": {
                "data": {
                    "id": arg.id
                }
            }
        };
    };
    DeleteSvgEleMsgHandler.prototype.solve = function (data) {
        opPop({"id":data.id}, false)
    };
    DeleteSvgEleMsgHandler.fn.init.prototype = DeleteSvgEleMsgHandler.fn;
    window.DeleteSvgEleMsgHandler = $.DeleteSvgEleMsgHandler = DeleteSvgEleMsgHandler;

    // 4.change theme color msg
    var UpdateThemeColorMsgHandler = function (arg) {
        return new UpdateThemeColorMsgHandler.fn.init(arg);
    }
    UpdateThemeColorMsgHandler.prototype = UpdateThemeColorMsgHandler.fn = {
        constructor: UpdateThemeColorMsgHandler,
        init: function (arg) {
            return this;
        }
    };
    /**
     * color: theme color
     * @param arg
     */
    UpdateThemeColorMsgHandler.prototype.create = function (arg) {
        return {
            "type": window.WITE_BOARD_ENUM.MSG_UPDATE_THEME_COLOR,
            "msg": {
                "data": {
                    "color": arg.color
                }
            }
        };
    };
    UpdateThemeColorMsgHandler.prototype.solve = function (data) {
        SettingUtil.changeTheme(data.color);
    };

    UpdateThemeColorMsgHandler.fn.init.prototype = UpdateThemeColorMsgHandler.fn;
    window.UpdateThemeColorMsgHandler = $.UpdateThemeColorMsgHandler = UpdateThemeColorMsgHandler;

    //5.clear all svg
    var ClearAllSvgEleMsgHandler = function (arg) {
        return new ClearAllSvgEleMsgHandler.fn.init(arg);
    }
    ClearAllSvgEleMsgHandler.prototype = ClearAllSvgEleMsgHandler.fn = {
        constructor: ClearAllSvgEleMsgHandler,
        init: function (arg) {
            return this;
        }
    };
    /**
     * color: theme color
     * @param arg
     */
    ClearAllSvgEleMsgHandler.prototype.create = function (arg) {
        return {
            "type": window.WITE_BOARD_ENUM.MSG_CLEAR_ALL_SVG_ELE,
            "msg": {
                "data": {
                }
            }
        };
    };
    ClearAllSvgEleMsgHandler.prototype.solve = function (data) {
        opClearAll();
    };

    ClearAllSvgEleMsgHandler.fn.init.prototype = ClearAllSvgEleMsgHandler.fn;
    window.ClearAllSvgEleMsgHandler = $.ClearAllSvgEleMsgHandler = ClearAllSvgEleMsgHandler;

})(window);