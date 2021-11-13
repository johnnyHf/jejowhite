package com.jejo.web.sample.model;

import lombok.Data;

@Data
public abstract class AbstractSvgEle {
    /**
     * svg元素标签类型
     */
    public String tag;

    public String toolName;

    /**
     * svg元素属性
     */
    public String attr;

    public String text;
}
