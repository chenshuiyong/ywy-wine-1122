package com.ywy.controller;

import com.ywy.domain.Message;
import com.ywy.domain.OrdRec;
import com.ywy.domain.UsrCustomer;
import com.ywy.exception.WorkException;
import com.ywy.service.OrdRecService;
import com.ywy.service.UsrCustomerService;
import com.ywy.service.UsrUserService;
import com.ywy.utils.VateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/** 推荐 */
@Controller
@RequestMapping(value = "/rec")
public class OrdRecController {
  @Autowired
  private OrdRecService ordRecService;
  private UsrCustomerService usrCustomerService;


  /** 日志 */
  private static final Logger LOG = LoggerFactory.getLogger(OrdRecController.class);

  @Autowired private UsrUserService userService;

  @RequestMapping(value = "/recommend")
  public String register(HttpServletRequest request, Model model) {
    return "/recommend/want_recommend";
  }

  @RequestMapping(value = "/list")
  public String more(HttpServletRequest request, Model model) {
    return "/recommend/recommend_list";
  }

  @RequestMapping(value = "/myInfo")
  public String login(HttpServletRequest request, Model model) {
    return "/recommend/my_info";
  }

  /**
   * 新增
   *
   * @param request
   * @return
   */
  @ResponseBody
  @RequestMapping(
      value = "/add",
      produces = {"application/json;charset=UTF-8"})
  public Message add(HttpServletRequest request, OrdRec rec) {
    try {
      if (!VateUtils.isPhoneValid(rec.getBeRecPhone())){
        return Message.failure("您要推荐的联系人电话格式错误");
      }
      if (!VateUtils.isPhoneValid(rec.getRecPhone())){
        return Message.failure("您的联系电话格式错误");
      }
      String msg= "成功";
      Integer code = Message.CODE_SUCCESS;
      UsrCustomer customer = usrCustomerService.selectByCustomerPhone(rec.getBeRecPhone());
      if (customer != null){
        code = Message.CODE_FAILURE;
        msg = "您推荐的手机号为："+rec.getBeRecPhone()+"的联系人已经被推荐过了，或者是我们的客户。不能重复推荐！";
      }
      ordRecService.add(rec);
      return Message.message(code,msg);
    } catch (WorkException e) {
      return Message.failure(e.getMessage());
    } catch (Exception e) {
      return Message.exception();
    }
  }
}
