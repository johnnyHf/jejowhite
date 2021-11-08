
function init() {
    var svg = document.getElementById("svg");
    initDrawTool();
    initDrawToolAction();
    registerGlobalMouseEvents(svg);
    registerGlobleKeyBoardEvent();
    initMenu()
    autoSetCanvasSize();
    witeboardClient.initialize();
}
function autoSetCanvasSize() {
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        $(SelectorUtil.get("draw_board")).css("height", pageHeight + "px")
    }
    setCanvasSize()
    // 改变窗口大小重新设置
    window.onresize = function () {
        setCanvasSize()
    }
}
$(document.body).ready(function(e) {
    init();
})