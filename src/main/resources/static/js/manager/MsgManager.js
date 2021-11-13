(function (window) {

    var MsgManager = function (arg) {
        return new MsgManager.fn.init(arg);
    }
    MsgManager.prototype = MsgManager.fn = {
        constructor: MsgManager,
        init: function (arg) {

            return this;
        }
    };
    MsgManager.init = function () {
        this.register(window.WITE_BOARD_ENUM.MSG_NEW_SVG_ELE, new NewSvgEleMsgHandler());
        this.register(window.WITE_BOARD_ENUM.MSG_UPDATE_SVG_ELE, new UpdateSvgEleMsgHandler());
        this.register(window.WITE_BOARD_ENUM.MSG_DELETE_SVG_ELE, new DeleteSvgEleMsgHandler());
        this.register(window.WITE_BOARD_ENUM.MSG_UPDATE_THEME_COLOR, new UpdateThemeColorMsgHandler());
        this.register(window.WITE_BOARD_ENUM.MSG_CLEAR_ALL_SVG_ELE, new ClearAllSvgEleMsgHandler());
    }
    MsgManager.register = function (name, msgHandler) {
        MsgManager.set("msgs|" + name, msgHandler);
        var registeredMsgTypes = MsgManager.get("registeredMsgTypes");
        for(var type of registeredMsgTypes) {
            if(name === type){
                return;
            }
        }
        registeredMsgTypes.push(name);
    };
    MsgManager.create = function (type, arg) {
        var creater = MsgManager.get("msgs|"+type);
        if(creater) {
            return creater.create(arg);
        }
        return null;
    };
    MsgManager.dispatch = function (type, msg) {
        var resolver = MsgManager.get("msgs|"+type);
        if(resolver) {
            resolver.solve(msg);
        }
    }
    MsgManager.get = function (names) {
        return BaseUtil.get(window.WITE_BOARD_MSG_MANAGER, names);
    };
    MsgManager.set = function (names, v) {
        BaseUtil.set(window.WITE_BOARD_MSG_MANAGER, names, v);
    };
    MsgManager.fn.init.prototype = MsgManager.fn;
    window.MsgManager = $.MsgManager = MsgManager;
    window.WITE_BOARD_MSG_MANAGER = {
        "msgs": {

        },
        "registeredMsgTypes": []
    }
})(window);