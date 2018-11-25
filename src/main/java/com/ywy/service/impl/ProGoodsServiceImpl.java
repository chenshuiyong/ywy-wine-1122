package com.ywy.service.impl;

import com.github.pagehelper.PageHelper;
import com.ywy.domain.Constant;
import com.ywy.domain.ProGoods;
import com.ywy.exception.WorkException;
import com.ywy.mapper.ProGoodsMapper;
import com.ywy.service.ProGoodsService;
import com.ywy.service.ProGoodsService;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/** Created by Administrator on 2017/8/16. */
@Service(value = "proGoodsService")
public class ProGoodsServiceImpl implements ProGoodsService {

  @Autowired private ProGoodsMapper proGoodsMapper; // 这里会报错，但是并不会影响


  @Override
  public int deleteByPrimaryKey(Integer goodsId) {
    return proGoodsMapper.deleteByPrimaryKey(goodsId);
  }

  @Override
  public int insert(ProGoods record) {
    record.setCategoryType(Byte.valueOf("1"));
    return proGoodsMapper.insert(record);
  }

  @Override
  public ProGoods selectByPrimaryKey(Integer goodsId) {
    return proGoodsMapper.selectByPrimaryKey(goodsId);
  }

  @Override
  public ProGoods selectByGoodsName(String goodsName) {
    return proGoodsMapper.selectByGoodsName(goodsName);
  }

  @Override
  public int updateByPrimaryKey(ProGoods record) {
    return proGoodsMapper.updateByPrimaryKey(record);
  }

  @Override
  public List<ProGoods> selectAllGoods(int pageNum, int pageSize) {
    PageHelper.startPage(pageNum, pageSize);
    return proGoodsMapper.selectAllGoods();
  }
}
