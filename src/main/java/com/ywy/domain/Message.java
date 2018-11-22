package com.ywy.domain;

import java.io.Serializable;

/**
 * @description 类描述：消息
 * @author 创建人：chensy
 * @date 修改时间：2016年3月14日 上午9:25:24
 * @description 修改备注：
 * @version 1.0.0
 */
public class Message  {

    /**
     * 成功的消息代码
     */
    public static final int CODE_SUCCESS = 1;

    /**
     * 失败的消息代码
     */
    public static final int CODE_FAILURE = 0;

    /**
     * 失败的消息代码
     */
    public static final int CODE_EXCETPION = 2;


    /**
     * 系统异常提示语
     */
    public static final String EXCEPTION_INFO = "系统异常: 请联系管理员！";

    /**
     * 操作成功提示语
     */
    public static final String SUCCESS_INFO = "成功";

    /**
     * 消息代码
     */
    private int code;

    /**
     * 消息
     */
    private String msg;

    /**
     * 消息携带的数据
     */
    private Object data;

    /**
     * @description 成功的消息
     * @param msg 消息
     * @return 消息
     */
    public static Message success(String msg) {
        Message success = new Message();
        success.setCode(CODE_SUCCESS);
        success.setMsg(msg);
        return success;
    }

    /**
     * @description 成功的消息
     * @return 消息
     */
    public static Message success() {
        Message success = new Message();
        success.setCode(CODE_SUCCESS);
        success.setMsg(SUCCESS_INFO);
        return success;
    }

    /**
     * @description 成功的消息
     * @param msg 消息
     * @param data 消息携带的数据
     * @return 消息
     */
    public static Message success(String msg, Object data) {
        Message success = new Message();
        success.setCode(CODE_SUCCESS);
        success.setMsg(msg);
        success.setData(data);
        return success;
    }

    /**
     * @description 成功的消息
     * @param data 消息携带的数据
     * @return 消息
     */
    public static Message success(Object data) {
        Message success = new Message();
        success.setCode(CODE_SUCCESS);
        success.setMsg(SUCCESS_INFO);
        success.setData(data);
        return success;
    }


    /**
     * @description 失败的消息
     * @param msg 消息
     * @return 消息
     */
    public static Message failure(String msg) {
        Message success = new Message();
        success.setCode(CODE_FAILURE);
        success.setMsg(msg);
        return success;
    }


    /**
     * @description 异常的消息
     * @param msg 消息
     * @return 消息
     */
    public static Message exception(String msg) {
        Message success = new Message();
        success.setCode(CODE_EXCETPION);
        success.setMsg(msg);
        return success;
    }

    /**
     * @description 异常的消息
     * @return 消息
     */
    public static Message exception() {
        Message success = new Message();
        success.setCode(CODE_EXCETPION);
        success.setMsg(EXCEPTION_INFO);
        return success;
    }


    /**
     * 
     * @description API接口请求返回信息
     * @param code 返回代码
     * @param msg 描述
     * @param data 返回对象
     * @return Message
     */
    public static Message message(int code, String msg, Object data) {
        Message success = new Message();
        success.setCode(code);
        success.setMsg(msg);
        success.setData(data);
        return success;
    }

    /**
     * 
     * @description API接口请求返回信息
     * @param code 返回代码
     * @param msg 描述
     * @return Message
     */
    public static Message message(int code, String msg) {
        Message success = new Message();
        success.setCode(code);
        success.setMsg(msg);
        return success;
    }

    /**
     * @description 消息代码
     * @return 消息代码
     */
    public int getCode() {
        return code;
    }

    /**
     * @description 消息代码
     * @param code 消息代码
     */
    public void setCode(int code) {
        this.code = code;
    }

    /**
     * @description 消息
     * @return 消息
     */
    public String getMsg() {
        return msg;
    }

    /**
     * @description 消息
     * @param msg 消息
     */
    public void setMsg(String msg) {
        this.msg = msg;
    }

    /**
     * @description 消息携带的数据
     * @return 消息携带的数据
     */
    public Object getData() {
        return data;
    }

    /**
     * @description 消息携带的数据
     * @param data 消息携带的数据
     */
    public void setData(Object data) {
        this.data = data;
    }

}
