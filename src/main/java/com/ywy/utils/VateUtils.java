package com.ywy.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class VateUtils {

	public static boolean isPhoneValid(String phone)
	{
		boolean isPhoneValid=true;
		//校验手机号是否合法
		Pattern p = Pattern.compile("^((13[0-9])|(14[57])|(15[^4,\\D])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\\d{8}$");
		Matcher m = p.matcher(phone);
		if (!m.matches())
		{
			isPhoneValid=false;
		}
		return isPhoneValid;
	}
}
