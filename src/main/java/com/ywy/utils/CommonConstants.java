package com.ywy.utils;

import com.ywy.config.CommonConfig;

/**
 * Created by shijsh on 2018/7/11.
 */
public class CommonConstants {

    public static final String SESSION_USER_INFO = "userInfo";
    public static final String CURR_WEIXIN_ID = "currWeixinId";

    public static final String MSG = "msg";
    public static final String SUCCESS = "success";
    public static final String DATA = "data";
    public static final String RETURN_URL="returnUrl";
    public static final String RETURN_URL_TEXT = "returnUrlText";

    public static final String ACCESS_TOKEN = "accessToken";
    public static final String JSAPI_TICKET = "jsapi_ticket";
    public static final String WEIXIN_APPID = "weixin_appId";
    public static final String WEIXIN_APPSECRET= "weixin_appsecret";
    public static final String USER_ACCESS_TOKEN = "userAccessToken";

    public static final String REFRESH_SESSION = "refreshSession";

    public static final String DIAMOND_CARD_ID = "0edf899f-1770-489e-9355-979a7dca4250"; //钻石卡
    public static final String GOLD_DIAMOND_CARD_ID="29e88330-74ba-403b-9b97-cafbf38a62cf"; //金钻卡

    public static final String WEIXIN_AUTH_URL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_base&state=123#wechat_redirect";

    public static final String WEIXIN_TOKEN_URL ="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";

    public static final String WEIXIN_JSAPI_TICKET_URL = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=%s" ;

    public static final String WEIXIN_ACCESS_TOKEN_URL =  "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code";

    public static final String WEIXIN_GET_USERINFO_URL = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=%s&openid=%s&lang=zh_CN";


    public static  <T>  T getValue(String key,Class<T> clazz){
        CommonConfig commonConfig = SpringContextUtils.getBean(CommonConfig.class);
        return (T) commonConfig.getConfigs().get(key);
    }
}
