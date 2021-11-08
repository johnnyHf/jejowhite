window.DRAW_TOOL_MANAGER = $.DRAW_TOOL_MANAGER = {

}


function initDrawTool() {
    var drawToolContainer = $(".toolbar-draw");

    registerDrawTool("undo", new $.Undo({"container":drawToolContainer}));
    registerDrawTool("eraser", new $.Eraser({"container":drawToolContainer}));
    registerDrawTool("text", new $.Text({"container":drawToolContainer}));
    registerDrawTool("line", new $.Line({"container":drawToolContainer}));
    registerDrawTool("pencil", new $.Pencil({"container":drawToolContainer}));
    registerDrawTool("shape_circle", new $.ShapeCircle({"container":drawToolContainer}));
    registerDrawTool("shape_rect", new $.ShapeRect({"container":drawToolContainer}));
    setAllDrawToolMouseSwitch(true);
    setAllDrawToolInputSwitch(true);
    chooseDrawTool("pencil", true, "all");
}


function initDrawToolAction() {
    // 画图工具
    var tool_tip_class = SelectorUtil.get("tool_tip_class");
    var drawToolList = $(SelectorUtil.get("tool_items"));
    var drawToolWrapperList = $(SelectorUtil.get("tool_wrappers"));

    drawToolList.bind('click', function (e){
        chooseDrawTool($(this).parent().attr("data-tool"), true, "all");
    });

    drawToolWrapperList.hover(function (){
        drawToolWrapperList.each(function (index, element){
            $(this).find("."+tool_tip_class).remove();
        });
        $("<span class=\""+tool_tip_class+"\"><span class=\"tooltip\">"+window.TOOL_TIPS[$(this).attr("data-tool")]+"</span></span>").appendTo($(this));
    }, function (){
        $(this).find("."+tool_tip_class).remove();
    });

    // 撤销
    $(SelectorUtil.get("undo_tool")).bind("click", function (e){
        opPop();
    });


    // 删除
    $(SelectorUtil.get("clear_tool_btn")).bind("click", function (e){
        $(".clear-modal").addClass("clear-modal-active");
    });
    $(SelectorUtil.get("clear_tool_accept")).bind("click", function (e){
        opClearAll();
        $(".clear-modal").removeClass("clear-modal-active");
    });
    $( SelectorUtil.get("clear_tool_cancel")).bind("click", function (e){
        $(".clear-modal").removeClass("clear-modal-active");
    });

    //颜色选择
    $(SelectorUtil.get("color_tool_btn")).bind("click", function (e){
        $(SelectorUtil.get("color_tool_selector")).toggleClass("hidden");
    });
    var colorSelectItem = $(SelectorUtil.get("color_items"));
    colorSelectItem.bind("click", function (e){
        var colorChoose = $(this).css("background-color");
        $(".footer-color-state span").css("background-color", colorChoose);
        SettingUtil.changeLineColor(colorChoose);
    });
}

function registerDrawTool(name, tool) {
    window.DRAW_TOOL_MANAGER[name] = tool;
}

function getDrawTool(name){
    return  window.DRAW_TOOL_MANAGER[name];
}

function chooseAllDrawTool(choosed) {
    for(var tool_name in window.DRAW_TOOL_MANAGER) {
        getDrawTool(tool_name).choose(choosed);
    }
}

function chooseDrawTool(name, choosed, conflictNames) {
    var tool = window.DRAW_TOOL_MANAGER[name];

    if(conflictNames === "all"){
        chooseAllDrawTool(!choosed)
    }else if(conflictNames){
        var names = conflictNames.split(",");
        for(var n in names){
            var t = window.DRAW_TOOL_MANAGER[n];
            if(t){
                t.choose(!choosed);
            }
        }
    }

    if(tool) {
        tool.choose(choosed);
    }
}

function enableAllDrawTool(useable) {
    for(var tool_name in window.DRAW_TOOL_MANAGER) {
        getDrawTool(tool_name).useable(useable);
    }
}

function enableDrawTool(name, useable, conflictNames) {
    var tool = window.DRAW_TOOL_MANAGER[name];

    if(conflictNames === "all"){
        enableAllDrawTool(!useable)
    }else if(conflictNames){
        var names = conflictNames.split(",");
        for(var n in names){
            var t = window.DRAW_TOOL_MANAGER[n];
            if(t){
                t.useable(!useable);
            }
        }
    }

    if(tool) {
        tool.useable(useable);
    }
}

function setAllDrawToolMouseSwitch(s) {
    for(var tool_name in window.DRAW_TOOL_MANAGER) {
        getDrawTool(tool_name).setMouseSwitch(s);
    }
}

function setDrawToolMouseSwitch(name, s, conflictNames) {
    var tool = window.DRAW_TOOL_MANAGER[name];

    if(conflictNames === "all"){
        setAllDrawToolMouseSwitch(!s)
    }else if(conflictNames){
        var names = conflictNames.split(",");
        for(var n in names){
            var t = window.DRAW_TOOL_MANAGER[n];
            if(t){
                t.setMouseSwitch(!s);
            }
        }
    }

    if(tool) {
        tool.setMouseSwitch(s);
    }
}

function setAllDrawToolInputSwitch(s) {
    for(var tool_name in window.DRAW_TOOL_MANAGER) {
        getDrawTool(tool_name).setInputSwitch(s);
    }
}

function setDrawToolInputSwitch(name, s, conflictNames) {
    var tool = window.DRAW_TOOL_MANAGER[name];

    if(conflictNames === "all"){
        setAllDrawToolInputSwitch(!s)
    }else if(conflictNames){
        var names = conflictNames.split(",");
        for(var n in names){
            var t = window.DRAW_TOOL_MANAGER[n];
            if(t){
                t.setInputSwitch(!s);
            }
        }
    }

    if(tool) {
        tool.setInputSwitch(s);
    }
}

function appendEle2Svg(arg) {
    var svg = arg.svg;
    var svgEle = arg.svgEle;
    var tool_name = arg.tool_name;
    if(svgEle){
        svgEle.appendTo(svg);
        opPush({
            "operation": tool_name,
            "svgEle": svgEle
        });
    }
}

function drawToolOnmousedown(e, arg) {
    for(var tool_name in window.DRAW_TOOL_MANAGER) {
        var tool = getDrawTool(tool_name);
        if(tool && tool.mouseSwitch() && SettingUtil.get("draw_board|cur_tool") === tool_name) {
            tool.onmousedown0(e, arg);
            var lastSvgEle = tool.getSvgEle()
            arg.tool_name = tool_name;
            arg.svgEle = lastSvgEle;
            arg.self = true;
            appendEle2Svg(arg)
        }
    }
}

function drawToolOnmouseup(e, arg) {
    for(var tool_name in window.DRAW_TOOL_MANAGER) {
        var tool = getDrawTool(tool_name);
        if(tool && tool.mouseSwitch() &&SettingUtil.get("draw_board|cur_tool") === tool_name) {
            tool.onmouseup0(e, arg);
        }
    }
}

function drawToolOnmousemove(e, arg) {
    for(var tool_name in window.DRAW_TOOL_MANAGER) {
        var tool = getDrawTool(tool_name);
        if(tool && tool.mouseSwitch() &&SettingUtil.get("draw_board|cur_tool") === tool_name) {
            tool.onmousemove0(e, arg);
        }
    }
}

function drawToolOnInputup(e, arg) {
    for(var tool_name in window.DRAW_TOOL_MANAGER) {
        var tool = getDrawTool(tool_name);
        if(tool && tool.inputSwitch()) {
            tool.oninputup0(e, arg);
        }
    }
}

function drawToolOnInputdown(e, arg) {
    for(var tool_name in window.DRAW_TOOL_MANAGER) {
        var tool = getDrawTool(tool_name);
        tool.choose(false);
        if(tool && tool.inputSwitch()) {
            tool.oninputdown0(e, arg);
        }
    }
}
