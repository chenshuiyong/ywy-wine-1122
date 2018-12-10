package com.ywy.controller;

import com.ywy.domain.Constant;
import com.ywy.domain.Message;
import com.ywy.domain.OrdRec;
import com.ywy.domain.UsrUser;
import com.ywy.exception.WorkException;
import com.ywy.service.OrdRecService;
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
import java.util.List;

/**
 * Created by Administrator on 2017/8/16.
 */
@Controller
@RequestMapping(value = "/")
public class IndexController {

    /**
     * 日志
     */
    private static final Logger LOG = LoggerFactory.getLogger(IndexController.class);

    @Autowired
    private UsrUserService userService;
    @Autowired
    private OrdRecService ordRecService;

  @RequestMapping(value = "/registerAdminer")
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
        return "/user/more";
    }

    @RequestMapping(value = "/login")
    public String login(HttpServletRequest request, Model model) {
        UsrUser user = (UsrUser) request.getSession().getAttribute(Constant.USER_BY_USERNAME);
        model.addAttribute("user", user);
        if (user == null) {
            return "/user/user_login";
        } else {
            return "redirect:/index";
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
            userService.regisgerInfo(request, user);
            return Message.success("注册成功");
        } catch (WorkException e) {
            return Message.failure(e.getMessage());
        } catch (Exception e) {
            return Message.exception();
        }
    }

    /**
     * @param request  请求
     * @param userName 用户名
     * @return 消息
     * @throws WorkException 业务异常
     * @description 登录认证
     */
    @RequestMapping("/doLogin")
    @ResponseBody
    public Message doLogin(
            HttpServletRequest request, String userName, String password) throws WorkException {
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
        try {
            OrdRec record = new OrdRec();
            record.setIsToday(Constant.DEFULT_YES);
            List<OrdRec> list = ordRecService.findAll(1, 10000, record);
            Integer todayCount = 0;
            if (list != null && !list.isEmpty()) {
                todayCount = list.size();
            }
            model.addAttribute("todayCount", todayCount);
            model.addAttribute("user", user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "/user/index";
    }

    /**
     * 退出登录
     *
     * @return
     */
    @RequestMapping("/logout")
    public String logout(HttpServletRequest request) {
        // 移除session
        request.getSession().removeAttribute(Constant.USER_BY_USERNAME);
        request.getSession().removeAttribute(Constant.USERNAME_SESSION);
        return "redirect:/login";
    }

    /**
     * 推荐列表
     *
     * @param request
     * @param model
     * @return
     */
    @RequestMapping(value = "/recList")
    public String recList(HttpServletRequest request, Model model, OrdRec record) {
        List<OrdRec> list = ordRecService.findAll(1, 10000, record);
        model.addAttribute("list", list);
        model.addAttribute("state", record.getState());
        String stateStr = "全部推荐";
        if (record.getState() != null){
            switch(record.getState()){
                case 1:
                    stateStr = "收到推荐";
                    break;
                case 2:
                    stateStr = "跟进中";
                    break;
                case 3:
                    stateStr = "已合作未付款";
                    break;
                case 4:
                    stateStr = "推荐成功";
                    break;
            }
        }
        model.addAttribute("stateStr", stateStr);
        return "/user/rec_list";
    }
}
