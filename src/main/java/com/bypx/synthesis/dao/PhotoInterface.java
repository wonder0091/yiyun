package com.bypx.synthesis.dao;

import com.bypx.synthesis.bean.User;
import com.bypx.synthesis.bean.Variety;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoInterface {
    public List<Variety> queryPhoto(Variety variety);

}
