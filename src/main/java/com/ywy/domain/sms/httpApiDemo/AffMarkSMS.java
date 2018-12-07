package com.ywy.domain.sms.httpApiDemo;

import com.ywy.config.sms.Config;
import com.ywy.config.sms.HttpUtil;
import java.net.URLEncoder;

/**
 * 会员营销短信接口
 * 
 * @ClassName: AffMarkSMS
 * @Description: 会员营销短信接口
 *
 */
public class AffMarkSMS
{
	private static String operation = "/affMarkSMS/sendSMS";

	private static String accountSid = Config.ACCOUNT_SID;

	/**
	 * 会员营销短信
	 */
	public static void execute(String phone, String smsContent)
	{
		String tmpSmsContent = null;
	    try{
	      tmpSmsContent = URLEncoder.encode(smsContent, "UTF-8");
	    }catch(Exception e){
	      
	    }
	    String url = Config.BASE_URL + operation;
	    String body = "accountSid=" + accountSid + "&to=" + phone + "&smsContent=" + tmpSmsContent
	        + HttpUtil.createCommonParam();

	    // 提交请求
	    String result = HttpUtil.post(url, body);
	    System.out.println("result:" + System.lineSeparator() + result);
	}
}
