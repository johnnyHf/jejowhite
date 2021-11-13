package com.jejo.web.sample.model;

import java.util.Arrays;

import com.alibaba.fastjson.JSONObject;

public class Message {
	private int type;// 消息类型

	private String msg;// 消息主题

	private String host;// 发送者

	private String[] dests;// 接受者

	private RoomInfo roomInfo;// 聊天室信息

	private WiteBoard witeBoard;// 画板信息

	public class MsgConstant {
		public final static int Open = 1;// 新连接
		public final static int Close = 2;// 连接断开
		public final static int MsgToAll = 3;// 发送给所有人
		public final static int MsgToPoints = 4;// 发送给指定用户
		public final static int RequireLogin = 5;// 需要登录
		public final static int setName = 6;// 设置用户名
		public final static int initBoard = 7;// 初始化画板
		public final static int MsgNewSvgEle = 11;// 新增svg元素
		public final static int UpdateSvgEle = 12;// 更新svg元素属性
		public final static int DeleteSvgEle = 13;// 删除svg元素
		public final static int UpdateThemeColor = 14;// 修改背景色
		public final static int ClearAllSvgEle = 15;// 修改背景色
	}

	public static class RoomInfo {
		private String name;// 聊天室名称
		private String creater;// 创建人
		private String createTime;// 创建时间

		public RoomInfo(String creater, String createTime) {
			this.creater = creater;
			this.createTime = createTime;
		}

		public RoomInfo(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getCreater() {
			return creater;
		}

		public void setCreater(String creater) {
			this.creater = creater;
		}

		public String getCreateTime() {
			return createTime;
		}

		public void setCreateTime(String createTime) {
			this.createTime = createTime;
		}
	}

	public Message() {
		setType(MsgConstant.MsgToAll);
	}

	public Message(String host, int type) {
		setHost(host);
		setType(type);
	}

	public Message(String host, int type, String msg) {
		this(host, type);
		setMsg(msg);
	}

	public Message(String host, int type, String[] dests) {
		this(host, type);
		setDests(dests);
	}

	@Override
	public String toString() {
		// 序列化成json串
		return JSONObject.toJSONString(this);
	}

	public String toString2() {
		StringBuilder builder = new StringBuilder();
		builder.append("Message [type=").append(type).append(", msg=").append(msg).append(", host=").append(host).append(", dests=").append(Arrays.toString(dests)).append(", witeboard=")
				.append(witeBoard).append("]");
		return builder.toString();
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String[] getDests() {
		return dests;
	}

	public void setDests(String[] dests) {
		this.dests = dests;
	}

	public RoomInfo getRoomInfo() {
		return roomInfo;
	}

	public void setRoomInfo(RoomInfo roomInfo) {
		this.roomInfo = roomInfo;
	}

	public WiteBoard getWiteboard() {
		return witeBoard;
	}

	public void setWiteboard(WiteBoard witeBoard) {
		this.witeBoard = witeBoard;
	}
}
