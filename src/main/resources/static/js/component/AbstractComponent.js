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
            // // 组件是否可用
            this.use = false
            // // 组件是否选中
            this.choose = false;
            return this;
        },
        getName : function (){return this.name;},
        onmousedown : function (e, arg) {},
        onmousemove : function (e, arg) {},
        onmouseup : function (e, arg) {},
        choosed : function (c) {this.choose = c;},
        useable : function (u) {this.use = u;},
        isUseable : function () {return this.use;},
        mouseSwitch : function () {return this.mouseS;},
        inputSwitch : function () {return this.inputS;},
        setMouseSwitch : function (s) {this.mouseS = s;},
        setInputSwitch : function (s) {this.inputS = s;},
    }
    AbstractComponent.fn.init.prototype = AbstractComponent.fn;
    window.AbstractComponent = $.AbstractComponent = AbstractComponent;
})(window);
