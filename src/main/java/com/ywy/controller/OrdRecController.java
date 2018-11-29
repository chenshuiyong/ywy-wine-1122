package com.ywy.controller;

import com.ywy.domain.Constant;
import com.ywy.domain.Message;
import com.ywy.domain.OrdRec;
import com.ywy.domain.UsrCustomer;
import com.ywy.domain.sms.httpApiDemo.IndustrySMS;
import com.ywy.exception.WorkException;
import com.ywy.service.OrdRecService;
import com.ywy.service.UsrCustomerService;
import com.ywy.utils.RandomStringUtils;
import com.ywy.utils.VateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

/** 推荐 */
@Controller
@RequestMapping(value = "/rec")
public class OrdRecController {
  @Autowired private OrdRecService ordRecService;
  @Autowired private UsrCustomerService usrCustomerService;

  /** 日志 */
  private static final Logger LOG = LoggerFactory.getLogger(OrdRecController.class);

  /**
   * 去登录页
   *
   * @param request
   * @param model
   * @param url
   * @return
   */
  @RequestMapping(value = "/login")
  public String login(HttpServletRequest request, Model model, String url) {
    Object phone = request.getSession().getAttribute(Constant.REC_BY_PHONE);
    model.addAttribute("phone", phone);
    model.addAttribute("url", url);
    if (phone == null) {
      return "/recommend/rec_login";
    } else {
      return "/recommend/want_recommend";
    }
  }
  /**
   * 发送校验短信
   *
   * @param phone
   * @return
   */
  @RequestMapping("/sendSms")
  @ResponseBody
  public Message sendSms(HttpServletRequest request, String phone) {
    try { // 校验手机号是否合法
      if (!VateUtils.isPhoneValid(phone)) {
        return Message.failure("请输入11位手机号码");
      }
      // 旧的验证码
      Object oldCode = request.getSession().getAttribute(Constant.LOGIN_VCODE);
      if (oldCode != null) {
        // 旧验证码的时间
        Date oldTime = (Date) request.getSession().getAttribute(Constant.LAST_VCODE_TIME);
        Long lTime = oldTime.getTime();
        Long nTime = new Date().getTime();
        if ((nTime - lTime) <= 120 * 1000) {
          return Message.failure("2分钟只能发送一次验证码");
        }
      }
      String code = RandomStringUtils.randomNumeric(6);
      String smsContent = "【钇旺亿财务】尊敬的用户，您的验证码为" + code;
      System.out.println(smsContent);
      IndustrySMS.execute(phone, smsContent);
      request.getSession().setAttribute(Constant.LOGIN_VCODE, code);
      request.getSession().setAttribute(Constant.LAST_VCODE_TIME, new Date());
      return Message.success("发送成功");
    } catch (WorkException e) {
      return Message.failure(e.getMessage());
    } catch (Exception e) {
      return Message.exception();
    }
  }

  /**
   * @description 登录认证
   * @param request 请求
   * @return 消息
   * @throws WorkException 业务异常
   */
  @RequestMapping("/doLogin")
  @ResponseBody
  public Message doLogin(HttpServletRequest request, String phone, String code, String url)
      throws WorkException {
    try {
      if (!VateUtils.isPhoneValid(phone)) {
        throw new WorkException("您的联系电话格式错误");
      }
      this.validateCode(request, phone, code);
      UsrCustomer customer = usrCustomerService.doLogin(phone);
      request.getSession().setAttribute(Constant.CUSTOMER_BY_PHONE, customer);
      request.getSession().setAttribute(Constant.REC_BY_PHONE, phone);
      return Message.success(url);
    } catch (WorkException e) {
      return Message.failure(e.getMessage());
    } catch (Exception e) {
      return Message.exception();
    }
  }

  /**
   * 验证码
   *
   * @param request
   * @param phone
   * @param code
   * @throws WorkException
   */
  private void validateCode(HttpServletRequest request, String phone, String code)
      throws WorkException {
    // 旧的验证码
    Object oldCode = request.getSession().getAttribute(Constant.LOGIN_VCODE);
    if (oldCode != null) {
      if (!oldCode.toString().equals(code)) {
        throw new WorkException("验证码错误");
      }
      Date oldTime = (Date) request.getSession().getAttribute(Constant.LAST_VCODE_TIME);
      Long lTime = oldTime.getTime();
      Long nTime = new Date().getTime();
      if ((nTime - lTime) >= 1200 * 1000) {
        throw new WorkException("验证码过期");
      }
    } else {
      throw new WorkException("请点击发送验证码");
    }
  }

  /**
   * 去推荐页面
   *
   * @param request
   * @param model
   * @return
   */
  @RequestMapping(value = "/recommend")
  public String register(HttpServletRequest request, Model model) {
    Object phone = request.getSession().getAttribute(Constant.REC_BY_PHONE);
    model.addAttribute("phone", phone);
    return "/recommend/want_recommend";
  }

  /**
   * 推荐列表
   *
   * @param request
   * @param model
   * @return
   */
  @RequestMapping(value = "/list")
  public String more(HttpServletRequest request, Model model) {
    Object phone = request.getSession().getAttribute(Constant.REC_BY_PHONE);
    if (phone == null) {
      model.addAttribute("url", "/rec/list");
      return "/recommend/rec_login";
    }
    OrdRec record = new OrdRec();
    record.setRecPhone(phone.toString());
    record.setIsDelete(Constant.DEFULT_YES);
    List<OrdRec> list = ordRecService.findAll(1, 1000, record);
    model.addAttribute("list", list);
    return "/recommend/recommend_list";
  }

  /**
   * 个人信息
   *
   * @param request
   * @param model
   * @return
   */
  @RequestMapping(value = "/myInfo")
  public String myInfo(HttpServletRequest request, Model model) {
    Object customer = request.getSession().getAttribute(Constant.CUSTOMER_BY_PHONE);
    if (customer == null) {
      model.addAttribute("url", "/rec/list");
      return "/recommend/rec_login";
    }
/*    UsrCustomer customer =
        (UsrCustomer) request.getSession().getAttribute(Constant.CUSTOMER_BY_PHONE);*/
    model.addAttribute("customer", customer);
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
      if (!VateUtils.isPhoneValid(rec.getBeRecPhone())) {
        throw new WorkException("您要推荐的联系人电话格式错误");
      }
      if (!VateUtils.isPhoneValid(rec.getRecPhone())) {
        throw new WorkException("您的联系电话格式错误");
      }
      this.validateCode(request, rec.getRecPhone(), rec.getCode());
      String msg = "成功";
      Integer code = Message.CODE_SUCCESS;
      UsrCustomer customer = usrCustomerService.selectByCustomerPhone(rec.getBeRecPhone());
      if (customer != null) {
        code = Message.CODE_FAILURE;
        msg = "您推荐的手机号为：" + rec.getBeRecPhone() + "的联系人已经被推荐过了，或者是我们的客户。不能重复推荐！";
      }
      ordRecService.add(rec);
      UsrCustomer recCustomer = usrCustomerService.selectByCustomerPhone(rec.getRecPhone());
      request.getSession().setAttribute(Constant.REC_BY_PHONE, rec.getRecPhone());
      request.getSession().setAttribute(Constant.CUSTOMER_BY_PHONE, recCustomer);
      return Message.message(code, msg);
    } catch (WorkException e) {
      return Message.failure(e.getMessage());
    } catch (Exception e) {
      return Message.exception();
    }
  }

  /**
   * 删除
   *
   * @param request
   * @return
   */
  @ResponseBody
  @RequestMapping(
      value = "/updateStateOrDelete",
      produces = {"application/json;charset=UTF-8"})
  public Message delete(HttpServletRequest request, OrdRec rec) {
    try {
        OrdRec ordRec = ordRecService.selectByPrimaryKey(rec.getRecId());
        if (rec.getIsDelete() !=null){
            ordRec.setIsDelete(rec.getIsDelete());
        }
        if (rec.getState()  !=null){
            ordRec.setState(rec.getState());
        }
        ordRecService.update(ordRec);
      return Message.success("删除成功！");
    } catch (WorkException e) {
      return Message.failure(e.getMessage());
    } catch (Exception e) {
      return Message.exception();
    }
  }
}
