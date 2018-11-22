
function user_login(){
    var data = getFormValues("dataForm");
    if(!data.userName){
        commonMsg("请输入您的用户名");
        return false;
    }
    if(!data.password){
        commonMsg("请输入您的密码");
        return false;
    }
    commonAjax("/doLogin", data, function (result) {
        if(result){
            if(result.code==1){
                commonMsg(result.msg);
                location.href = '/index';
            }else{
                commonMsg(result.msg);
                return false;
            }
        }
    });
}

function gotoRegister() {
    location.href = '/register';
}

function forgetPsd() {
    commonMsg("请联系管理员重置密码");
}
