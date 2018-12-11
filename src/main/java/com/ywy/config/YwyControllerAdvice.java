
package com.ywy.config;

import com.ywy.exception.WorkException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
/**
 * @controller 业务拦截
 * @time： @Discription：
 */
@ControllerAdvice
public class YwyControllerAdvice {

    private static final Logger LOG = LoggerFactory.getLogger(YwyControllerAdvice.class);
  /**
   * 全局异常捕捉处理
   *
   * @param ex
   * @return
   */
  @ResponseBody
  @ExceptionHandler(value = Exception.class)
  public ModelAndView errorHandler(Exception ex) {
      ModelAndView modelAndView = new ModelAndView();
      modelAndView.setViewName("/common/404");
      modelAndView.addObject("code", 100);
      String msg = ex.getMessage();
      if (StringUtils.isBlank(msg)){
          msg = ex.getCause().getMessage();
      }
      modelAndView.addObject("msg", ex.getCause().getMessage());
      LOG.error("系统出错",ex);
      return modelAndView;
  }

  /**
   * 拦截捕捉自定义异常 WorkException.class
   *
   * @param ex
   * @return
   */
  @ResponseBody
  @ExceptionHandler(value = WorkException.class)
  public ModelAndView myErrorHandler(WorkException ex) {
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.setViewName("/common/404");
    modelAndView.addObject("code", ex.getCode());
    modelAndView.addObject("msg", ex.getMsg());
    LOG.error("业务异常",ex.getMsg());
    return modelAndView;
  }
}