window.DEFAULT_WITE_BOARD_CONFIG = $.DEFAULT_WITE_BOARD_CONFIG = {
    "settings": {
        "theme": {
            "color": "#ffffff",
            "bg": ""
        },
        "language": "english",
        "shape_detection": true,
        "color_similar_threshold": 0.2
    },
    "tool_mapping": {
        "pencil": {
            "keyboard": {
                "value": "P"
            }
        },
        "line": {
            "keyboard": {
                "value": "L"
            }
        },
        "text": {
            "keyboard": {
                "value": "T"
            }
        },
        "eraser": {
            "keyboard": {
                "value": "E"
            }
        },
        "shape_rect": {
            "keyboard": {
                "value": "R"
            }
        },
        "shape_circle": {
            "keyboard": {
                "value": "C"
            }
        },
        "undo": {
            "keyboard": {
                "value": "and|ctrl_left|Z"
            }
        },
    },
    "draw_board": {
        "line_color": "rgb(255, 211, 53)",
        "line_style": "solid", // (dashed,dotted,solid)
        "line_background": "",
        "line_join": "round",
        "title": "",
        "cur_tool": "pencil",
        "last_tool": "pencil"
    }
}
window.WITE_BOARD_CONFIG = $.WITE_BOARD_CONFIG = {};
$.extend(true,window.WITE_BOARD_CONFIG, window.DEFAULT_WITE_BOARD_CONFIG);

window.DRAW_TOOL_SELECTOR = $.DRAW_TOOL_SELECTOR = {
    // 画图工具
    "tool_items": '.tooltip-wrapper .toolbar-item:not(:last)',
    // 画图工具外层包装
    "tool_wrappers": '.toolbar-item-wrapper .tooltip-wrapper',
    // 画板工具提示标签
    "tool_tip_class": 'tooltip-inner-wrapper',
    // 撤销
    "undo_tool": '.tooltip-wrapper .toolbar-item:last',
    // 清除btn
    "clear_tool_btn": ".footer-clear",
    // 确认清除画板按钮
    "clear_tool_accept": ".clear-modal-accept",
    // 取消清除画板按钮
    "clear_tool_cancel": ".clear-modal-cancel",
    // 颜色modal
    "color_tool_modal": ".footer-color",
    // 颜色菜单开关
    "color_tool_selector": ".footer-color-selector",
    // 当前颜色
    "color_tool_btn": ".footer-color-state",
    // 颜色item
    "color_items": ".footer-color-selector .footer-color-selector-item",
    // 画板
    "draw_board": ".drawing-board",
    // svg画布
    "svg_canvas": ".drawing-board .drawing-board",
    // 全屏
    "fullscreen_btn": ".toggle-fullscreen",
    // 设置菜单按钮
    "setting_menu": ".toolbar-menu-button",
    // 设置菜单
    "setting_menu_popover": ".toolbar-menu-popover",
    // 主题按钮
    "theme_btn": ".toolbar-menu-popover-dark-mode",
    // 形状检测按钮
    "shape_detection_btn": ".toolbar-menu-popover-shape-detect",
    // 图片下载按钮
    "img_download_btn": ".toolbar-menu-popover-download",
    // 语言选择按钮
    "language_menu_btn": ".toolbar-menu-popover-language",
    // 语言项
    "language_items": ".toolbar-menu-language .toolbar-menu-language-item",
    // 语言菜单
    "language_menu": ".toolbar-menu-language",
    // 语言icon
    "language_icon": ".toolbar-menu-language-icon img",
    // 语言名称
    "language_name": ".toolbar-menu-language-caption",
    // 当前语言icon
    "cur_language_icon": ".toolbar-menu-popover-current-language",
    // 历史记录
    "history": ".toolbar-menu-popover-history",
    // 新画板
    "new_board": ".toolbar-menu-popover-item",
    // 标题输入框
    "title_input": ".toolbar-title-input",
    // 标题提示
    "title_tip": ".toolbar-title-caption",
    // 帮助按钮
    "help_btn": ".toolbar-help",
    // 帮助详情页
    "help_page": ".help-sidebar",
    // 帮助关闭按钮
    "help_close_btn": ".help-sidebar-close-icon",
    // 反馈按钮
    "feedback_btn": ".feedback-caption",
    "feedback_form": ".feedback-wrapper",
    "feedback_input": ".feedback-popover-input",
}