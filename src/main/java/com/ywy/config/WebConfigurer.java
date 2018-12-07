package com.ywy.config;

import com.ywy.config.intercepors.LoginInterceptor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by shijsh on 2018/6/5.
 */
@Configuration
public class WebConfigurer extends WebMvcConfigurerAdapter {

    @Value("${common.security.includeUrl}")
    private String includeUrl;
    @Value("${common.security.excludeUrl}")
    private String excludeUrl;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry =  this.addInterceptor(registry,includeUrl,excludeUrl,new LoginInterceptor());

        super.addInterceptors(registry);
    }


    /***
     * <p>增加拦截器</p>
     * @param registry
     * @param includeUrl
     * @param excludeUrl
     * @return
     */
    private  InterceptorRegistry addInterceptor(InterceptorRegistry registry, String includeUrl, String excludeUrl, HandlerInterceptor interceptor) {
        boolean hasWxIncludeUrl = StringUtils.isNotBlank(includeUrl);
        boolean hasWxExcludeUrl = StringUtils.isNotBlank(excludeUrl);
        if (hasWxIncludeUrl || hasWxIncludeUrl) {
            InterceptorRegistration wxRegistry = registry.addInterceptor(
                    interceptor
            );

            if (hasWxIncludeUrl) {
                String[] arr = StringUtils.split(includeUrl, ",");
                wxRegistry.addPathPatterns(arr);
            }

            if (hasWxExcludeUrl) {
                String[] arr = StringUtils.split(excludeUrl, ",");
                wxRegistry.excludePathPatterns(arr);
            }
        }

        return registry;
    }
}
