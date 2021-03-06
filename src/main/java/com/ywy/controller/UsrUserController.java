package com.ywy.controller;

import com.ywy.domain.UsrUser;
import com.ywy.service.UsrUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/** Created by Administrator on 2017/8/16. */
@Controller
@RequestMapping(value = "/user")
public class UsrUserController {
  /** 日志 */
  private static final Logger LOG = LoggerFactory.getLogger(UsrUserController.class);

  @Autowired private UsrUserService userService;

  @ResponseBody
  @RequestMapping(
      value = "/add",
      produces = {"application/json;charset=UTF-8"})
  public int addUser(UsrUser user) {
    return userService.addUser(user);
  }

  @ResponseBody
  @RequestMapping(
      value = "/all/{pageNum}/{pageSize}",
      produces = {"application/json;charset=UTF-8"})
  public Object findAllUser(
      @PathVariable("pageNum") int pageNum, @PathVariable("pageSize") int pageSize) {

    return userService.findAllUser(pageNum, pageSize);
  }

}
