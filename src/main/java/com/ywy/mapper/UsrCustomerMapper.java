package com.ywy.mapper;

import com.ywy.domain.UsrCustomer;

import java.util.List;

public interface UsrCustomerMapper {
  int deleteByPrimaryKey(Integer userId);

  int insert(UsrCustomer record);

  UsrCustomer selectByPrimaryKey(Integer userId);

  UsrCustomer selectByCustomerPhone(String customerPhone);

  int updateByPrimaryKey(UsrCustomer record);
  int insertSelective(UsrCustomer record);


  int updateByPrimaryKeySelective(UsrCustomer record);
  // 这个方式我自己加的
  List<UsrCustomer> selectAll(UsrCustomer record);
}
