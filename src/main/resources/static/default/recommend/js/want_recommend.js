// want_recommend.js

$(".savebtn").click(function(){
    var data = getFormValues("dataForm");
    if(!data.beRecName){
        commonMsg("您要推荐的联系人");
        return false;
    }
    if(!data.beRecPhone){
        commonMsg("您要推荐的联系人电话");
        return false;
    }
    if(!data.recPhone){
        commonMsg("您的联系电话");
        return false;
    }
    commonAjax("/rec/add", data, function (result) {
        if(result){
            if(result.code==1){
                commonMsg(result.msg);
                location.href = '/rec/list';
            }else{
                $('.tips_container p').html(result.msg);
                $('#submit_mask').show();
                $('.submit_btn').click(function () {
                    $('#submit_mask').hide();
                });
                return false;
            }
        }
    });

});


function gotoRegister() {
    location.href = '/register';
}

function forgetPsd() {
    commonMsg("请联系管理员重置密码");
}
