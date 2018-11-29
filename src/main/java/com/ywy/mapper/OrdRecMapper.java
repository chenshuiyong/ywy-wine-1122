package com.ywy.mapper;

import com.ywy.domain.OrdRec;

import java.util.List;

public interface OrdRecMapper {
  int deleteByPrimaryKey(Integer userId);

  int insert(OrdRec record);

  OrdRec selectByPrimaryKey(Integer recId);

  int updateByPrimaryKey(OrdRec record);

  // 这个方式我自己加的
  List<OrdRec> selectAll(OrdRec record);
}
