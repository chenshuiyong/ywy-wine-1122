package com.ywy.service;


import com.ywy.domain.UsrCustomer;

import java.util.List;

public interface UsrCustomerService {

    public int add(UsrCustomer customer) ;

    UsrCustomer selectByCustomerPhone(String customerPhone);

    public List<UsrCustomer> findAll(int pageNum, int pageSize) ;

}
