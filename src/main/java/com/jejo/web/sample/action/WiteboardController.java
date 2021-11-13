package com.jejo.web.sample.action;

import com.alibaba.fastjson.JSONObject;
import com.jejo.web.sample.model.AbstractSvgEle;
import com.jejo.web.sample.model.IdGenerator;
import com.jejo.web.sample.model.Message;
import com.jejo.web.sample.model.Message.MsgConstant;
import com.jejo.web.sample.model.Message.RoomInfo;
import com.jejo.web.sample.model.WiteBoard;
import com.jejo.web.sample.util.ReadWriteMap;
import com.jejo.web.sample.util.StringUtil;
import com.jejo.web.sample.util.WiteBoardManager;
import org.springframework.stereotype.Component;

import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.nio.ByteBuffer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Websocket 画板通讯
 *
 * @author anyesu
 */
@Component
@ServerEndpoint(value = "/websocket/witeboard/{witeboardId}", configurator = wsConfigurator.class)
public class WiteboardController extends AbstractWSController {
    private static final ReadWriteMap<String, WiteBoardManager> witeboardmanagers = new ReadWriteMap<String,WiteBoardManager>(new LinkedHashMap<String, WiteBoardManager>(16, 0.75f, false));

    private String witeboardId;

    @OnOpen
    public void OnOpen(Session session, @PathParam("witeboardId") String witeboardId, EndpointConfig config) {
        // 设置用户信息
        setUserName(IdGenerator.getNextId());
        setSession(session);

        // 获取画板信息,设置聊天室信息
        this.setWiteboardId(witeboardId);
        WiteBoardManager witeboardManager = getWiteboardManager(witeboardId);

        // 回传画板基本信息
        Message msg = new Message(getUserName(), MsgConstant.setName);
        msg.setWiteboard(witeboardManager.getWiteBoard());
        call(msg.toString());
        //回传画板画布信息
        callAsync(witeboardManager.getSvgManager().getMapMsg());
        super.OnOpen(session, config);
    }

    @OnClose
    public void OnClose() {
        super.OnClose();
    }

    @OnMessage(maxMessageSize = 10000000)
    public void OnMessage(String message) {
        Message msg = JSONObject.parseObject(message, Message.class);
        msg.setHost(getUserName());
        if (getConnectType().equals("witeboard")) {
            // 服务端同步计算用户操作，保存用户数据
            System.out.println(msg);
            witeboardmanagers.get(getWiteboardId()).getSvgManager().dispacth(msg.getType(), JSONObject.parseObject(message));
            msg.setMsg(StringUtil.txt2htm(msg.getMsg()));
            if (msg.getDests() == null) {
                broadcast2Others(msg.toString());
            } else {
                broadcast2Special(msg.toString(), msg.getDests());
            }
        } else {
            broadcast2Others(msg.toString());
        }
    }

    @OnMessage(maxMessageSize = 10000000)
    public void OnMessage(ByteBuffer message) {
        super.OnMessage(message);
    }

    @OnError
    public void OnError(Throwable t) throws Throwable {
    }

    @Override
    List<AbstractWSController> getConnections() {
        return witeboardmanagers.get(getWiteboardId()).getConnections();
    }

    /**
     * 设置聊天室信息
     */
    private void setWiteboardId(String witeboardId) {
        this.witeboardId = witeboardId;
    }

    private String getWiteboardId() {
        return this.witeboardId;
    }

    @Override
    String getConnectType() {
        return "witeboard";
    }

    public WiteBoardManager getWiteboardManager(String witeboardId) {
        //如果 witeboardId为空，创建一个默认
        if(witeboardId == null) {
            witeboardId = IdGenerator.getNextId();
        }

        WiteBoardManager witeBoardManager = witeboardmanagers.get(witeboardId);

        //如果witeboardId不为空，查询是否存在，不存在创建一个
        if(witeBoardManager == null) {
            witeBoardManager = new WiteBoardManager(getUserName(), witeboardId);
            witeboardmanagers.put(witeboardId, witeBoardManager);
        }

        return witeBoardManager;
    }

}
