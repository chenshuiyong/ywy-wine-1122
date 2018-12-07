package com.ywy.domain.sms.httpApiDemo;

import com.ywy.config.sms.Config;
import com.ywy.config.sms.HttpUtil;
import com.ywy.exception.WorkException;

import java.net.URLEncoder;


/**
 * 验证码通知短信接口
 * 
 * @ClassName: IndustrySMS
 * @Description: 验证码通知短信接口
 *
 */
public class IndustrySMS
{
	private static String operation = "/industrySMS/sendSMS";

	private static String accountSid = Config.ACCOUNT_SID;

	/**
	 * 验证码通知短信
	 */
	public static void execute(String phone, String smsContent) throws WorkException
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
	//     String result = HttpUtil.post(url, body);
		String result = "00000";
		System.out.println("result:" + System.lineSeparator() + result);
	    if (!result.contains("00000")){
	    	throw new WorkException("发送失败");
		}
	}
}
