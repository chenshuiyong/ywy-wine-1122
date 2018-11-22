
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
function user_register(){
    var data = getFormValues("dataForm");
    if(!data.userName){
        commonMsg("请输入您的用户名");
        return false;
    }
    if(!data.password){
        commonMsg("请输入您的密码");
        return false;
    }
    if(!data.repassword){
        commonMsg("请重复您的密码");
        return false;
    }
    if(data.repassword != data.password){
        commonMsg("两次密码不相同");
        return false;
    }
    commonAjax("/regisgerInfo", data, function (result) {
        if(result){
            if(result.code==1){
                commonMsg(result.msg);
                location.href = '/user/index';
            }else{
                commonMsg(result.msg);
                return false;
            }
        }
    });
}

function gotoLogin() {
    location.href = '/login';
}
