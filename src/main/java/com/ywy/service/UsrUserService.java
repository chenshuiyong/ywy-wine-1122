package com.ywy.service;


import com.ywy.domain.UsrUser;
import com.ywy.exception.WorkException;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface UsrUserService {

    public int addUser(UsrUser user) ;

    public List<UsrUser> findAllUser(int pageNum, int pageSize) ;
    UsrUser selectByUserName(String userName);
    void  regisgerInfo(HttpServletRequest request,UsrUser user) throws WorkException;
}
