var MODE_TEXT = 0,
	MODE_VIDEO = 1,
	MODE_AUDIO = 2,
	MODE_WITEBOARD = 3;
window.witeboardClient = null;
function initChat(){
	var hasFinisedInit = false,
		unProcessedMsg = [],
		NO_SOURCE = new Image(),
		witeboardId = window.location.pathname.split("/")[1],

		witeboardClient = new WSClient({
			host: "ws://" + window.location.host + "/websocket/witeboard/"+witeboardId,
			type: MODE_WITEBOARD,
			onopen: function() {
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
				BaseUtil.speckText("有人加入了聊天室");
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
				BaseUtil.speckText("有人退出了聊天室");
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
				witeboardId = msg.witeboard.id;
				console.log(witeboardClient.option.userName)
			},
			wsonblob: function(msg) {
				//将Blob 对象转换成字符串
				var reader = new FileReader();
				reader.readAsText(msg.data, 'utf-8');
				reader.onload = function (e) {
					var data = JSON.parse(reader.result);
					if(data.type === 7) {
						//data.data {}
						for(var item of data.data) {
							appendEle2Svg({
								"svg":$("#svg"),
								"svgEle": SvgUtil.create(item.tag, item.attr),
								"tool_name": item.tool_name,
								"text": item.text,
							});
						}
						hasFinisedInit = true;
					}
				}
			}
		});
	witeboardClient.addsrcMsg = function(msg) {
		witeboardClient.processMsg(msg);
	};
	witeboardClient.adddestMsg = function(msg) {
		witeboardClient.processMsg(msg);
	};
	witeboardClient.processMsg = function(msg) {
		if([11, 12, 13, 14, 15].includes(msg.type)){
			if(!hasFinisedInit) {
				unProcessedMsg.push(msg);
			}else{
				var data = {};
				for(var item of unProcessedMsg) {
					data = JSON.parse(item.msg.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&nbsp;", " ").replaceAll("<br/>", "\n").replaceAll("&#39;", "\'")).data;
					MsgManager.dispatch(item.type, data);
				}
				data = JSON.parse(msg.msg.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&nbsp;", " ").replaceAll("<br/>", "\n").replaceAll("&#39;", "\'")).data;
				MsgManager.dispatch(msg.type, data);
			}
		}
	};
	witeboardClient.sendMsg = function(message) {
		if (message.msg) {
			message.msg = JSON.stringify(message.msg)
			witeboardClient.sendString(JSON.stringify(message));
		} else Console.log("不能发送空消息", false, 3000)
	};
	window.witeboardClient = witeboardClient;
}
// setInterval(function () {
// 	if(!hasFinisedInit || unProcessedMsg.length <= 0) {
// 		return;
// 	}
// 	var msg = unProcessedMsg.shift();
// 	var data = {};
// 	// if(!MsgManager.get("registeredMsgTypes").includes(msg.type)){
// 	// 	return;
// 	// }
// 	data = JSON.parse(msg.msg.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"").replaceAll("&nbsp;", " ").replaceAll("<br/>", "\n").replaceAll("&#39;", "\'")).data;
// 	MsgManager.dispatch(msg.type, data);
// }, 1000/70)

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