package com.jejo.web.sample.action;

import com.jejo.web.sample.model.IdGenerator;
import com.jejo.web.sample.model.Message;
import com.jejo.web.sample.model.Message.MsgConstant;
import com.jejo.web.sample.model.Message.RoomInfo;
import org.springframework.stereotype.Component;

import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.nio.ByteBuffer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Websocket 画板通讯
 *
 * @author anyesu
 */
@Component
@ServerEndpoint(value = "/websocket/witeboard", configurator = wsConfigurator.class)
public class WiteboardController extends AbstractWSController {
    private static final List<AbstractWSController> connections = new CopyOnWriteArrayList<AbstractWSController>();

    private Message.RoomInfo roomInfo;

    @OnOpen
    public void OnOpen(Session session, EndpointConfig config) {
        // 设置用户信息
        setUserName(IdGenerator.getNextId());
        setSession(session);
        // 设置聊天室信息
        if (connections.size() == 0) {
            setRoomInfo(new Message.RoomInfo(getUserName(), (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date())));
        } else {
            Iterator<AbstractWSController> it = connections.iterator();
            WiteboardController client = (WiteboardController) it.next();
            setRoomInfo(client.getRoomInfo());
        }
        Message msg = new Message(getUserName(), Message.MsgConstant.setName);
        msg.setRoomInfo(getRoomInfo());
        call(msg.toString());
        super.OnOpen(session, config);
    }

    @OnClose
    public void OnClose() {
        super.OnClose();
    }

    @OnMessage(maxMessageSize = 10000000)
    public void OnMessage(String message) {
        super.OnMessage(message);
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
        return connections;
    }

    /**
     * 设置聊天室信息
     */
    private void setRoomInfo(Message.RoomInfo roomInfo) {
        this.roomInfo = roomInfo;
    }

    private Message.RoomInfo getRoomInfo() {
        return roomInfo;
    }

    @Override
    String getConnectType() {
        return "text";
    }

}
