/**
 * Created by yangzhinan on 2018/6/29.
 */
//按钮处理，在输入法弹出时，不会影响布局
$(window).resize(function (event) {
    var out_block = document.getElementById('out_block');
    if (out_block.style.display == 'none') {
        out_block.style.display = 'block';
    } else {
        out_block.style.display = 'none';
    }
});
$('#out_block').click(function () {
    check_form() ? submit() : null
});
$("#submit_btn").click(function () {
    $('#submit_mask').hide();
});
$(".close_btn").click(function () {
    $('#submit_mask').hide();
});

function check_form() {
    if ($('#editName').val() == '') {
        show_mask2('姓名不能为空');
        return false;
    }
    if (nameRule($('#editName').val())) {
        show_mask2('姓名只允许输入:中文、英文');
        return false;
    }
    if ($("select[name='ITEM_IDTYPE']").val() == '') {
        show_mask2('请选择证件类型');
        return false;
    }
    if ($('#editIdno').val() == '') {
        show_mask2('证件号码不能为空');
        return false;
    }
    if ($("#id-type .select-show").html() == '身份证') {
        if (isIdNo($('#editIdno').val())) {
            show_mask2('身份证号码格式不正确!');
            return false;
            console.log($("#id-type .select-show").text());
        }
    }
    return true
}

function submit() {
    var info = {};
    info.ITEM_COMPELLATION = $('#editName').val();//姓名
    info.ITEM_MOBILE = $('#editMobile').val();//电话号码
    info.ITEM_IDTYPE = $("select[name='ITEM_IDTYPE']").val();
    info.ITEM_IDNO = $("input[name='info[ITEM_IDNO]']").val();//身份证号码
    //info.ITEM_REMARK = $("#remark-text").val();//备注说明信息
    $.ajax({
        type: "POST",
        url: "/member/levelEdit",
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(info),
        beforeSend: function () {
            $('#loading_gif').show();
        },
        error: function (ret) {
            toast('程序出错请联系开发人员', 2);
            show_mask2('程序出错请联系开发人员');
        },
        success: function (res) {
            $('#loading_gif').hide();
            if (res.success) {
                /*if (res.redirect == 1) {
                    get_house_list();
                }*/
                get_house_list();
            } else {
                $('.tips_container').html(res.msg);
                $('#submit_mask').show();
            }
        }
    });
}
//获取是否有绑定房屋
function get_house_list() {
    $.ajax({
        url: "/ownerEnjoy/getHouseInfo",
        type: "post",
        dataType: 'json',
        beforeSend: function () {
            layer.load(2);
        },
        success: function (obj) {
            layer.close(layer.index);
            if (obj.data.length > 0) {
                location.href = commonChangeDtUrl("/ownerEnjoy/houseList");
            } else {
                location.href = commonChangeDtUrl("/member/index");
            }
        },
        error: function (xhr, status, errorThrown) {
            console.log(errorThrown)
        }
    });
}

function show_msg(msg) {
    $(".my-ewm-bg").show();
    $(".my-ewm-box").show();
    $('.ewm_wrap').html(msg);
}
function hide_msg() {
    $(".my-ewm-bg").hide();
    $(".my-ewm-box").hide();
}
/*去除前后空格*/
function iptTrim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/*电话号码规则*/
function isMobile(val) {
    var regPartton = /^1[0-9]\d{9}$/;
    if (!regPartton.test(val)) {
        return false;
    } else {
        return true;
    }
}
/*身份证号码规则*/
function isIdNo(val) {
    var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    if (reg.test(val)) {
        return false;
    }
    else {
        return true;
    }
}

/*认证成功之后跳转到抽奖活动页面*/
function lotteryPage() {
    location.href = "{:U('Lottery/levelLottery')}";
}
/*跳转到个人中心*/
function levMidCenter() {
    location.href = "{:U('Member/index')}";
}
/*只允许中英文数字输入*/
function nameRule(val) {
    var nameText = /[^\a-zA-Z\.\·\ \u4E00-\u9FA5]/g;
    if (!nameText.test(val)) {
        return false;
    } else {
        return true;
    }
}


function show_mask2(content) {
    $(".tips_container2 p").html(content);
    $('#submit_mask2').show();
}

function close_mask2() {
    $('#submit_mask2').hide();
}
