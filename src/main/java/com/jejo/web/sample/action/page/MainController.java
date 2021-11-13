package com.jejo.web.sample.action.page;
import com.jejo.web.sample.util.StringUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.websocket.server.PathParam;

/**
 * Websocket 文字通讯
 *
 * @author anyesu
 */
@Controller
public class MainController {

    @GetMapping({"/{witeboardId}","/index"})
    public String index(Model model, @PathParam("witeboardId") String witeboardId){
        if(!StringUtil.isBlank(witeboardId)){
            model.addAttribute("witeboardId",witeboardId);
        }else {
            model.addAttribute("witeboardId","");
        }
        return "index";
    }

}
