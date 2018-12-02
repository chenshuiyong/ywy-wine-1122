package com.ywy.service;


import com.ywy.domain.OrdRec;
import com.ywy.exception.WorkException;

import java.util.List;

public interface OrdRecService {

     void add(OrdRec rec) throws WorkException;
     void update(OrdRec rec) throws WorkException;
     void updateByPrimaryKeySelective(OrdRec rec) throws WorkException;
    OrdRec selectByPrimaryKey(Integer recId);
     List<OrdRec> findAll(int pageNum, int pageSize,OrdRec record) ;

    void updatePhone(String oldPhone,String customerPhone);
}
