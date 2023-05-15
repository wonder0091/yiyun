package com.bypx.synthesis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequestMapping("/to")
public class PageController {
    @RequestMapping("login")
    public String login(){
        return "login";
    }
    @RequestMapping("register")
    public String register(){
        return "register";
    }
    @RequestMapping("index")
    public String index(){
        return "index";
    }
    @RequestMapping("test")
    public String test(){
        return "test";
    }
    @RequestMapping("user")
    public String user(){
        return "user";
    }
    @RequestMapping("notice")
    public String notice(){
        return "notice";
    }
    @RequestMapping("attendance")
    public String attendance(){
        return "attendance";
    }

    @RequestMapping("images")
    public String images(){
        return "images";
    }
    @RequestMapping("order")
    public String order(){
        return "order";
    }
    @RequestMapping("buy")
    public String buy(){
        return "buy";
    }
    @RequestMapping("classify")
    public String classify(){
        return "classify";
    }
    @RequestMapping("product")
    public String product(){
        return "product";
    }

}
