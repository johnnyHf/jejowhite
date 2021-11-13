package com.jejo.web.sample.model;

import lombok.Data;

@Data
public class TextSvgEle extends AbstractSvgEle{

    public TextSvgEle(String tag, String attr, String text) {
        this.tag = tag;
        this.toolName = "text";
        this.attr = attr;
        this.text = text;
    }

    public TextSvgEle(String tag, String attr) {
        this(tag, attr, "");
    }

    @Override
    public String toString() {
        return "{\"tag\":\"" +tag + "\",\"tool_name\":\"" + toolName  + "\",\"text\":\"" +text + "\",\"attr\":"+attr + "}";
    }
}
