package com.ywy.controller;

import com.ywy.domain.Constant;
import com.ywy.domain.Message;
import com.ywy.domain.UsrUser;
import com.ywy.exception.WorkException;
import com.ywy.service.UsrUserService;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/** Created by Administrator on 2017/8/16. */
@Controller
@RequestMapping(value = "/")
public class IndexController {

  /** 日志 */
  private static final Logger LOG = LoggerFactory.getLogger(IndexController.class);

  @Autowired private UsrUserService userService;


  @RequestMapping(value = "/register")
  public String register(HttpServletRequest request, Model model) {
    UsrUser user = (UsrUser) request.getSession().getAttribute(Constant.USER_BY_USERNAME);
    model.addAttribute("user", user);
    if (user == null){
      return "/user/user_register";
    }else{
      return "/user/index";
    }
  }

  @RequestMapping(value = "/more")
  public String more(HttpServletRequest request, Model model) {
    UsrUser user = (UsrUser) request.getSession().getAttribute(Constant.USER_BY_USERNAME);
    model.addAttribute("user", user);
    if (user == null){
      return "/user/user_login";
    }else{
      return "/user/more";
    }
  }

  @RequestMapping(value = "/login")
  public String login(HttpServletRequest request, Model model) {
    UsrUser user = (UsrUser) request.getSession().getAttribute(Constant.USER_BY_USERNAME);
    model.addAttribute("user", user);
    if (user == null){
      return "/user/user_login";
    }else{
      return "/user/index";
    }
  }
  /**
   * @return Message
   * @description 商户自助录积分
   */
  @RequestMapping("/regisgerInfo")
  @ResponseBody
  public Message regisgerInfo(HttpServletRequest request, UsrUser user) {
    try {
      userService.regisgerInfo(request,user);
      return Message.success("注册成功");
    } catch (WorkException e) {
      return Message.failure(e.getMessage());
    } catch (Exception e) {
      return Message.exception();
    }
  }

  /**
   * @description 登录认证
   * @param request 请求
   * @param userName 用户名
   * @return 消息
   * @throws WorkException 业务异常
   */
  @RequestMapping("/doLogin")
  @ResponseBody
  public Message doLogin(
          HttpServletRequest request,  String userName, String password) throws WorkException {
    boolean success = true;
    String resp = "登录成功";
    try {
      password = new Md5Hash(password).toString();
      LOG.info("登录用户名：" + userName);
      UsrUser user = userService.selectByUserName(userName);
      if (user == null || !password.equals(user.getPassword())) {
        throw new WorkException("用户名或密码错误");
      }
      request.getSession().setAttribute(Constant.USER_BY_USERNAME, user);
      request.getSession().setAttribute(Constant.USERNAME_SESSION, userName);
    } catch (WorkException e) {
      success = false;
      resp = "登录失败：" + e.getMessage();
      LOG.error(resp, e);
    } catch (Exception e) {
      success = false;
      resp = "系统错误：" + e.getMessage();
      LOG.error(resp, e);
    }
    return success ? Message.success(resp) : Message.failure(resp);
  }

  @RequestMapping(value = "/index")
  public String idnex(HttpServletRequest request, Model model) {
    //  会员信息
    UsrUser user = (UsrUser) request.getSession().getAttribute(Constant.USER_BY_USERNAME);
    model.addAttribute("user", user);
    if (user == null){
      return "/user/user_login";
    }else{
      return "/user/index";
    }
  }

}
