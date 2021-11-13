
function init() {
    var svg = document.getElementById("svg");
    initDrawTool();
    initDrawToolAction();
    registerGlobalMouseEvents(svg);
    registerGlobleKeyBoardEvent();
    initMenu()
    autoSetCanvasSize();
    window.witeboardClient.initialize();
    MsgManager.init();
}
function autoSetCanvasSize() {
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        $(SelectorUtil.get("draw_board")).css("height", pageHeight + "px");

        viewBoxRefresh();
    }
    setCanvasSize()
    // 改变窗口大小重新设置
    window.onresize = function () {
        setCanvasSize()
    }
}

// TODO 更改svg的viewBox属性
function viewBoxRefresh() {
    var svg = $("#svg");
    var svgWidth = svg.width();
    var svgHeight = svg.height();
    SettingUtil.set("draw_board|view_box|width", svgWidth);
    SettingUtil.set("draw_board|view_box|height", svgHeight);
}

// function resetIconNavPos() {
//     var db = $(".drawing-board");
//     var tl = $(".toolbar");
//     var ic = $(".iconnav");
//     ic.css("top", (db.outerHeight() - ic.outerHeight() - tl.outerHeight())/2 + "px");
// }

function forbitScroll() {
    document.body.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false })
}
$(document.body).ready(function(e) {
    forbitScroll();
    initChat();
    init();
})