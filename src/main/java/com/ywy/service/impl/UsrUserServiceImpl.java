package com.ywy.service.impl;

import com.github.pagehelper.PageHelper;
import com.ywy.domain.Constant;
import com.ywy.domain.UsrUser;
import com.ywy.exception.WorkException;
import com.ywy.mapper.UsrUserMapper;
import com.ywy.service.UsrUserService;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/** Created by Administrator on 2017/8/16. */
@Service(value = "userService")
public class UsrUserServiceImpl implements UsrUserService {

  @Autowired private UsrUserMapper userMapper; // 这里会报错，但是并不会影响

  @Override
  public int addUser(UsrUser user) {

    return userMapper.insertSelective(user);
  }

  @Override
  public List<UsrUser> findAllUser(int pageNum, int pageSize) {
    PageHelper.startPage(pageNum, pageSize);
    return userMapper.selectAllUser();
  }

  @Override
  public UsrUser selectByUserName(String userName) {
    return userMapper.selectByUserName(userName);
  }

  @Override
  public void regisgerInfo(HttpServletRequest request,UsrUser user) throws WorkException {
    UsrUser oldUser = userMapper.selectByUserName(user.getUserName());
    if (oldUser != null) {
      throw new WorkException("该用户名已存在");
    }
    String password = new Md5Hash(user.getPassword()).toString();
    user.setPassword(password);
    userMapper.insertSelective(user);
    request.getSession().setAttribute(Constant.USER_BY_USERNAME, user);
    request.getSession().setAttribute(Constant.USERNAME_SESSION, user.getUserName());
  }
}
