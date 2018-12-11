package com.ywy.exception;

/**
 * 
 * @description 业务异常
 * @author 创建人：chensy
 * @date 修改时间：2018年2月24日 下午5:04:34
 * @version 1.0.0
 *
 */
public class WorkException extends Exception {

    private String code;
    private String msg;
    public WorkException(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public WorkException() {
    }

    public WorkException(String message) {
        super(message);
    }

    public WorkException(Throwable cause) {
        super(cause);
    }

    public WorkException(String message, Throwable cause) {
        super(message, cause);
    }

    public WorkException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
