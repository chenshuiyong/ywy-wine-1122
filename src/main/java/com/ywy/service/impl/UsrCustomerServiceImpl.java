package com.ywy.service.impl;

import com.ywy.domain.UsrCustomer;
import com.ywy.exception.WorkException;
import com.ywy.mapper.UsrCustomerMapper;
import com.ywy.service.UsrCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/** Created by Administrator on 2017/8/16. */
@Service(value = "customerService")
public class UsrCustomerServiceImpl implements UsrCustomerService {

  @Autowired private UsrCustomerMapper customerMapper;


  @Override
  public int add(UsrCustomer customer) {
    return 0;
  }

  @Override
  public UsrCustomer selectByCustomerPhone(String customerPhone) {
    return customerMapper.selectByCustomerPhone(customerPhone);
  }

  @Override
  public List<UsrCustomer> findAll(int pageNum, int pageSize) {
    return null;
  }

  @Override
  public int insertSelective(UsrCustomer record) {
    return customerMapper.insertSelective(record);
  }

  @Override
  public int updateByPrimaryKeySelective(UsrCustomer record) throws WorkException
  {
    if (record.getCustomerId() == null){
      throw  new WorkException("id不能为空");
    }
    return customerMapper.updateByPrimaryKeySelective(record);
  }

  /**
   * 会员登录注册
   * @param phone
   * @return
   */
  @Override
  public UsrCustomer doLogin(String phone) {
    UsrCustomer customer = customerMapper.selectByCustomerPhone(phone);
    if (customer != null ){
      return  customer;
    }
    customer = new UsrCustomer();
    customer.setCustomerPhone(phone);
    customerMapper.insert(customer);
    customer = customerMapper.selectByCustomerPhone(phone);
    return customer;
  }
}
