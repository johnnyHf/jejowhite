package com.jejo.web.chat.action;

import com.jejo.web.core.action.AbstractWsController;

import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Websocket 视频通讯
 *
 * @author anyesu
 */
@ServerEndpoint(value = "/websocket/chat/video", configurator = WsConfigurator.class)
public class VideoController extends BaseMediaController {

	private static final List<AbstractWsController> CONNECTIONS = new CopyOnWriteArrayList<>();

	@Override
	@OnOpen
	public void onOpen(Session session, EndpointConfig config) {
		super.onOpen(session, config);
	}

	@Override
	@OnClose
	public void onClose() {
		super.onClose();
	}

	@Override
	@OnMessage(maxMessageSize = 10000000)
	public void onMessage(String message) {
		super.onMessage(message);
	}

	@Override
	@OnMessage(maxMessageSize = 10000000)
	public void onMessage(ByteBuffer message) {
		super.onMessage(message);
	}

	@Override
	@OnError
	public void onError(Throwable t) {
	}

	@Override
	public List<AbstractWsController> getConnections() {
		return CONNECTIONS;
	}

	@Override
	public String getConnectType() {
		return "video";
	}

}
