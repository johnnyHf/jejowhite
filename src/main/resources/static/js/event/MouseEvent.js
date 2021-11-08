function registerGlobalMouseEvents(svg) {
    // 鼠标操作
    // 特性检测
    if (document.body.ontouchstart === undefined) {
        // 非触屏设备
        svg.addEventListener('mousedown', function (e) {
            if(!window.EVENT_FLAGS["enable_mouse"]){return;}
            window.EVENT_FLAGS["drag"] = true
            drawToolOnmousedown(e, {"pos": { x: e.offsetX, y: e.offsetY }, "svg": svg});
        })

        svg.addEventListener('mousemove', function (e) {
            if(!window.EVENT_FLAGS["enable_mouse"]){return;}
            if (!window.EVENT_FLAGS["drag"]) { return }
            drawToolOnmousemove(e, {"pos": { x: e.offsetX, y: e.offsetY }, "svg": svg});
        })
        svg.addEventListener('mouseup', function (e) {
            if(!window.EVENT_FLAGS["enable_mouse"]){return;}
            window.EVENT_FLAGS["drag"] = false
            drawToolOnmouseup(e, {"pos": { x: e.offsetX, y: e.offsetY }, "svg": svg});
        })
    } else {
        // 触屏设备
        svg.addEventListener('touchstart', function (e) {
            if(!window.EVENT_FLAGS["enable_mouse"]){return;}
            window.EVENT_FLAGS["drag"] = true
            drawToolOnmousedown(e, {"pos": { x: e.touches[0].clientX, y: e.touches[0].clientY }, "svg": svg});
        })
        svg.addEventListener('touchmove', function (e) {
            if(!window.EVENT_FLAGS["enable_mouse"]){return;}
            if (!window.EVENT_FLAGS["drag"]) { return }
            drawToolOnmousemove(e, {"pos": { x: e.touches[0].clientX, y: e.touches[0].clientY }, "svg": svg});
        })
        svg.addEventListener('touchend', function (e) {
            if(!window.EVENT_FLAGS["enable_mouse"]){return;}
            window.EVENT_FLAGS["drag"] = false
            drawToolOnmouseup(e, {"pos": { x: e.offsetX, y: e.offsetY }, "svg": svg});
        })
    }

}