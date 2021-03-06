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
        "view_box": {
            "keyboard": {
                "value": "D"
            }
        },
        "ele_picker": {
            "keyboard": {
                "value": "G"
            }
        },
    },
    "draw_board": {
        "line_color": "rgb(255, 211, 53)",
        "line_style": "solid", // (dashed,dotted,solid)
        "line_background": "",
        "line_join": "round",
        "stroke_width": 5.3,
        "eraser_size": 57,
        "font_size": 57,
        "title": "",
        "cur_tool": "pencil",
        "last_tool": "pencil",
        "view_box": {x:0, y:0, offsetX: 0, offsetY: 0, width: 0, height:0, scale: 4},
        "scales": [5,4,3,2,1,0.8,0.6,0.4,0.2]
    }
}
window.WITE_BOARD_CONFIG = $.WITE_BOARD_CONFIG = {};
$.extend(true,window.WITE_BOARD_CONFIG, window.DEFAULT_WITE_BOARD_CONFIG);


window.WITE_BOARD_ENUM = $.WITE_BOARD_ENUM = {
    "MSG_NEW_SVG_ELE": 11,
    "MSG_UPDATE_SVG_ELE": 12,
    "MSG_DELETE_SVG_ELE": 13,
    "MSG_UPDATE_THEME_COLOR": 14,
    "MSG_CLEAR_ALL_SVG_ELE": 15,
}

window.DRAW_TOOL_SELECTOR = $.DRAW_TOOL_SELECTOR = {
    // ????????????
    "tool_items": '.tooltip-wrapper .toolbar-item:not(:last)',
    // ????????????????????????
    "tool_wrappers": '.toolbar-item-wrapper .tooltip-wrapper',
    // ????????????????????????
    "tool_tip_class": 'tooltip-inner-wrapper',
    // ??????
    "undo_tool": '.tooltip-wrapper .toolbar-item:last',
    // ??????btn
    "clear_tool_btn": ".footer-clear",
    // ????????????????????????
    "clear_tool_accept": ".clear-modal-accept",
    // ????????????????????????
    "clear_tool_cancel": ".clear-modal-cancel",
    // ??????modal
    "color_tool_modal": ".footer-color",
    // ??????????????????
    "color_tool_selector": ".footer-color-selector",
    // ????????????
    "color_tool_btn": ".footer-color-state",
    // ??????item
    "color_items": ".footer-color-selector .footer-color-selector-item",
    // ??????
    "draw_board": ".drawing-board",
    // svg??????
    "svg_canvas": ".drawing-board .drawing-board",
    // ??????
    "fullscreen_btn": ".toggle-fullscreen",
    // ??????????????????
    "setting_menu": ".toolbar-menu-button",
    // ????????????
    "setting_menu_popover": ".toolbar-menu-popover",
    // ????????????
    "theme_btn": ".toolbar-menu-popover-dark-mode",
    // ??????????????????
    "shape_detection_btn": ".toolbar-menu-popover-shape-detect",
    // ??????????????????
    "img_download_btn": ".toolbar-menu-popover-download",
    // ??????????????????
    "language_menu_btn": ".toolbar-menu-popover-language",
    // ?????????
    "language_items": ".toolbar-menu-language .toolbar-menu-language-item",
    // ????????????
    "language_menu": ".toolbar-menu-language",
    // ??????icon
    "language_icon": ".toolbar-menu-language-icon img",
    // ????????????
    "language_name": ".toolbar-menu-language-caption",
    // ????????????icon
    "cur_language_icon": ".toolbar-menu-popover-current-language",
    // ????????????
    "history": ".toolbar-menu-popover-history",
    // ?????????
    "new_board": ".toolbar-menu-popover-item",
    // ???????????????
    "title_input": ".toolbar-title-input",
    // ????????????
    "title_tip": ".toolbar-title-caption",
    // ????????????
    "help_btn": ".toolbar-help",
    // ???????????????
    "help_page": ".help-sidebar",
    // ??????????????????
    "help_close_btn": ".help-sidebar-close-icon",
    // ????????????
    "feedback_btn": ".feedback-caption",
    "feedback_form": ".feedback-wrapper",
    "feedback_input": ".feedback-popover-input",
}