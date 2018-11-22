
var  userObj = null,isTenant = null;
$(function(){
    $("#addPoint").click(function(){
        var data = getFormValues("pointInfo");
        if(!data.amount){
            commonMsg("请输入本单合计金额");
            return false;
        }
        if(!data.memberCardNo){
            commonMsg("请扫描会员身份二维码");
            return false;
        }
        commonAjax(commonChangeDtUrl("/shopSetPoint/getPoint"), data, function (result) {
            if(result){
                debugger
                if(result.code==1){
                    data.createPoints = result.data;
                    confirmAddPoint(data);
                }else{
                    commonMsg(result.msg);
                    return false;
                }
            }
        });
    });
   // getNick("1299999900001315");
 //  getNick("1999999902523614");
});
// 弹窗内容
function confirmAddPoint(data){
    var nick = $("#memberNick").val();
    // 确认框
    var index = layer.confirm(getContet(data.createPoints,nick), {
        btn : [ '确定', '取消' ]
        // 按钮
    }, function() {
        // 关闭弹窗
        parent.layer.close(index);
        // 调用新增积分接口
        addPoint(data);
    }, function() {

    });
}

// 弹窗内容
function getContet(point,nick){
    var tipsInfo="";
    tipsInfo+="<table style='font-size: 16px'>";
    tipsInfo+="<tr><td align='left'>会员姓名："+nick+"</td><td></td></tr>";
    tipsInfo+="<tr><td align='left'>本次积分："+point+"</td><td></td></tr>";
    tipsInfo+="<tr><td colspan='2'>是否确认本次消费积分？</td></tr>";
    tipsInfo+="</table>";
    return tipsInfo;
}

// 新增积分
function addPoint(data){
    commonAjax(commonChangeDtUrl("/shopSetPoint/addPoint"), data, function (result) {
        if(result){
            if(result.code==1){
                successComfirm(result.msg,data);
            }else{
                commonMsg(result.msg);
            }
        }
    });
}

// 扫一扫
$("#sacnCode").click(function(){
    ajax_post("/common/weixinInfo?uri="+encodeURIComponent(getRequestUrl()),initWeixinInfo);
    wx.ready(function () {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                // 当needResult 为 1 时，扫码返回的结果 即得到会员卡号
                var result = res.resultStr;
                $("#memberCardNo").val(result);
                getNick(result)
            },
            fail:function(){
                commonMsg("扫描失败，请稍候重试!")
            }
/*            ,
            cancel:function(){
                wx.closeWindow();
            }*/
        });
    });
});
// 录入成功
function successComfirm(msg,data){
    // 确认框
    var index = layer.confirm(setMsg(msg), {
        btn : [ '确认' ]
        // 按钮
    }, function() {
        // 重载
      //  window.location.reload();
        gotoPoint(data.orgunitCode,data.shopsCode,data.shopName)
    }, function() {

    });
}
// 得到昵称
function getNick(memberCardNo){
    commonAjax(commonChangeDtUrl("/shopSetPoint/getNick"), {memberCardNo : memberCardNo}, function (result) {
        if(result){
            if(result.code==1){
                $("#memberCode").text(result.data);
                $("#memberNick").val(result.data);
            }else {
                $("#memberCode").text(memberCardNo);
                $("#memberNick").val(memberCardNo);
            }
        }
    });
}

function gotoPoint(shopId,tenantId,tenantName){
    window.location.href= commonChangeDtUrl("/shopSetPoint/gotoSetPoint?shopId="+shopId+"&tenantId="+tenantId+"&tenantName="+tenantName);
}

// 弹窗内容
function setMsg(msg){
    var tipsInfo="";
    tipsInfo+="<samp style='font-size: 16px'>"+msg+"</samp>";
    return tipsInfo;
}
