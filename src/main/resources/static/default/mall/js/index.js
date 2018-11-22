/**
 * Created by shijsh on 2018/5/19.
 */
//阻止冒泡
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(loaded, 0);
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
       // var city_html = ' <div class="city_item activity" onclick="click_city_item(this)">' + city_name + '</div>';
        //$('.city_screen_box').append(city_html);
       $('.city_screen span').html(city_name);
    }

    $('.show_city_mask').find('span').addClass('activity');
    $('.show_city_mask').find('img').attr('src', '/default/Index/img/integral/down.png');
    if ($('#type').val() == 1) {
        init_gift_page();
    } else if ($('#type').val() == 2) {
       // init_ticket_page();修复重复查询
    }
}

//初始状态，加载数据
function loadAction() {

 //   $('#pullDown').hide();
  //  $('#pullUp').hide();
    // setCookie('cookie_city', encodeURI("厦门市"), 1);
    if(decodeURI(getCookie('selected_city'))!=''&&decodeURI(getCookie('selected_city'))!='null'){
        var city_name = decodeURI(getCookie('selected_city'));
        parse_local_city(city_name);
    }else if (decodeURI(getCookie('cookie_city'))!=''&&decodeURI(getCookie('cookie_city'))!='null') {
        var city_name = decodeURI(getCookie('cookie_city'));
        parse_local_city(city_name);
    } else {

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
                    if ($('#type').val() == 1) {
                        init_gift_page();
                    } else if ($('#type').val() == 2) {
                        init_ticket_page();
                    }
                },
                fail: function (res) {
                    if ($('#type').val() == 1) {
                        init_gift_page();
                    } else if ($('#type').val() == 2) {
                        init_ticket_page();
                    }
                }
            });
        });
    }
    myScroll.refresh();
}



//下拉刷新当前数据
var isFresh = false;
function pullDownAction() {
    setTimeout(function () {
        $("#thelist").html('');
        pageNo=1;
        if ($('#type').val() == 1) {
            init_gift_page();
        } else if ($('#type').val() == 2) {
            init_ticket_page();
        }
        isFresh = true;
        myScroll.refresh();
    }, 400);

    //这里执行刷新操作

}

//上拉加载更多数据
function pullUpAction() {

    setTimeout(function () {
        if ($('#type').val() == 1) {
            pageNo ++;
            init_gift_page();
        } else if ($('#type').val() == 2) {
            pageNo ++;
            init_ticket_page();
        }
        myScroll.refresh();
    }, 400);
};


/**
 * @功能:获取实物礼品列表
 */
function init_gift_page() {
    var url =giftUrl+"&itemCityCode="+$('#city_name').val()+"&pageNo="+pageNo+"&orderStr="+orderStr;
    ajax_post(url,parse_gift_list);
};


/**
 * @功能:获取电子券列表
 */
function init_ticket_page() {
    var url = couponUrl + "&itemCityCode="+$('#city_name').val()+"&pageNo="+pageNo+"&orderStr="+orderStr;
    ajax_post(url,parse_ticket_list);
};


/**
 * @功能:验证筛选栏状态
 */
function check_screen_status() {
    if ($('.sort_screen_item').hasClass('activity')) {
        $('.show_sort_mask').find('span').addClass('activity');
        $('.show_sort_mask').find('img').attr('src', '/default/Index/img/integral/down.png');
    } else {
        $('.show_sort_mask').find('span').removeClass('activity');
        $('.show_sort_mask').find('img').attr('src', '/default/Index/img/integral/ff5.png');
    }
    if ($('.city_screen_box .city_item').hasClass('activity')) {
        $('.show_city_mask').find('span').addClass('activity');
        $('.show_city_mask').find('img').attr('src', '/default/Index/img/integral/down.png');
    } else {
        $('.show_city_mask').find('span').removeClass('activity');
        $('.show_city_mask').find('img').attr('src', '/default/Index/img/integral/ff5.png');
    }
}

//全国选择
function click_all_city(obj) {
    pageNo = 1;
    $('.city_item').removeClass('activity');
    $(obj).addClass('activity');
    $('#city_name').val('');
    $('.city_screen span').html('全国');
    $("#thelist").html('');
    if ($('#type').val() == 1) {
        init_gift_page();
    } else if ($('#type').val() == 2) {
        init_ticket_page();
    }
}

//选择城市筛选条件
function click_city_item(obj) {
    pageNo = 1;
    $('.all_city').removeClass('activity');
    $('.city_item').removeClass('activity');
    $(obj).addClass('activity');
    var city_name = $(obj).text();
    $('#city_name').val(city_name);
    $('.city_screen span').html(city_name);
    $("#thelist").html('');
    if ($('#type').val() == 1) {
        var url =giftUrl+"&itemCityCode="+city_name;
        ajax_post(url,parse_gift_list);
    } else if ($('#type').val() == 2) {
        init_ticket_page();
    }
}

function getOrderStr(){

    var retOrderBy = '';
    var sortObj = $(".sort_screen_item.activity");
    if(sortObj.length>0) {
        var sortBy =sortObj.attr('sort_by');
        var sortId =sortObj.attr("sort_id");
        if(sortId =='3' || sortId=='4'){
            if ($('#type').val() == 1) { //礼品
                sortBy =  sortId =='3' ?  'b.item_Begin_Date|desc': 'b.item_end_Date|asc';
            }else{ // 电子券
                sortBy =  sortId =='3' ?  'a.item_Act_Stime|desc': 'a.item_Act_Stime|asc';
            }
        }else if(sortId =='1'){
        	 if ($('#type').val() == 1) { //礼品
        		 retOrderBy="a.ITEM_PAY_MONEY asc ,a.item_Integral asc";
        	 }else{
        		 retOrderBy="a.item_Integral asc";
        	 }
        	 return retOrderBy;
        }else if(sortId =='2'){
	       	 if ($('#type').val() == 1) { //礼品
	    		 retOrderBy="a.ITEM_PAY_MONEY DESC,a.item_Integral DESC";
	    	 }else{
	    		 retOrderBy="a.item_Integral desc";
	    	 }
	       	 return retOrderBy;
        }

        var orderArr=  sortBy.split("|");

        retOrderBy = orderArr[0]+" "+orderArr[1]


    }else{
        retOrderBy = '';
    }
    return retOrderBy;
}
/**
 * @功能:秒杀开始倒计时函数
 * @time 倒计时秒数
 */
function countTime(time) {
    //定义变量 h,m,s保存倒计时的时间
    var h, m, s;
    if (time >= 0) {
        h = Math.floor(time / 60 / 60 );
        m = Math.floor(time / 60 % 60);
        s = Math.floor(time % 60);
        if (h >= 0 && h < 10) {
            h = "0" + h
        }
        if (m >= 0 && m < 10) {
            m = "0" + m
        }
        if (s >= 0 && s < 10) {
            s = "0" + s
        }
        //将倒计时赋值到div中
        $("#hours").html(h);
        $("#minute").html(m);
        $("#second").html(s);
    }else{
        //$("#hours").html('00');
       // $("#minute").html('00');
       // $("#second").html('00');
    	$(".left_time_line").hide();
    }

    //递归每秒调用countTime方法，显示动态时间效果
    if (time> 0) {
        setTimeout(function () {
            countTime(time-1)
        }, 1000);
    }
}
function close_screen_mask() {
    if($('#city_screen_mask').css('display')=='block'){
        $('#city_screen_mask').hide();
    }
    if($('#sort_screen_mask').css('display')=='block'){
        $('#sort_screen_mask').hide();
    }
}
$(function() {

//  /*按比例放大缩小*/
    var currClientWidth, fontValue, originWidth;originWidth = 750;//ui设计稿的宽度，一般750或640
    __resize();
    window.addEventListener('resize', __resize, false);
    function __resize() {
        currClientWidth = document.documentElement.clientWidth;
        if (currClientWidth > 768){
            currClientWidth = 768;
        }
        if (currClientWidth < 320){
            currClientWidth = 320;
        }
        fontValue = ((625 * currClientWidth) / originWidth).toFixed(2);
        document.documentElement.style.fontSize = fontValue + '%';
    }

    //我的兑换记录跳转
    $('#exchange_record').click(function () {
        if ($('#type').val() == 1) {
            location.href = commonChangeDtUrl('/playIntegral/myGifts');
        } else if ($('#type').val() == 2) {
            location.href = commonChangeDtUrl('/CollectFolder/card');
        }
    });
    // 为body元素绑定click事件
    $("body").click(function(event){
    	close_screen_mask();
    	event.stopPropagation();
    });
    //显示排序筛选项
    $('.show_sort_mask').click(function (event) {
        if ($('#sort_screen_mask').css('display') == 'block') {
            $(this).find('span').removeClass('activity');
            $(this).find('img').attr('src', '/default/Index/img/integral/ff5.png');
        } else {
            $(this).find('span').addClass('activity');
            $(this).find('img').attr('src', '/default/Index/img/integral/down.png');
        }
        $('#city_screen_mask').hide();
        check_screen_status();
        $('#sort_screen_mask').toggle();
        event.stopPropagation();
    });

    //显示城市筛选项
    $('.show_city_mask').click(function (event) {
        if ($('#city_screen_mask').css('display') == 'block') {
            $(this).find('span').removeClass('activity');
            $(this).find('img').attr('src', '/default/Index/img/integral/ff5.png');
        } else {
            $(this).find('span').addClass('activity');
            $(this).find('img').attr('src', '/default/Index/img/integral/down.png');
        }
        $('#sort_screen_mask').hide();
        check_screen_status();
        $('#city_screen_mask').toggle();
        city_scroll.refresh();
        event.stopPropagation();
    });

    //排序筛选项点击
    $('.sort_screen_item').click(function () {
        pageNo = 1;
        $('.sort_screen_item').removeClass('activity');
        $(this).addClass('activity');

        orderStr =encodeURIComponent( getOrderStr());
        // alert(orderStr);
        var sort_name = $(this).text();
        $('.sort_screen span').html(sort_name);
        $("#thelist").html('');
        if ($('#type').val() == 1) {
            var url =giftUrl+"&orderStr=" +orderStr+ "&itemCityCode="+$('#city_name').val();
            ajax_post(url,parse_gift_list);
        }else{
            var url = couponUrl +"&orderStr=" +orderStr+ "&itemCityCode="+$('#city_name').val();
            ajax_post(url,parse_ticket_list);
        }
        myScroll.scrollTo(0, -listHeight, 100, true);
    });

    //点击关闭遮罩
    $('.screen_mask').click(function () {
        $(this).slideUp();
        check_screen_status();
    });

    /*电子券和实物礼品切换*/
    $('.slider_navigation .gifts').click(function () {
        if ($('#type').val() != 1 && $('#can_switch').val() == '1') {
            $(this).addClass('active');
            $('.slider_navigation .tickets').removeClass('active');
            $('.slider_navigation img').css('left', '0');
            $('#type').val('1');
            pageNo = 1;
            $('#thelist').html('');

            orderStr = getOrderStr();

            init_gift_page();
        }
    });

    $('.slider_navigation .tickets').click(function () {
        if ($('#type').val() != 2 && $('#can_switch').val() == '1') {
            $(this).addClass('active');
            $('.slider_navigation .gifts').removeClass('active');
            $('.slider_navigation img').css('left', '50%');
            $('#type').val('2');
            pageNo = 1;
            $('#thelist').html('');
            // loadAction();
            orderStr = getOrderStr();
            init_ticket_page();
        }
    });

    if (paramType == '2') {
    	if(city!='0'){
         var cityname=decodeURI(city)
       	 $('#city_name').val(cityname);
    	}
        $('.slider_navigation .tickets').click();
    }
    if ($('#type').val() == 1) {
        $('.slider_navigation .gifts').addClass('activity');
        $('.slider_navigation .tickets').removeClass('activity');
        $('.slider_navigation img').css('left', '0');
    } else if ($('#type').val() == 2) {
        $('.slider_navigation .tickets').addClass('activity');
        $('.slider_navigation .gifts').removeClass('activity');
        $('.slider_navigation img').css('left', '50%');
    }

    $("#search").click(function () {
        var type = "";
        if ($('#type').val() == 1) {
            type = 'gift';
        } else if ($('#type').val() == 2) {
            type="coupon";
        }

        pageNo = 1;
    //    location.href = '/mall/search?type='+type+"&city="+$('#city_name').val()+"&orderStr="+orderStr;

        location.href = commonChangeDtUrl('/mall/search?type='+type+"&city="+$('#city_name').val()+"&orderStr="+orderStr);
    });


    /*左上角默认显示的分类名*/
    if ($("#thisName")) {
        $('.choose-name').html($("#thisName").html());
    }

    /*点击显示隐藏*/
    var flg = true;
    $(".choose-ipt").click(function () {
        if (flg) {
            $(".show-box").slideDown();
            $(".icon-pic").css('background', 'url("/default/member/img/couponPage/icon-down-arrow-red.png") no-repeat');
            $(".choose-name").css("color", '#c82128');
            flg = false;
        } else {
            $(".show-box").slideUp();
            $(".icon-pic").css('background', 'url("/default/member/img/couponPage/icon-up-arrow.png") no-repeat');
            $(".choose-name").css("color", '#494a4d');
            flg = true;
        }
    });
    /*点击选中的li*/
    $(".search-li .search-li-a").each(function () {
        $(this).click(function () {
            $(".choose-name").html($(this).html());
            $(".show-box").slideUp();
            $(".icon-pic").css('background', 'url("/default/member/img/couponPage/icon-up-arrow.png") no-repeat');
            $(".choose-name").css("color", '#494a4d');
            flg = true;
        })
    });
    $(".search-bg-opt").click(function () {
        $(".show-box").hide();
        $(".icon-pic").css('background', 'url("/default/member/img/couponPage/icon-up-arrow.png") no-repeat');
        flg = true;
    });


    //是否显示秒杀模块
    if(hasSec==1){
       $('#integral_sec').show();
       countTime(secNum);
    }else{
    	$('#integral_sec').hide();
    }

});