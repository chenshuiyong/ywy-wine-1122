(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

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

function back() {
    history.go(-1);
}

function more() {
    location.href = '/more';
}
