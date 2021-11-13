package com.jejo.web.sample.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jejo.web.sample.model.AbstractSvgEle;
import com.jejo.web.sample.model.Message;
import com.jejo.web.sample.model.SvgEle;
import com.jejo.web.sample.model.TextSvgEle;
import lombok.Data;

import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.LinkedHashMap;

@Data
public class SvgManager {

    private ReadWriteMap<String, AbstractSvgEle> safaMap;

    private int[] useableMsgTypes = new int[]{
            Message.MsgConstant.MsgNewSvgEle,
            Message.MsgConstant.UpdateSvgEle,
            Message.MsgConstant.DeleteSvgEle,
            Message.MsgConstant.UpdateThemeColor,
            Message.MsgConstant.ClearAllSvgEle};

    public SvgManager() {
        this.safaMap = new ReadWriteMap<String, AbstractSvgEle>(new LinkedHashMap<String, AbstractSvgEle>(16, 0.75f, false));
    }

    public ByteBuffer getMapMsg() {
        return safaMap.getMapValues();
    }

    public void dispacth(int type, JSONObject msg) {

        if(Arrays.binarySearch(useableMsgTypes, type) < 0){ // 判断是否可用的消息类型
            return;
        }
        msg = JSONObject.parseObject(msg.getString("msg"));
        JSONObject data = msg.getJSONObject("data");
        switch (type) {
            case Message.MsgConstant.MsgNewSvgEle:
                create(data.getString("tag"), data.getString("toolName"), data.getJSONObject("attr"));
                break;
            case  Message.MsgConstant.UpdateSvgEle:
                update(data.getString("id"), data.getJSONArray("ops"));
                break;
            case  Message.MsgConstant.DeleteSvgEle:
                delete(data.getString("id"));
                break;
            case  Message.MsgConstant.UpdateThemeColor:
                break;
            case  Message.MsgConstant.ClearAllSvgEle:
                safaMap.getMap().clear();
                break;
        }
    }

    public void create(String tag, String toolName, JSONObject attr) {
        String id = attr.getString("id");
        if(StringUtil.isBlank(id)) {
            System.out.println("id attr is null");
            return;
        }
        AbstractSvgEle se = null;
        if(toolName.equals("text")) {
            se = new TextSvgEle(tag, attr.toJSONString(), "");
        }else{
            se = new SvgEle(tag, toolName, attr.toJSONString());
        }
        safaMap.put(id, se);
    }

    public void update(String id, JSONArray ops) {
        for(int i=0;i<ops.size();i++){
            JSONObject job = ops.getJSONObject(i); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
            update0(id, job);
        }
    }

    public void update0(String id, JSONObject obj) {
        String opera = obj.getString("opera");
        AbstractSvgEle se = safaMap.get(id);
        JSONObject jsonAttr = JSONObject.parseObject(se.getAttr());
        String value = obj.getString("value");
        String attr = obj.getString("attr");
        String attrValue = jsonAttr.getString(attr);
        switch (opera) {
            case "add":
                jsonAttr.put(attr, attrValue + value);
                break;
            case "update":
                jsonAttr.put(attr, value);
                break;
            case "remove":
                jsonAttr.remove(attr);
                break;
            case "substring":
                jsonAttr.put(attr, attrValue.substring(obj.getInteger("s"), obj.getInteger("e")));
                break;
            case "text":
                se.setText(obj.getString("value"));
                break;
        }
        se.setAttr(jsonAttr.toJSONString());
        safaMap.put(id, se);
    }

    public void delete(String id) {
        AbstractSvgEle se = safaMap.get(id);
        if(se != null){
            safaMap.remove(id);
        }
    }
}
