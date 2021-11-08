function registerGlobleKeyBoardEvent() {
    $(document).keydown(function(event){ //监听键盘按下时的事件
        if(!window.EVENT_FLAGS["enable_keyboard"]){return;}
        if(window.EVENT_FLAGS["black_keycode"].includes(event.keyCode)){return;}
        if(!window.EVENT_FLAGS["ctrl_left"] && window.EVENT_FLAGS["key_down"]){return;}

        if(window.EVENT_FLAGS["white_keycode"].includes(event.keyCode)){
            var keyNames = window.EVENT_KEYCODE_NAME_MAPPING[""+event.keyCode];
            if(!keyNames){return;}
            keyNames = keyNames.split("|");
            for(var name in keyNames){
                window.EVENT_FLAGS[name] = true;
            }

            window.EVENT_FLAGS["key_down"] = true;
            drawToolOnInputdown(event, undefined);
        }
    });
    $(document).keyup(function(event){ //监听键盘弹起时的事件
        if(!window.EVENT_FLAGS["enable_keyboard"]){return;}
        if(window.EVENT_FLAGS["black_keycode"].includes(event.keyCode)){return;}

        if(window.EVENT_FLAGS["white_keycode"].includes(event.keyCode)){
            var keyNames = window.EVENT_KEYCODE_NAME_MAPPING[""+event.keyCode];
            if(!keyNames){return;}
            keyNames = keyNames.split("|");
            for(var name in keyNames){
                window.EVENT_FLAGS[name] = false;
            }
            window.EVENT_FLAGS["key_down"] = false;
            drawToolOnInputup(event, undefined);
        }
    });
}
