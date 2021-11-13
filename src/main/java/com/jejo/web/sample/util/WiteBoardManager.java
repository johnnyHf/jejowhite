package com.jejo.web.sample.util;

import com.jejo.web.sample.action.AbstractWSController;
import com.jejo.web.sample.model.WiteBoard;
import lombok.Data;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Data
public class WiteBoardManager {

    private SvgManager svgManager;

    private WiteBoard witeBoard;

    private List<AbstractWSController> connections;

    public WiteBoardManager(String creater, String witeboardId) {
        this.witeBoard = new WiteBoard(witeboardId, creater);
        this.svgManager = new SvgManager();
        this.connections = new CopyOnWriteArrayList<AbstractWSController>();
    }

}
