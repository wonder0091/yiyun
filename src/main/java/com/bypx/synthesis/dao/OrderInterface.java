package com.bypx.synthesis.dao;

import com.bypx.synthesis.bean.Variety;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderInterface {
    void add(Variety variety);

    List query(Variety variety);
    Variety queryName(String name);
    Variety queryCount(String name);
    void update(Variety variety);
    Double querySum();


    void subOrder(Variety variety);

    List<Variety> queryOrder(Variety variety);

    void emptyCart(Variety variety);
}
