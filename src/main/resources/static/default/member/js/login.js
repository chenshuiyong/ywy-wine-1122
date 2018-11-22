
$(function () {
    $("#bodya").css('height', $(window).height());
});
$(".go_register").click(function(){
    var data = getFormValues("loginInfo");
    if(!data.mobile){
        commonMsg("手机号不能为空!");
        return false;
    }
    if(!data.verify){
        commonMsg("请输入验证码!");
        return false;
    }
    commonAjax(commonChangeDtUrl("/shopSetPoint/login"), data, function (result) {
        if(result){
            commonMsg(result.msg);
            if(result.code==1){
                var ret = result.data;
                gotoPoint(ret.shopId,ret.tenantId)
            }else {
                return false;
            }
        }
    });
});

function showTime() {
    $("#send_code").html();
}

var sendFlag = true;
function sendCode(){
    debugger;
    var mobile = $("#mobile").val();
    if(!mobile){
        commonMsg("手机号不能为空!");
        return false;
    }
    if(sendFlag==false){return false;}
    $("#get_code").css("color",'#ccc');
    $("#get_code").css("border-color",'#ccc');
    sendFlag = false;
    var data={'phone':mobile};
    $.ajax({
        url:"/member/sendSms",
        type: "post",
        data: data,
        dataType:'json',
        beforeSend: function () {
            $('#loading_gif').show();
        },
        success: function(res) {
            $('#loading_gif').hide();
            if(res.success){
                commonMsg('发送成功');
                var time=120;
                var int = setInterval(function(){
                    time--;
                    $("#get_code").html("剩"+time+"秒");
                    if(time==0){
                        $("#get_code").css("color",'#E64340');
                        $("#get_code").css("border-color",'#E64340');
                        sendFlag = true;
                        clearInterval(int);
                        $("#get_code").html("重新发送");
                    }
                },1000);
            }else{
                $("#get_code").css("color",'#E64340');
                $("#get_code").css("border-color",'#E64340');
                sendFlag = true;
                $("#get_code").html("重新发送");
                commonMsg(res.msg);
            }
        },
        error: function(xhr, status, errorThrown) {
            $('#loading_gif').hide();
            commonMsg("程序出错请联系开发人员");
            $("#get_code").css("color",'#E64340');
            $("#get_code").css("border-color",'#E64340');
            sendFlag = true;
            $("#get_code").html("重新发送");
        },
    });
}

function gotoPoint(shopId,tenantId){
    window.location.href= commonChangeDtUrl("/shopSetPoint/gotoSetPoint?shopId="+shopId+"&tenantId="+tenantId);
}
