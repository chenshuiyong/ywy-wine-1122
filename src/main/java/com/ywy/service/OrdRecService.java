package com.ywy.service;


import com.ywy.domain.OrdRec;
import com.ywy.exception.WorkException;

import java.util.List;

public interface OrdRecService {

    public void add(OrdRec rec) throws WorkException;
    public void update(OrdRec rec) throws WorkException;
    OrdRec selectByPrimaryKey(Integer recId);
    public List<OrdRec> findAll(int pageNum, int pageSize,OrdRec record) ;

}
