package com.ywy.service;


import com.ywy.domain.ProGoods;
import com.ywy.domain.UsrUser;
import com.ywy.exception.WorkException;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface ProGoodsService {

    int deleteByPrimaryKey(Integer goodsId);

    int insert(ProGoods record);


    ProGoods selectByPrimaryKey(Integer goodsId);

    ProGoods selectByGoodsName(String goodsName);

    int updateByPrimaryKey(ProGoods record);

    List<ProGoods> selectAllGoods(int pageNum, int pageSize);
}
