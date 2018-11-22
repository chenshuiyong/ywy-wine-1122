package com.ywy.mapper;

import com.ywy.domain.UsrUser;

import java.util.List;

public interface UsrUserMapper {
  int deleteByPrimaryKey(Integer userId);

  int insert(UsrUser record);

  int insertSelective(UsrUser record);

  UsrUser selectByPrimaryKey(Integer userId);

  UsrUser selectByUserName(String userName);

  int updateByPrimaryKeySelective(UsrUser record);

  int updateByPrimaryKey(UsrUser record);

  // 这个方式我自己加的
  List<UsrUser> selectAllUser();
}
