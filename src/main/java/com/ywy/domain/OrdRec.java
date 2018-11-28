package com.ywy.domain;


import java.util.Date;

public class OrdRec {

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
    private Byte isDelete;
    private Byte state;
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

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
