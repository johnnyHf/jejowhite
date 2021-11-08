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

function opPop(options, fromServer) {
    var op_stack = getAllOp();
    if(options){
        if(options["svgEle"]){
            for(var i=op_stack.length-1;i>=0;i--){
                if(op_stack[i]['ele'] === options["svgEle"]){
                    SvgUtil.remove(op_stack[i]['ele'], fromServer);
                    op_stack.splice(i,1);
                    break;
                }
            }
        }else if(options["id"]){
            for(var i=op_stack.length-1;i>=0;i--){
                if(op_stack[i]['ele'].attr("id") === options["id"]){
                    SvgUtil.remove(op_stack[i]['ele'], fromServer);
                    op_stack.splice(i,1);
                    break;
                }
            }
        }
    }else{
        if(op_stack.length > 0){
            var e = op_stack.pop();
            SvgUtil.remove(e["ele"]);
        }
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
    op_stack = [];
    window.WITE_BOARD_OP["stack"] = [];
    $(".empty-state").removeClass("empty-state-hidden");
}