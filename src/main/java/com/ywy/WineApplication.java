package com.ywy;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@MapperScan("com.ywy.mapper")//将项目中对应的mapper类的路径加进来就可以了
public class WineApplication {

    public static void main(String[] args) {
        SpringApplication.run(WineApplication.class, args);
    }
    @Bean
    public EmbeddedServletContainerCustomizer containerCustomizer(){
        return container -> {
               container.setSessionTimeout(72000);/*单位为S*/
         };
    }
}