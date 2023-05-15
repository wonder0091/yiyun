package com.bypx.synthesis.controller;

import com.bypx.synthesis.bean.Variety;
import com.bypx.synthesis.dao.UserInterface;
import com.bypx.synthesis.service.OrderService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("order")
public class OrderController {

    @Resource
    private OrderService orderService;

    @RequestMapping("/add")
    @ResponseBody
    public Map add(Variety variety){
        Map map = orderService.add(variety);
        return map;
    }

    @RequestMapping("/subOrder")
    @ResponseBody
    public Map subOrder(Variety variety){
        Map map = orderService.subOrder(variety);
        return map;
    }

    @RequestMapping("/query")
    @ResponseBody
    public Map query(Variety variety,Integer page,Integer size){
        Map map = orderService.query(variety,page,size);
        return map;
    }

    @RequestMapping("/queryOrder")
    @ResponseBody
    public Map queryOrder(Variety variety,Integer page,Integer size){
        Map map = orderService.queryOrder(variety,page,size);
        return map;
    }
}
