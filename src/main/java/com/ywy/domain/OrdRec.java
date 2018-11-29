package com.ywy.domain;


import com.ywy.utils.DateUtils;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class OrdRec implements Serializable {

    /**
     * 状态：1收到推荐2处理中3推荐失败4推荐成功
     */
    public static final Byte REC_STATE_RECIVICE = 1;
    public static final Byte REC_STATE_HANDLE = 2;
    public static final Byte REC_STATE_FAIL = 3;
    public static final Byte REC_STATE_SECCESS= 4;

    private Integer recId;
    // 被推荐人
    private String beRecName;
    // 被推荐人
    private String beRecPhone;
    // 推荐人
    private String recPhone;
    // 备注
    private String remake;
    // 验证码
    private String code;
    private Byte isDelete;
    private Byte state;
    private String stateStr;
    private String createTimeStr;
    private Date createTime;
    private Date updateTime;

    public Integer getRecId() {
        return recId;
    }

    public void setRecId(Integer recId) {
        this.recId = recId;
    }

    public String getBeRecName() {
        return beRecName;
    }

    public void setBeRecName(String beRecName) {
        this.beRecName = beRecName;
    }

    public String getBeRecPhone() {
        return beRecPhone;
    }

    public void setBeRecPhone(String beRecPhone) {
        this.beRecPhone = beRecPhone;
    }

    public String getRecPhone() {
        return recPhone;
    }

    public void setRecPhone(String recPhone) {
        this.recPhone = recPhone;
    }

    public Byte getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Byte isDelete) {
        this.isDelete = isDelete;
    }

    public Byte getState() {
        return state;
    }

    public void setState(Byte state) {
        this.state = state;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getRemake() {
        return remake;
    }

    public void setRemake(String remake) {
        this.remake = remake;
    }
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getCreateTimeStr() {
        return DateUtils.formatterDate(createTime,"yyyy-MM-dd HH:mm:ss");
    }

    public void setCreateTimeStr(String createTimeStr) {
        this.createTimeStr = createTimeStr;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getStateStr() {
        if (state ==1 ){
            stateStr ="收到推荐";
        }else if (state ==1 ){
            stateStr ="处理中";
        }else if (state ==1 ){
            stateStr ="推荐失败";
        }else if (state ==1 ){
            stateStr ="推荐成功";
        }
        stateStr = "处理状态："+ stateStr;
        return stateStr;
    }

    public void setStateStr(String stateStr) {
        this.stateStr = stateStr;
    }
}
