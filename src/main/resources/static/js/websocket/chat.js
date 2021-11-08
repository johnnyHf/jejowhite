var MODE_TEXT = 0,
	MODE_VIDEO = 1,
	MODE_AUDIO = 2,
	MODE_WITEBOARD = 3,
	ACTION_NEW_SVGELE = 11,
	ACTION_UPDATE_SVGELE = 12,
	ACTION_DELETE_SVGELE = 13,
	SETTINGS_THEME_COLOR = 14,
	NO_SOURCE = new Image(),
	witeboardClient = new WSClient({
		host: "ws://" + window.location.host + "/websocket/witeboard",
		type: MODE_WITEBOARD,
		onopen: function() {
			var message = {
				type: 3,
				msg: "test"
			};
			if (message.msg.trim() != '') {
				witeboardClient.sendString(JSON.stringify(message));
			} else Console.log("不能发送空消息", false, 3000)
			Console.log('WebSocket已连接.')
		},
		onclose: function() {
			Console.log('Info: WebSocket已断开.', true)
		},
		wsonopen: function(msg) {
			// witeboardClient.initUserList(msg.dests);
			if (witeboardClient.isMe(msg.host)) {
				witeboardClient.online = true;
				msg = "您已加入聊天室"
			} else {
				msg = msg.host + "加入了聊天室"
			}
			Console.log(msg)
		},
		wsonclose: function(msg) {
			if (witeboardClient.isMe(msg.host)) {
				witeboardClient.online = false;
				// witeboardClient.initUserList(null);
				msg = "您已退出聊天室"
			} else {
				// witeboardClient.initUserList(msg.dests);
				msg = msg.host + "退出了聊天室"
			}
			Console.log(msg, true)
		},
		wsonmessage: function(msg) {
			msg.msg = msg.msg.replace(/\n/g, "<br/>");
			if (witeboardClient.isMe(msg.host)) witeboardClient.addsrcMsg(msg);
			else witeboardClient.adddestMsg(msg)
		},
		wsrequirelogin: function(msg) {
			document.location.href = "http://" + window.location.host + "/login.htm?to_url=" + document.location.href
		},
		wssetname: function(msg) {
			witeboardClient.setRoomInfo(msg.roomInfo);
			console.log(witeboardClient.option.userName)
		}
	});
witeboardClient.addsrcMsg = function(msg) {
	console.log("addsrcMsg")
	witeboardClient.addMsg(msg);
};
witeboardClient.adddestMsg = function(msg) {
	console.log("adddestMsg")
	witeboardClient.addMsg(msg);
};
witeboardClient.addMsg = function(msg) {
	var data = {};
	if(![ACTION_NEW_SVGELE, ACTION_UPDATE_SVGELE, ACTION_DELETE_SVGELE, SETTINGS_THEME_COLOR].includes(msg.type)){
		return;
	}
	data = JSON.parse(msg.msg.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&nbsp;", " ").replaceAll("<br/>", "\n").replaceAll("&#39;", "\'")).data;
	switch(msg.type) {
		case ACTION_NEW_SVGELE:
			appendEle2Svg({
				"svg": $("#svg"),
				"svgEle": SvgUtil.create(null, data.tag, data.attr),
				"toolName": data.tool_name
			});
			break;
		case ACTION_UPDATE_SVGELE:
			SvgUtil.update($("#"+data.id), data.ops, true);
			break;
		case ACTION_DELETE_SVGELE:
			opPop({"id":data.id}, true)
			break;
		case SETTINGS_THEME_COLOR:
			console.log(data)
			SettingUtil.changeTheme(data.color);
			break;
	}
};
witeboardClient.sendMsg = function(message) {
	// var message = {
	// 	type: 3,
	// 	msg: "test"
	// };
	if (message.msg) {
		message.msg = JSON.stringify(message.msg)
		witeboardClient.sendString(JSON.stringify(message));
	} else Console.log("不能发送空消息", false, 3000)
};
witeboardClient.setRoomInfo = function(roomInfo) {
	console.log(roomInfo)
};


var Console = {
	Win: ".socket-info",
	ChatMode: MODE_TEXT,
	fullScreen: false,
	isMin: false,
	setMode: function(mode) {
		if (Console.ChatMode == mode) {
			return
		}
		Console.ChatMode = mode;
		switch (mode) {
		case MODE_TEXT:
			Console.Win = ".mwd .mode-text";
			break;
		case MODE_VIDEO:
			Console.Win = ".mwd .mode-video";
			if (!videoClient.online) {
				Console.camera = new Camera(), Console.myVideo = new Video("#myVideo");
				var callback = function() {
						videoClient.initialize("uid=" + videoClient.option.userName)
					};
				Console.camera.start(function() {
					Console.myVideo.init(Console.camera.source());
					Console.myVideo.canPlay = true;
					callback()
				}, callback)
			}
			break
		}
		// $(Console.Win).siblings("[class^='mode-']").hide();
		// $(Console.Win).show()
	},
	log: function(message, error, delay) {
		if (message == "") return;
		console.log(message);
		delay = delay || 10000;
		var v = $(Console.Win).find("span");
		v.html(message);
		v.attr("title", message);
		if (error) v.addClass("error");
		setTimeout(function() {
			v.removeClass("error").html("")
		}, 5000)
	},
};

function releaseUrl(url) {
	url && window.URL && window.URL.revokeObjectURL && window.URL.revokeObjectURL(url)
}