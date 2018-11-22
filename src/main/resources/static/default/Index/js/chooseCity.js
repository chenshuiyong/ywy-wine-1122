/**
 * Created by shijsh on 2018/7/7.
 */
$(function(){
    init_user_location();
    ajax_post("/common/listCity",initList)
});

function initList(res){
    all_city  =res;
    parse_city_list();
    parse_letter_navigation();
    hide_empty_letter();
}

/**
 * @功能:获取地理位置
 */
function init_user_location() {
    ajax_post("/common/weixinInfo?uri="+encodeURIComponent(getRequestUrl()),initWeixinInfo);
    //获取地理
    wx.ready(function () {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

                var cityUrl = commonChangeDtUrl("/common/getCity/"+latitude+"/"+longitude+"/");

                ajax_post(cityUrl,function(data){
                    console.log(data);
                    var exists = data.exists;
                    var city = data.city;
                    if(exists){
                        setCookie('cookie_city', encodeURI(city), 1);
                        $("#local_city").html(city);
                    }else{
                        layer.msg('该城市暂未开通，已自动切换到厦门市');
                        city = '厦门市';
                        $("#location_box span").html(city);
                        setCookie('cookie_city', encodeURI(city), 1);
                    }
                });

            },
            cancel: function (res) {
                $('.city_line span').html('用户未允许定位');
            },
            fail: function (res) {
                $('.city_line span').html('用户未开启定位');
            }
        });
    });
}

function parse_letter_navigation(city_list) {
    var html = '';
    var letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $.each(letter, function (i, item) {
        html += '<a href="#' + item + '" class="navigate_bar" id="navigate_' + item + '">' + item + '</a>';
    });
    $("#letter_navigation").html(html);
}

function parse_city_list() {
    var html = '';
    var letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $.each(letter, function (i, item) {
        html += '<div id="' + item + '" class="title">' + item + '</div>';
        html += '<div class="city-item">';
        $.each(all_city, function (j, subitem) {
            if (subitem.ITEM_PINYIN.substring(0,1) == item) {
                html += '<div class="item item_city">' + subitem.ITEM_CITY_NAME + '</div>';
            }
        });
        html += '</div>';
    });
    $('#city_list').html(html);

    $(".item_city").click(function () {
        var city_name = $(this).text();
        setCookie('selected_city', encodeURI(city_name), 1);
        setTimeout(function(){
            location.href=commonChangeDtUrl('/index');
        },3000);
    });
    $('#local_city').click(function () {
        var city_name = $(this).text();
        if(city_name!='用户未开启定位'&&city_name!='用户未允许定位'){
            setCookie('selected_city',encodeURI(city_name), 1);
            setTimeout(function(){
                location.href=commonChangeDtUrl('/index');
            },3000);
        }
    })
}

function hide_empty_letter() {
    var has_city_letter = [];
    $.each(all_city, function (j, subitem) {
        has_city_letter.indexOf(subitem.ITEM_PINYIN.substring(0,1)) < 0 ? has_city_letter.push(subitem.ITEM_PINYIN.substring(0,1)) : null
    });
    var letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $.each(letter, function (i, item) {
        if (has_city_letter.indexOf(item) < 0) {
            $("#" + item + "").remove();
            $("#navigate_" + item + "").remove();
        }
    });
}

function get_search_result(){
    var key_words = $('#search_city').val();
    var data={
        'keyword':key_words
    };

    ajax_post('/common/listCity?cityName='+key_words,function(res){
        console.log(res);
        parse_search_result(res);
    });
}

function parse_search_result(data) {
    var key_words = $('#search_city').val();
    var html = '';
    if (key_words != '') {
        html += '<div class="title">搜索结果</div>';
        if (data&&data.length > 0) {
            html += '<div class="city-item">';
            $.each(data, function (j, subitem) {
                html += '<div class="item item_city">' + subitem.ITEM_CITY_NAME + '</div>';
            });
            html += '</div>';
        } else {
            html += '<div class="city-item">';
            html += '<div class="item">暂无结果</div>';
            html += '</div>';
        }
        $("#letter_navigation").hide();
        $('#city_list').html(html);
    } else {
        parse_city_list();
        parse_letter_navigation();
        hide_empty_letter();
        $("#letter_navigation").show();
    }
    $(".item_city").click(function () {
        var city_name = $(this).text();
        setCookie('selected_city', encodeURI(city_name), 1);
        location.href=commonChangeDtUrl('/index');
    });
}

$("#search_city").on('input', function () {
    if($('#search_city').val()==''){
        parse_city_list();
        parse_letter_navigation();
        hide_empty_letter();
        $("#letter_navigation").show();
    }
});

$('.city_line img').click(function () {
    if ($('#local_city').html() == '用户未开启定位') {
        layer.msg('请先开启定位');
    } else {
        init_user_location();
    }
});


$('form').on('submit', function (e) {
    e.preventDefault();
    get_search_result()
});


//提示弹框
function showTipsPop(obj) {
    if (obj == null) {
        obj = {
            text: '暂未开放，敬请期待'
        }
    }
    layer.msg(obj.text, {time: 1500});
}