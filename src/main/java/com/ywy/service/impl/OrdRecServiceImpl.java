package com.ywy.service.impl;

import com.github.pagehelper.PageHelper;
import com.ywy.domain.Constant;
import com.ywy.domain.OrdRec;
import com.ywy.domain.UsrCustomer;
import com.ywy.domain.sms.httpApiDemo.IndustrySMS;
import com.ywy.exception.WorkException;
import com.ywy.mapper.OrdRecMapper;
import com.ywy.mapper.UsrCustomerMapper;
import com.ywy.service.OrdRecService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

/** Created by Administrator on 2017/8/16. */
@Service(value = "recService")
public class OrdRecServiceImpl implements OrdRecService {

  @Autowired private OrdRecMapper recMapper; // 这里会报错，但是并不会影响
  @Autowired private UsrCustomerMapper usrCustomerMapper; // 这里会报错，但是并不会影响
  @Value("${mangerMobile}")
  private String mangerMobile;
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
    UsrCustomer recCustomer = usrCustomerMapper.selectByCustomerPhone(rec.getRecPhone());
    if (recCustomer == null){
      customer = new UsrCustomer();
      customer.setCustomerPhone(rec.getRecPhone());
      usrCustomerMapper.insert(customer);
    }
    this.sendMessage();
  }

  /**
   * 有新增推荐，通知业务员
   */
  private void sendMessage() throws WorkException {
    String smsContent = "【钇旺亿财务】尊敬的用户，您的验证码为000000";
    System.out.println(smsContent);
    String[] mobiles = StringUtils.split(mangerMobile, ",");
    for(String mobile: mobiles){
      IndustrySMS.execute(mobile, smsContent);
    }

  }

  @Override
  public void update(OrdRec rec) throws WorkException {
    recMapper.updateByPrimaryKey(rec);
  }

  @Override
  public void updateByPrimaryKeySelective(OrdRec rec) throws WorkException {
    recMapper.updateByPrimaryKeySelective(rec);
  }

  @Override
  public OrdRec selectByPrimaryKey(Integer recId) {
    return  recMapper.selectByPrimaryKey(recId);
  }

  /**
   * 查找全部
   * @param pageNum
   * @param pageSize
   * @return
   */
  @Override
  public List<OrdRec> findAll(int pageNum, int pageSize,OrdRec record) {
    PageHelper.startPage(pageNum, pageSize);
    return recMapper.selectAll(record);
  }

  @Override
  public void updatePhone(String oldPhone,String customerPhone) {
    // 修改推荐人手机
    OrdRec record = new OrdRec();
    record.setRecPhone(oldPhone);
    List<OrdRec> recs =  recMapper.selectAll(record);
    if (recs !=null && !recs.isEmpty()){
      for (OrdRec rec: recs) {
        rec.setRecPhone(customerPhone);
        recMapper.updateByPrimaryKey(rec);
      }
    }
    UsrCustomer customer = new UsrCustomer();
    customer.setRecPhone(oldPhone);
    List<UsrCustomer> usrCustomers =  usrCustomerMapper.selectAll(customer);
    if (usrCustomers !=null && !usrCustomers.isEmpty()){
      for (UsrCustomer usrCustomer: usrCustomers) {
        usrCustomer.setRecPhone(customerPhone);
        usrCustomerMapper.updateByPrimaryKey(usrCustomer);
      }
    }
  }
}
