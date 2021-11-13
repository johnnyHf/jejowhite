//{"type":"pencil","e":svgEle}
window.WITE_BOARD_OP = $.WITE_BOARD_OP = {
    "count": 0,
    "stack": []
}

function getAllOp(){
    return window.WITE_BOARD_OP["stack"];
}

function opPush(arg) {
    $(".empty-state").addClass("empty-state-hidden");
    window.WITE_BOARD_OP.stack.push({
        "name": arg['operation'],
        "ele": arg['svgEle']
    });
}

function opPop(options, sendToOthers) {
    var op_stack = getAllOp();
    var id = null;
    if(options){
        if(options["svgEle"]){
            for(var i=op_stack.length-1;i>=0;i--){
                if(op_stack[i]['ele'] === options["svgEle"]){
                    id = op_stack[i]['ele'].attr("id")
                    SvgUtil.remove(op_stack[i]['ele']);
                    op_stack.splice(i,1);
                    break;
                }
            }
        }else if(options["id"]){
            for(var i=op_stack.length-1;i>=0;i--){
                if(op_stack[i]['ele'].attr("id") === options["id"]){
                    id = op_stack[i]['ele'].attr("id")
                    SvgUtil.remove(op_stack[i]['ele']);
                    op_stack.splice(i,1);
                    break;
                }
            }
        }
    }else{
        if(op_stack.length > 0){
            var e = op_stack.pop();
            id = e["ele"].attr("id")
            SvgUtil.remove(e["ele"]);
        }
    }

    if(id != null && sendToOthers) {
        OnlineAction.sendMsg(window.WITE_BOARD_ENUM.MSG_DELETE_SVG_ELE, {
            "id": id
        })
    }

    if(op_stack.length === 0){
        $(".empty-state").removeClass("empty-state-hidden");
    }
}

function opClearAll() {
    var op_stack = getAllOp();
    for(var i=op_stack.length-1;i>=0;i--){
        SvgUtil.remove(op_stack[i]['ele'])
        op_stack.splice(i,1)
    }
    window.WITE_BOARD_OP["stack"] = [];
    $(".empty-state").removeClass("empty-state-hidden");
}