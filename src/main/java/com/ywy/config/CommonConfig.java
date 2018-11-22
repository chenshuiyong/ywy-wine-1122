/*
 * Copyright (c) 2018. by  Cndrealty Corporation.All rights reserved.
 * This software is the confidential and proprietary information of
 * Cndrealty Communicate Corporation.
 * You shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with Cndrealty.
 */

package com.ywy.config;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * <pre><b><font color="blue"> com.cndrealty.config.CommonConfig.java </font></b></pre>
 *
 * <pre><b>description:</b><br>
 *
 * </pre>
 *
 * @author shijsh
 * @since 1.0
 */

@Component
@ConfigurationProperties(prefix = "common")
public class CommonConfig {


   private  Map<String,Object> configs = new HashMap<>();

    public Map<String, Object> getConfigs() {
        return configs;
    }

    public void setConfigs(Map<String, Object> configs) {
        this.configs = configs;
    }
}

    
