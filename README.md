###组件：

    1.菜单menu
        
    2.画板工具：
        设置开关，接受事件传播下来
        可用开关

        1.画笔
        2.形状（线，圆，矩形）
        3.文本
        4.橡皮
        
        几个回调函数：
        1.mousedown如何创建
        2.mousemove如何动作
        3.mouseup如何动作

        提供几个函数：
        1.工具被选中：choosed(choosed)
        2.工具是可用：useable(true)
        3.工具是否可用: isUseable()

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

![img.png](img.png)


{
    "type": "new_svg_ele",
    "data": {
        "tag": "path",
        "id": "{uid}{timestamp}",
        "toolName": "pencil",
        "attr": {}
    }
}
{
    "type": "update_svg_ele",
    "data": {
        "id": "{uid}{timestamp}",
        "attr": {}
    }
}

{
    "type": "delete_svg_ele",
    "data": {
        "id": "{uid}{timestamp}"
    }
}