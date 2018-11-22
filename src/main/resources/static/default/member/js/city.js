//阻止冒泡
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', function () {
   // setTimeout(loaded, 0);
    setTimeout(function () {
        city_scroll=new iScroll('city_screen_box');
    },0);
}, false);

//解析定位城市
function parse_local_city(city_name) {
    $('#city_name').val(city_name);
    var  exists = false;
    $(".city_item").each(function(i,item){
        var name = $(this).attr("name");
        if(name == city_name ){
            exists = true;
            $(this).addClass('activity');
        }else{
            $(this).removeClass('activity');
        }
    });

    if(exists){
       $('.city_screen span').html(city_name);
    }
    $('.show_city_mask').find('span').addClass('activity');
    $('.show_city_mask').find('img').attr('src', '/default/Index/img/integral/down.png');
}

//初始状态，加载数据
function loadAction() {
    if(initCity){
        return;
    }
    if (decodeURI(getCookie('cookie_city'))!=''&&decodeURI(getCookie('cookie_city'))!='null') {
        var city_name = decodeURI(getCookie('cookie_city'));
        parse_local_city(city_name);
    }else{
        ajax_post("/common/weixinInfo?uri="+encodeURIComponent(getRequestUrl()),initWeixinInfo);
        wx.ready(function () {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

                    url ="/common/getCity/"+latitude+"/"+longitude;
                    ajax_post(url,function(data){
                        var exists = data.exists;
                        var city = data.city;
                        if(!exists){
                            layer.msg('该城市暂未开通，已自动切换到厦门市');
                            city = '厦门市';
                        }
                        setCookie('cookie_city', encodeURI(city), 1);
                        parse_local_city(city);

                    });
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });
        });
    }
}



//全国选择
function click_all_city(obj) {
    $('.city_item').removeClass('activity');
    $(obj).addClass('activity');
    $('#city_name').val('');
    $('.city_screen span').html('全国');
}

//选择城市筛选条件
function click_city_item(obj) {
    $('.all_city').removeClass('activity');
    $('.city_item').removeClass('activity');
    $(obj).addClass('activity');
    var city_name = $(obj).text();
    $('#city_name').val(city_name);
    $('.city_screen span').html(city_name);
    setCookie('cookie_city', encodeURI(city_name), 1);
}

/**
 * 用户自己输入城市
 * */
function add_city_name(){
    var city_name=$("#add_city_name").val();
    if(city_name==''){
        $('.tips_container p').html("城市名不能为空");
        $('#submit_mask').show();
        $('.submit_btn').click(function () {
            $('#submit_mask').hide();
        })
        return
    }

    $("#city_input_mask").hide();
    $('#city_container').hide();
    $('#choose_city_name').text(city_name);
    $('#city_name').val(city_name);
}


$(function() {

    //显示城市筛选项
    $('.show_city_mask').click(function () {
        if(initCity){
            return;
        }
        if ($('#city_screen_mask').css('display') == 'block') {
            $('#cityImg').attr('src', '/default/Index/img/integral/ff5.png');
        } else {
            $('#cityImg').attr('src', '/default/Index/img/integral/down.png');
        }
        $('#sort_screen_mask').hide();
        $('#city_screen_mask').toggle();
        city_scroll.refresh();
        $('.close_div').show();
    });

    $('.show_add_city_input').click(function () {
        $("#city_input_mask").show();
    });
    $('#close_add_city_mask').click(function () {
        $("#city_input_mask").hide();
    });

    //点击关闭遮罩
    $('.screen_mask').click(function () {
        $(this).hide();
        $('.close_div').hide();
    });
    $('.close_div').click(function () {
        $(this).hide();
        $('.screen_mask').hide();
    });
    loadAction();
});