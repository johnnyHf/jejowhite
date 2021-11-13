package com.jejo.web.sample.model;

public class SvgEle extends AbstractSvgEle {

    public SvgEle(String tag, String toolName, String attr) {
        this.tag = tag;
        this.toolName = toolName;
        this.attr = attr;
    }

    @Override
    public String toString() {
        return "{\"tag\":\"" +tag + "\",\"tool_name\":\"" + toolName + "\",\"attr\":"+attr + "}";
    }
}
