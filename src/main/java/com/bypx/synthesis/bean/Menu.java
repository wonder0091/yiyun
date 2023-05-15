package com.bypx.synthesis.bean;

import org.springframework.stereotype.Controller;

public class Menu {
    private String text;
    private Integer order;
    private String id;
    private Integer pId;
    private String url;
    private String icon;
    private String flag;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getpId() {
        return pId;
    }

    public void setpId(Integer pId) {
        this.pId = pId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    @Override
    public String toString() {
        return "Menu{" +
                "text='" + text + '\'' +
                ", order=" + order +
                ", id='" + id + '\'' +
                ", pId=" + pId +
                ", url='" + url + '\'' +
                ", icon='" + icon + '\'' +
                ", flag='" + flag + '\'' +
                '}';
    }
}
