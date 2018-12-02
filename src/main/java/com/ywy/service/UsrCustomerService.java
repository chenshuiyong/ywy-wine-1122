package com.ywy.service;


import com.ywy.domain.OrdRec;
import com.ywy.domain.UsrCustomer;
import com.ywy.exception.WorkException;

import java.util.List;

public interface UsrCustomerService {


    public int add(UsrCustomer customer) ;

    UsrCustomer selectByCustomerPhone(String customerPhone);

    public List<UsrCustomer> findAll(int pageNum, int pageSize) ;
    int insertSelective(UsrCustomer record);


    int updateByPrimaryKeySelective(UsrCustomer record) throws WorkException;
    UsrCustomer doLogin(String phone);
}
