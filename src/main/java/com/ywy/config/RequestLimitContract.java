
package com.ywy.config;

import com.ywy.exception.WorkException;
import com.ywy.mapper.UsrBlackListMapper;
import com.ywy.utils.DateUtils;
import com.ywy.utils.IpAdrressUtil;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * @author Administrator
 * @time：
 * @Discription：
 */
@Aspect
@Component
public class RequestLimitContract {
    private static final Logger logger = LoggerFactory.getLogger("requestLimitLogger");
    private Map<String , Integer> redisTemplate = new HashMap<>();
    private Map<String , String> redisTemplateStr = new HashMap<>();
    @Autowired
    private UsrBlackListMapper blackListMapper;

    @Before("within(@org.springframework.stereotype.Controller *) && @annotation(limit)")
    public void requestLimit(final JoinPoint joinPoint , RequestLimit limit) throws WorkException {
        try {
            Object[] args = joinPoint.getArgs();
            HttpServletRequest request = null;
            for (int i = 0; i < args.length; i++) {
                if (args[i] instanceof HttpServletRequest) {
                    request = (HttpServletRequest) args[i];
                    break;
                }
            }
            if (request == null) {
                throw new WorkException("方法中缺失HttpServletRequest参数");
            }
            String ip = IpAdrressUtil.getIpAdrress(request);
            System.out.println("ip:"+ip);
            String url = request.getRequestURL().toString();
            // 被锁时间
            String lock_key = "lock_req_limit_".concat(url).concat(ip);
            if (StringUtils.isNotBlank(redisTemplateStr.get(lock_key))) {
                Date lockTime = DateUtils.toDate(redisTemplateStr.get(lock_key),DateUtils.datePattern_hhmmss);
                Calendar nowTime = Calendar.getInstance();
                nowTime.add(Calendar.MINUTE, -30);//30分钟前的时间
                if (lockTime.after(nowTime.getTime())){
                    long time = 30*60*1000;//30分钟
                    Date afterDate = new Date(lockTime.getTime() + time);//30分钟后的时间
                    throw new WorkException("IP[" + ip + "]的用户，疑似存在恶意访问行为，限制访问30分钟,请于"+DateUtils.formatterDate(afterDate,DateUtils.datePattern_hhmmss)+"后再访问");
                }
            }
            String key = "req_limit_".concat(url).concat(ip);
            if (redisTemplate.get(key) == null || redisTemplate.get(key) == 0) {
                redisTemplate.put(key, 1);
            } else {
                redisTemplate.put(key, redisTemplate.get(key) + 1);
            }
            int count = redisTemplate.get(key);
            if (count > 0) {
                //创建一个定时器
                Timer timer = new Timer();
                TimerTask timerTask = new TimerTask() {
                    @Override
                    public void run() {
                        redisTemplate.remove(key);
                    }
                };
                //这个定时器设定在time规定的时间之后会执行上面的remove方法，也就是说在这个时间后它可以重新访问
                timer.schedule(timerTask, limit.time());
            }
            if (count > limit.count()) {
                redisTemplateStr.put(lock_key, DateUtils.formatterDate(new Date(),DateUtils.datePattern_hhmmss));
                logger.info(DateUtils.formatterDate(new Date(),DateUtils.datePattern_hhmmss));
                long time = 30*60*1000;//30分钟
                Date afterDate = new Date(new Date().getTime() + time);//30分钟后的时间
/*              UsrBlackList blackList = new UsrBlackList();
                blackList.setIp(ip);
                blackList.setIpTime(new Date());
                blackListMapper.insertSelective(blackList);*/
               // logger.info("用户IP[" + ip + "]访问地址[" + url + "]超过了限定的次数[" + limit.count() + "]");
                throw new WorkException("IP[" + ip + "]的用户，疑似存在恶意访问行为，限制访问30分钟请于"+DateUtils.formatterDate(afterDate,DateUtils.datePattern_hhmmss)+"后再访问");
            }
        }catch (WorkException e){
            logger.error("业务异常",e);
            throw e;
        }catch (Exception e){
            logger.error("发生异常",e);
        }
    }
}