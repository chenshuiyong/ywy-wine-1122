/**
 * Created by shijsh on 2018/6/18.
 */

var sendFlag = true;

function check_form() {
    if ($('#editName').val() == '') {
        show_mask2('姓名不能为空');
        return false;
    }
    if (nameRule($('#editName').val())) {
        show_mask2('姓名只允许输入:中文、英文');
        return false;
    }
    var itemSex = $("select[name='ITEM_SEX'] option:checked").val();//性别
    if (!itemSex) {
        show_mask2('请先选择您的性别');
        return false;
    }
    var birthDayNum = $("#birthday_value").val();
    if (birthDayNum == '') {
        show_mask2('请先选择您的生日时间');
        return false;
    }
    if ($('#editEmail').val() == '') {
        show_mask2('邮箱不能为空');
        return false;
    }
    if ($('#city_name').val() == '') {
        show_mask2('请先选择您的常住城市');
        return false;
    }
    if ($('#post_addr').val() == '') {
        show_mask2('邮寄地址不能为空');
        return false;
    }

    return true
}

/*提交数据*/
function submit() {
    if (!check_form()) {
        return
    }
    var info = {};
    info.itemCompellation =  $('#editName').val();//姓名
    info.itemMobile =  $('#editMobile').val();//电话号码;
    info.itemBirthday =  $("#birthday_value").val();//生日
    info.itemSex = $("select[name='ITEM_SEX'] option:checked").val();//性别
    info.itemEmail = $("input[name='info[ITEM_EMAIL]']").val();//邮箱
    info.itemCarNum = $("input[name='info[ITEM_CARNUM]']").val();//车牌号
    info.itemHomeAddr =  $('#post_addr').val();//邮寄地址;
    info.cityName =  $("#city_name").val();//常驻地名

    $.ajax({
        url: "/member/editInfo",
        type: "post",
        data: JSON.stringify(info),
        contentType: "application/json;charset=utf-8",
        dataType: 'json',
        beforeSend: function () {
            $('#loading_gif').show();
        },
        success: function (data) {
            $('#loading_gif').hide();
            if (data.success) {
                show_mask2(data.msg);
                $('.submit_btn2').click(function () {
                    levMidCenter();
                })
            }
            else {
//                    dialog(data.msg);
                show_mask2(data.msg);
            }
        },
        error: function (xhr, status, errorThrown) {
            $('#loading_gif').hide();
            console.log(errorThrown);
        }
    });
}

/*跳转到个人中心*/
function levMidCenter() {
    location.href = commonChangeDtUrl("/member/index?dt="+(new Date()).getTime());
}
/*跳转到个人隐私协议*/
function gotoPolicy(){
    location.href =commonChangeDtUrl('/member/gotoPolicy');
}

function sendCode(obj, inID) {
    var mobile = $("#" + inID).val();
    if (sendFlag == false) {
        return;
    }
    if (mobile != '' && isMobile(mobile)) {
        sendFlag = false;
        $(obj).attr("disabled", true);
        $(obj).addClass("send_code_on");
        var url = "{:U('Member/send')}";
        $.post(url, {"mobile": mobile}, function (data) {
            if (data == 'fail') {
                $(obj).removeAttr("disabled");
                $(obj).removeClass("send_code_on");
                sendFlag = true;
                $(obj).val("重新发送");
            } else if (data.type == 'success') {
//                    dialog('短信已经发送，请注意查收！');
                var time = 120;
                var int = setInterval(function () {
                    time--;
                    $(obj).val("剩" + time + "秒");
                    if (time == 0) {
                        $(obj).removeClass("send_code_on");
                        $(obj).removeAttr("disabled");
                        sendFlag = true;
                        clearInterval(int);
                        $(obj).val("重新发送");
                    }
                }, 1000);
            }
        }, "json");
    }
}


//按钮处理，在输入法弹出时，不会影响布局
$(window).resize(function (event) {
    var out_block = document.getElementById('submit');
    if (out_block.style.display == 'none') {
        out_block.style.display = 'block';
    } else {
        out_block.style.display = 'none';
    }
});

//    选择日期插件
$(function () {
    //判断生日是否可以编辑，只允许修改一次
    if (!ifHaveBirthday) {
        var calendar = new datePicker();
        calendar.init({
            'trigger': '#birthday', /*按钮选择器，用于触发弹出插件*/
            'type': 'date', /*模式：date日期；datetime日期时间；time时间；ym年月；*/
            'minDate': '1900-1-1', /*最小日期*/
            'maxDate': '2100-12-31', /*最大日期*/
            'onSubmit': function () {/*确认时触发事件*/
                var theSelectData = calendar.value;
                $('#birthday').html(theSelectData);
                $('#birthday_value').val(theSelectData);
                console.log($('#birthday_value').val());
            },
            'onClose': function () {/*取消时触发事件*/
            }
        });
    }

    $('#get_verify_btn').click(function () {
        var new_phone=$('#new_phone').val()
        if(new_phone==''){
            show_mask2('新手机号码不能为空');
            return false
        }else if(!isMobile(new_phone)){
            show_mask2('请输入11位手机号码');
            return false
        }else{
            if(sendFlag==false){return false;}
            sendFlag = false;
            var data={'phone':new_phone}
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

                    if(res.success ){
                        showTipsPop();
                        var time=120;
                        var int = setInterval(function(){
                            time--;
                            $("#get_verify_btn").html("已发送("+time+"s)");
                            if(time==0){
                                $("#get_verify_btn").html("获取验证码");
                                sendFlag = true;
                                clearInterval(int);
                            }
                        },1000);
                    }else{
                        sendFlag = true;
                        show_mask2(res.msg);
                    }
                },
                error: function(xhr, status, errorThrown) {
                    $('#loading_gif').hide();
                    sendFlag = true;
                    show_mask2('程序出错请联系开发人员');
                },
            });
        }
    })
    $('#submit_new_phone_btn').click(function () {
        var new_phone=$('#new_phone').val()
        var verify_code=$('#new_verify_code').val()
        if(new_phone==''){
            show_mask2('新手机号码不能为空');
            return false
        }else if(!isMobile(new_phone)){
            show_mask2('请输入正确的手机号');
            return false
        }else if(verify_code==''){
            show_mask2('请输入验证码');
            return false
        }else{
            var data={'phone':new_phone,'code':verify_code}
            $.ajax({
                url:"/member/updatePhone",
                type: "post",
                data: data,
                dataType:'json',
                beforeSend: function () {
                    $('#loading_gif').show();
                },
                success: function(res) {
                    $('#loading_gif').hide();
                    $('#change_phone_mask').hide();
                    if(res.success){
                        show_mask2('已成功修改您的手机号码');
                        $('#editMobile').val(new_phone);
                        $('#new_phone').val("");
                        $('#new_verify_code').val("");
                    }else{
                        show_mask2(res.msg);
                    }
                },
                error: function(xhr, status, errorThrown) {
                    $('#loading_gif').hide();
                    show_mask2('程序出错请联系开发人员');
                },
            });
        }
    })

});




function show_mask() {
    $('#submit_mask').show();
}
function close_mask() {
    $('#submit_mask').hide();
}

function show_mask2(content) {
    $(".tips_container2 p").html(content);
    $('#submit_mask2').show();
}

function close_mask2() {
    $('#submit_mask2').hide();
}
$(document).ready(function(){
    var oHeight = $(document).height();
    $(window).resize(function(){ //ios软键盘弹出不会触发resize事件
        if($(document).height() < oHeight){
            $(".add_complain").css("position","static");
        }else{
            $(".add_complain").css("position","absolute"); //adsolute或fixed，看你布局
        }
    });
    $('.show_change_phone_pop').click(function () {
        $('#change_phone_mask').show();
    });
    $('.close_pop_btn').click(function () {
        $('#change_phone_mask').hide()
    });

});
//提示弹框
function showTipsPop(){
    $("#tips_pop_container").fadeIn();
    setTimeout(function(){
        $("#tips_pop_container").fadeOut();
    },2000)
}