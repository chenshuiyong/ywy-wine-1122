package com.ywy.service.impl;

import com.github.pagehelper.PageHelper;
import com.ywy.domain.Constant;
import com.ywy.domain.OrdRec;
import com.ywy.domain.UsrCustomer;
import com.ywy.exception.WorkException;
import com.ywy.mapper.OrdRecMapper;
import com.ywy.mapper.UsrCustomerMapper;
import com.ywy.service.OrdRecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/** Created by Administrator on 2017/8/16. */
@Service(value = "recService")
public class OrdRecServiceImpl implements OrdRecService {

  @Autowired private OrdRecMapper recMapper; // 这里会报错，但是并不会影响
  @Autowired private UsrCustomerMapper usrCustomerMapper; // 这里会报错，但是并不会影响

  /**
   * 新增
   * @param rec
   */
  @Override
  public void add(OrdRec rec) throws WorkException {
    rec.setIsDelete(Constant.DEFULT_YES);
    rec.setState(OrdRec.REC_STATE_RECIVICE);
    recMapper.insert(rec);
    // 判断是否已经存在该客户，不存在再插入
    UsrCustomer customer = usrCustomerMapper.selectByCustomerPhone(rec.getBeRecPhone());
    if (customer == null){
      customer = new UsrCustomer();
      customer.setContacts(rec.getBeRecName());
      customer.setCustomerName(rec.getBeRecName());
      customer.setCustomerPhone(rec.getBeRecPhone());
      customer.setRecPhone(rec.getRecPhone());
      usrCustomerMapper.insert(customer);
    }
  }

  /**
   * 查找全部
   * @param pageNum
   * @param pageSize
   * @return
   */
  @Override
  public List<OrdRec> findAll(int pageNum, int pageSize) {
    PageHelper.startPage(pageNum, pageSize);
    return recMapper.selectAll();
  }
}
