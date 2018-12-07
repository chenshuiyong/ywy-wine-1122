package com.ywy.config.intercepors;

import com.ywy.controller.IndexController;
import com.ywy.domain.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 登录验证拦截
 *
 */
@Controller
@Component
public class LoginInterceptor extends HandlerInterceptorAdapter {

    private static final Logger LOG = LoggerFactory.getLogger(IndexController.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String basePath = request.getContextPath();
        String path = request.getRequestURI();
        LOG.info("进入是否登录拦截，请求的uri:"+path);
        //判断是否已有该用户登录的session
        if(request.getSession().getAttribute(Constant.USER_BY_USERNAME) !=null){
            return  true;
        }
        //跳转到登录页
        response.sendRedirect("/login");
        return true;
    }


}