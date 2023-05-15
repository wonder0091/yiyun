package com.bypx.synthesis.service;

import com.bypx.synthesis.bean.User;
import com.bypx.synthesis.bean.Variety;
import com.bypx.synthesis.dao.OrderInterface;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    @Resource
    private OrderInterface orderInterface;
    @Resource
    HttpServletRequest request;

    public Map add(Variety variety){
        Map map = new HashMap();
        Variety vName = orderInterface.queryName(variety.getName());
        Variety vCount = orderInterface.queryCount(variety.getName());
        if(vName!=null && vName.getName()!=null){
            variety.setNumber((vCount.getNumber()+1));
            variety.setTotal(variety.getPrice()*variety.getNumber());
            orderInterface.update(variety);
            map.put("success",true);
            map.put("msg","加购成功");
            return map;
        }
        variety.setTotal(variety.getPrice()*variety.getNumber());
        orderInterface.add(variety);
        map.put("success",true);
        map.put("msg","加购成功");
        return map;
    }

    public Map query(Variety variety,Integer page,Integer size) {
        Map map = new HashMap();
        Page<User> orderPage = PageHelper.startPage(page,size);

        List<Variety> list = orderInterface.query(variety);
        map.put("rows",orderPage.getResult());
        map.put("total",orderPage.getTotal());
        map.put("success",true);
        return map;
    }

    public Map queryOrder(Variety variety,Integer page,Integer size) {
        Map map = new HashMap();
        Page<User> orderPage = PageHelper.startPage(page,size);
        List<Variety> list = orderInterface.queryOrder(variety);
        map.put("rows",orderPage.getResult());
        map.put("total",orderPage.getTotal());
        map.put("success",true);
        return map;
    }

    public Map subOrder(Variety variety) {
        Map map = new HashMap();
        User user = (User) request.getSession().getAttribute("user");
        if(variety.getName()!=null){
            variety.setAccount(user.getAccount());
            orderInterface.subOrder(variety);
            orderInterface.emptyCart(variety);
        }
        map.put("success",true);
        map.put("msg","提交成功");
        return map;
    }
}
