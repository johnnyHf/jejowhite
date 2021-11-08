package com.jejo.web.sample.action.page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Websocket 文字通讯
 *
 * @author anyesu
 */
@Controller
public class MainController {

    @GetMapping({"/","/index"})
    public String index(){
        return "index";
    }

    @GetMapping("/test")
    public String test(){
        return "ws/main";
    }
}
