(function (window) {
    var AbstractComponent = function (arg) {
        return new AbstractComponent.fn.init(arg);
    }

    AbstractComponent.prototype = AbstractComponent.fn = {
        constructor: AbstractComponent,
        init: function (arg) {
            // 组件名
            this.name = "AbstractComponent";
            // // 接受鼠标事件的开关
            this.mouseS = true
            // // 接受键盘等输入事件的开关
            this.inputS = false
            // 鼠标滚动事件的快关
            this.scrollS = false
            // // 组件是否可用
            this.use = false
            // // 组件是否选中
            this.chooose = false;
            return this;
        },
        getName : function (){return this.name;},
        onmousedown : function (e, arg) {},
        onmousemove : function (e, arg) {},
        onmouseup : function (e, arg) {},
        choose : function (c) {this.chooose = c;},
        useable : function (u) {this.use = u;},
        isUseable : function () {return this.use;},
        mouseSwitch : function () {return this.mouseS;},
        inputSwitch : function () {return this.inputS;},
        scrollSwitch : function () {return this.scrollS;},
        isChoosed : function () {return this.chooose;},
        setMouseSwitch : function (s) {this.mouseS = s;},
        setInputSwitch : function (s) {this.inputS = s;},
        setScrollSwitch : function (s) {this.scrollS = s;},
    }
    AbstractComponent.fn.init.prototype = AbstractComponent.fn;
    window.AbstractComponent = $.AbstractComponent = AbstractComponent;
})(window);
