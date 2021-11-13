window.WITE_BOARD_ONINE_ACTIONS = {
    "share_users" :{
        "users": {
            "giraffe":{
                "name": "",
                "color": "rgb(106, 70, 250)",
                "you": true
            },
            "cow": {
                "name": "",
                "color": "rgb(43, 144, 239)"
            },
            "lobster": {
                "name": "",
                "color": "rgb(255, 155, 60)"
            },
        },
        "self_uid": "",
        "count": 3,
        "fetched": false
    }
};

(function (window) {
    var OnlineAction = function (arg) {
        return new OnlineAction.fn.init(arg);
    }
    OnlineAction.prototype = OnlineAction.fn = {
        constructor: OnlineAction,
        init: function (arg) {
            return this;
        }
    };
    OnlineAction.updateUserName = function(data) {
        return true;
    };
    OnlineAction.getUsers = function(data) {
        OnlineAction.checkUserFetched();
        return OnlineAction.get("share_users|users")
    };
    OnlineAction.getUserCount = function(data) {
        OnlineAction.checkUserFetched();
        return OnlineAction.get("share_users|users")
    };
    OnlineAction.getUserSelf = function(data) {
        OnlineAction.checkUserFetched();
        return OnlineAction.get("share_users|users|" + OnlineAction.get("share_users|self_uid"));
    };
    OnlineAction.fetchUsers = function(callback) {
        // TODO fetch users
        if(callback) {
            callback(OnlineAction.get("share_users|users"));
        }
    };

    OnlineAction.checkUserFetched = function() {
        if(!OnlineAction.get("share_users|fetched")) {
            OnlineAction.fetchUsers(function (users) {
                OnlineAction.set("share_users|count", true);
            });
        }
    };

    OnlineAction.sendMsg = function (type, arg) {
        var msg = MsgManager.create(type, arg);
        witeboardClient.sendMsg(msg);
    }

    OnlineAction.set = function(names, v) {
        BaseUtil.set(window.WITE_BOARD_ONINE_ACTIONS, names, v)
    };
    OnlineAction.get = function(names) {
        return BaseUtil.get(window.WITE_BOARD_ONINE_ACTIONS, names)
    };
    OnlineAction.fn.init.prototype = OnlineAction.fn;
    window.OnlineAction = $.OnlineAction = OnlineAction;
})(window);