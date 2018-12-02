package com.ywy.domain;


import com.ywy.utils.DateUtils;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class OrdRec implements Serializable {

    /**
     *状态：1收到推荐2业务员跟进中3已合作未付款4已付款-推荐成功5推荐失败6奖励成功
     */
    public static final Byte REC_STATE_RECIVICE = 1;
    public static final Byte REC_STATE_HANDLE = 2;
    public static final Byte REC_STATE_UNPAY = 3;
    public static final Byte REC_STATE_SECCESS= 4;
    public static final Byte REC_STATE_FAIL = 5;
    public static final Byte REC_REWORD_SECCESS = 6;

    public static final Byte TYPE_CHANGE= 1;

    private Integer recId;
    // 被推荐人
    private String beRecName;
    // 被推荐人
    private String beRecPhone;
    // 推荐人
    private String recPhone;
    // 备注
    private String remake;
    // 备注
    private String failReason;
    // 验证码
    private String code;
    private Byte isDelete;
    private Byte state;
    private Byte isToday;
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

    public Byte getIsToday() {
        return isToday;
    }

    public void setIsToday(Byte isToday) {
        this.isToday = isToday;
    }

    public String getFailReason() {
        return failReason;
    }

    public void setFailReason(String failReason) {
        this.failReason = failReason;
    }
    //状态：1收到推荐2业务员跟进中3已合作未付款4已付款-推荐成功5推荐失败
    public String getStateStr() {
        if (state ==1 ){
            stateStr ="收到推荐";
        }else if (state ==2 ){
            stateStr ="业务员跟进中";
        }else if (state ==3 ){
            stateStr ="已合作未付款";
        }else if (state ==4 ){
            stateStr ="已付款-推荐成功";
        }else if (state ==5 ){
            stateStr ="推荐失败";
        }else if (state ==6 ){
            stateStr ="奖励成功";
        }
        return stateStr;
    }

    public void setStateStr(String stateStr) {
        this.stateStr = stateStr;
    }
}
