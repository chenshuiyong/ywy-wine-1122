// want_recommend.js
if ($("#recPhone").val()){
    $("#recPhone").attr("disabled",true);
}

$(".savebtn").click(function(){
    var data = getFormValues("dataForm");
    if(!data.beRecName){
        commonMsg("您要推荐的联系人称呼不能为空");
        return false;
    }
    if(!data.beRecPhone){
        commonMsg("您要推荐的联系人电话不能为空");
        return false;
    }
    if(!data.recPhone){
        commonMsg("您的联系电话不能为空");
        return false;
    }
    commonAjax("/rec/add", data, function (result) {
        if(result){
            if(result.code==1){
                commonMsg(result.msg);
                location.href = '/rec/list';
            }else{
                commonAlert(result.msg);
              /*  $('.tips_container p').html(result.msg);
                $('#submit_mask').show();
                $('.submit_btn').click(function () {
                    $('#submit_mask').hide();
                });*/
                return false;
            }
        }
    });

});

window.onload=function (){

}

var count = 10;
function getcode(){
    var timeout = window.setTimeout(function(){
        count--;
        if(count > -1) {
            $(".getcode").attr('disabled',"true");
            $(".getcode").text(count+"s");
            getcode()
        }else{
            $(".getcode").text('重新获取');
            $(".getcode").removeAttr("disabled");
            count = 120;
        }
    }, 1000);
}

function sendCode(){
    if(!$("#recPhone").val()){
        commonMsg("您的联系电话不能为空");
        return false;
    }
    $(".getcode").attr('disabled',"true");
    var data={'phone':$("#recPhone").val()};
    var index  ;
    $.ajax({
        url:"/rec/sendSms",
        type: "post",
        data: data,
        dataType:'json',
        beforeSend: function () {
          index = layer.load(1, {
              shade: [0.1,'#fff'] //0.1透明度的白色背景
          });
        },
        success: function(res) {
            layer.close(index);
            if(res.code ==1){
                commonMsg(res.msg);
                var time=120;
                var int = setInterval(function(){
                    time--;
                    $(".getcode").text(time+"s");
                    if(time==0){
                        $(".getcode").removeAttr("disabled");
                        clearInterval(int);
                        $(".getcode").text("重新获取");
                    }
                },1000);
            }else{
                $(".getcode").text('重新获取');
                $(".getcode").removeAttr("disabled");
                commonMsg(res.msg);
            }
        },
        error: function(xhr, status, errorThrown) {
            commonMsg("程序出错请联系管理员");
            $(".getcode").text('重新获取');
            $(".getcode").removeAttr("disabled");
        },
    });
}


$(".goto_rec").click(function(){
    location.href = '/rec/recommend';
});

function gotoRegister() {
    location.href = '/register';
}

function forgetPsd() {
    commonMsg("请联系管理员重置密码");
}
