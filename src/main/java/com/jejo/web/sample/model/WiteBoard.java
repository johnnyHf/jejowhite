package com.jejo.web.sample.model;

import com.jejo.web.sample.enums.AuthEnum;
import lombok.Data;

import java.util.Date;

@Data
public class WiteBoard {

    private String name;// 画板名称

    private String creater;// 创建人

    private String id;// 聊天室唯一id

    /**
     * 画板权限
     */
    private Integer auth;

    /**
     * 授权用户。{"read":["",""],"write":["":""]}
      */
    private String authUsers;


    private Date createTime;// 创建时间
    /**
     * 画板背景色
     */
    private String themeColor;

    public WiteBoard(String witeboardId, String creater) {
        this.id = witeboardId;
        this.creater = creater;
        this.createTime = new Date();
        this.auth = AuthEnum.ALL_CAN_WRITE.getAuth();
        this.themeColor = "#ffffff";
    }
}
