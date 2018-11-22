
/*跳转到第三方页面*/
function thirdPartyPage(entityNo){
    var redirect_url =redirectUrl; //"{$redirect_url}";
    if(redirect_url.indexOf("?")>0){
        redirect_url += "&entityNo="+entityNo;
    }else{
        redirect_url += "?entityNo="+entityNo;
    }
    location.href = redirect_url;
}
$(function () {
    $("#bodya").css('height', $(window).height());
});
/*去除前后空格*/
function iptTrim(str){
    return str.replace(/(^\s*)|(\s*$)/g,"");
}
function register(){
    if(!$('.sign_btn').hasClass('active')){
        $('.tips_container p').html("请阅读并同意《钻石会用户服务协议及隐私条款》");
        $('#submit_mask').show();
        $('.submit_btn').click(function () {
            $('#submit_mask').hide();
        });
        return false;
    }
    var ifThirdParty = redirectUrl;
    if(!ifThirdParty){
        ifThirdParty = 0;
    }else{
        ifThirdParty = 1;
    }
    if($('#userName').val()==''){
        $('.tips_container p').html("请输入姓名");
        $('#submit_mask').show();
        $('.submit_btn').click(function () {
            $('#submit_mask').hide();
        });
        return false;
    }
    if ($('#city_name').val() == '') {
        $('.tips_container p').html("请先选择您的常住城市");
        $('#submit_mask').show();
        $('.submit_btn').click(function () {
            $('#submit_mask').hide();
        });
        return false;
    }

    if($('#editMobile').val()=='') {
        $('.tips_container p').html("请输入手机号");
        $('#submit_mask').show();
        $('.submit_btn').click(function () {
            $('#submit_mask').hide();
        });
        return false;
    }
    if($('#editVerify').val()=='') {
        $('.tips_container p').html("请输入验证码");
        $('#submit_mask').show();
        $('.submit_btn').click(function () {
            $('#submit_mask').hide();
        });
        return false;
    }

    var info={};
    info.ITEM_COMPELLATION = $("#userName").val();
    info.ITEM_MOBILE = $('#editMobile').val();
    info.editVerify = $('#editVerify').val();
    info.cityName =  $("#city_name").val();//常驻地名
    info.ifThirdParty = ifThirdParty;
    info.type = type;
    info.inviterId = inviterId;
    info.itemWeixin = itemWeixin;
    var regLoad;
    $.ajax({
        type: "post",
        url:"/member/register",
        dataType:'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(info),
        beforeSend: function () {
            regLoad = layer.load(2);
        },
        error: function(ret) {
            layer.close(regLoad);
            $('.tips_container p').html("程序出错请联系开发人员");
            $('#submit_mask').show();
            $('.submit_btn').click(function () {
                $('#submit_mask').hide();
            })
        },
        success: function(res) {
            layer.close(regLoad);
            if(res.success){
                if(res.ifThirdParty){
                    $('.tips_container p').html(res.msg);
                    $('.title_line').html('欢迎');
                    $('#submit_mask').show();
                    $('.submit_btn').click(function () {
                        $('#submit_mask').hide();
                        $('.title_line').html('温馨提示');
                        thirdPartyPage(res.entityNo)
                    })
                }else{
                    $('.tips_container p').html(res.msg);
                    $('.title_line').html('欢迎');
                    $('#submit_mask').show();
                    $('.submit_btn').click(function () {
                        $('#submit_mask').hide();
                        $('.title_line').html('温馨提示');
                        levMidCenter()
                    })
                }
            }else{
                $('.tips_container p').html(res.msg);
                $('#submit_mask').show();
                $('.submit_btn').click(function () {
                    $('#submit_mask').hide()
                });
            }
        }
    });

}


window.onload = function () {
    /*按比例放大缩小*/
    var scale = $(document).width() / (640 * 2);
    $('.clear_line').css('transform','scaleY('+scale*2+')');
    $('.submit_btn').click(function () {
        $('#submit_mask').hide()
    })
};