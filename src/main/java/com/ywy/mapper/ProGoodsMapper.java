package com.ywy.mapper;

import com.ywy.domain.ProGoods;

import java.util.List;

public interface ProGoodsMapper {
  int deleteByPrimaryKey(Integer goodsId);

  int insert(ProGoods record);


  ProGoods selectByPrimaryKey(Integer goodsId);

  ProGoods selectByGoodsName(String goodsName);

  int updateByPrimaryKey(ProGoods record);

  // 这个方式我自己加的
  List<ProGoods> selectAllGoods();
}
