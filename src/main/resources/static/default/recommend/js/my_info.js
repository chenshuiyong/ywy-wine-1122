// my_info.js

if ($("#recPhone").val()){
    $("#recPhone").attr("disabled",true);
}

$(".goto_rec").click(function(){
    location.href = '/rec/recommend';
});

function changeOther() {
    layer.open({
        title:'更换手机',
        type: 1,
        skin: 'layui-layer-demo', //加上边框
        area: ['300px', '240px'], //宽高
        content: htmlInfo(),
        btn: ['提交'],
        yes: function(index, layero){
            alert(1);
        }
    });
}

// 弹窗内容
function htmlInfo(){
    var htmlInfo="";
    htmlInfo+= "<div class=\"inputinfo\">"
   // htmlInfo+= " <p>请正确输入您的联系电话</p>"
    htmlInfo+= " <input type=\"text\" style=\"font-size: 14px;\"  id=\"nexPhone\" MAXLENGTH=\"11\" onkeyup=\"this.value=this.value.replace(/[^0-9]/g,'')\" onafterpaste=\"this.value=this.value.replace(/[^0-9]/g,'')\" placeholder=\"您的联系电话\"> </div>"
    htmlInfo+= " <div class=\"inputinfo\">"
   // htmlInfo+= " <div class=\"inputinfo\"><p>验证码</p>"
    htmlInfo+= " <input class=\"code\"  type=\"text\" style=\"font-size: 14px;\" id=\"code\"  MAXLENGTH=\"6\" onkeyup=\"this.value=this.value.replace(/[^0-9]/g,'')\" onafterpaste=\"this.value=this.value.replace(/[^0-9]/g,'')\" placeholder=\"验证码\"><button onclick=\"sendCode()\" class=\"getcode\">获取验证码</button></div>"
   // htmlInfo+= " <button class=\"savebtn\" type=\"button\" name=\"button\">提交</button>";
    return htmlInfo;
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
