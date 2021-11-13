package com.jejo.web.sample.enums;

import lombok.Getter;

@Getter
public enum AuthEnum {

    NONE(0, "全员禁止使用和查看"),
    CREATE(1, "创建人自己使用"),
    ALL_CAN_WRITE(2, "全员可用，可读，可修改"),
    ALL_CAN_READ(3, "全员可用，可读；创建人可修改"),
    AUTHED_CAN_DO(4,"授权人员具有相应权限"),

    ;

    private Integer auth;

    private String desc;

    AuthEnum(Integer auth, String desc){
        this.auth = auth;
        this.desc = desc;
    }
}
