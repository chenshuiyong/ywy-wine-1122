function user_login() {
    var data = getFormValues("dataForm");
    if (!data.recPhone) {
        commonMsg("请输入您的手机号");
        return false;
    }
    if (!data.code) {
        commonMsg("请输入验证码");
        return false;
    }
    data.phone = data.recPhone;
    commonAjax("/rec/doLogin", data, function (result) {
        if (result) {
            if (result.code == 1) {
                commonMsg(result.msg);
                if (data.url) {
                    location.href = data.url;
                } else {
                    location.href = '/rec/recommend';
                }
            } else {
                commonMsg(result.msg);
                return false;
            }
        }
    });
}

function sendCode() {
    if (!$("#recPhone").val()) {
        commonMsg("您的联系手机不能为空");
        return false;
    }
    $(".get_verify_btn").attr('disabled', "true");
    var data = {'phone': $("#recPhone").val()};
    var index;
    $.ajax({
        url: "/rec/sendSms",
        type: "post",
        data: data,
        dataType: 'json',
        beforeSend: function () {
             index = layer.load(1, {
                shade: [0.1,'#fff'] //0.1透明度的白色背景
            });
        },
        success: function (res) {
            layer.close(index);
            if (res.code == 1) {
                commonMsg(res.msg);
                var time = 120;
                var int = setInterval(function () {
                    time--;
                    $(".get_verify_btn").text(time + "s");
                    if (time == 0) {
                        $(".get_verify_btn").removeAttr("disabled");
                        clearInterval(int);
                        $(".get_verify_btn").text("重新获取");
                    }
                }, 1000);
            } else {
                $(".get_verify_btn").text('重新获取');
                $(".get_verify_btn").removeAttr("disabled");
                commonMsg(res.msg);
            }
        },
        error: function (xhr, status, errorThrown) {
            commonMsg("程序出错请联系管理员");
            $(".get_verify_btn").text('重新获取');
            $(".get_verify_btn").removeAttr("disabled");
        },
    });
}
function gotoRec() {
    location.href = '/rec/recommend';
}