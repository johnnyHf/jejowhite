###组件：

    1.菜单menu
        
    2.画板工具：
        1.画笔
        2.形状（线，圆，矩形）
        3.文本
        4.橡皮
        5.抓取，滚动
        6.撤销
        7.
        键盘输入开关，接受键盘事件传播下来
        鼠标输入开关，接受鼠标事件传播下来
        滚动监听开关，接受滚动事件传播下来
        可用开关,标识工具禁用和启用
        选中开关，标识工具是否正在使用
        
        工具名
        类型：暂时为操作类型和画图类型(op,draw)
        属性：画图类型的属性为svg元素属性
        
        元素容器，存储工具创建的svg元素
        eles:{
            "last": null,
            "cur": null
        }

        位置记录容器，存储工具点击位置信息
        poss: {
            "last": {},
            "cur": {}
        }

        元素dom

        提供几个函数：
        1.onmousedown
        2.onmousemove
        3.onmouseup
        4.oninputup
        5.oninputdwon
        7.onscroll
        8.choose

        =====分割符=====上述都是画布触发事件后回调工具对应函数
        9.iconActive

        =====分割符=====
        0.onmousedownSelf
        10.onmousemoveSelf
        11.onmouseupSelf

        =====分割符=====上述都是工具本身触发事件回调函数
        12.initHtml
        13.html

        =====分割符=====
        14.inputChoose，判断输入命令是否选中当前工具

    3.Svg元素:
        属性：
            type
            userId
            uuid
            properties
        操作：
            
            
    4.操作Actions：
        1.新建svg元素 createNewSvgElem({
            "tool": "shape",
            "shape": "circle"
        });
        2.修改svg元素属性 updateSvgEle(ele, [
            {"attr":"d", "opera":"add | remove | modify | substring | func", "value":"L10 10"}
        ])
        3.删除元素 deleteSvgEle(ele)
        4.根据主题背景色决定是否改变svg元素颜色 changeColorAgainstTheme(ele, themeColor)
        5.根据主题背景色改变svg元素填充颜色 changeFillColorAganinstTheme(ele, themeColor)
        6.修改公共配置主题 changeTheme(color);
        7.修改公共配置画板属性 changeBoardConfig({})
        8.

    5.键盘按键之后对应flag变量设置值，查看按键是否按下直接读取flag值即可
        input:{
            "keyboard": {
                "left-ctrl": "true"
            }
        }
        
    6.点击事件传播给如下组件：
        画图组件
        菜单组件

    7.公共配置：
        1.画板属性：(设置默认值)
            line_color
            fill_color
            line_style(dashed,dotted,solid)
            line_background (url())
            line_join
            size
            =====以上对应个人，每人一份
            title
            =====以上对应所有人，共有一份
        2.操作配置：
            快捷键：P --> 对应画板工具
        3.设置：
            语言
            形状检测
            主题：
                颜色
                背景
