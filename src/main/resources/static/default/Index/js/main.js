/**
 * Created by shijsh on 2018/5/31.
 */

var lat, lng;
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(loaded, 0);
}, false);

$(function(){
    $("#close_ad_mask").click(function(){
        $('#ad_mask').hide()
        var data = {};
        var advertId = $('#advertId').val();
        data.advertId = advertId;
        commonAjax(commonChangeDtUrl("/index/addAdvertRecord/"), data, function (result) {
            if(result){
                if(result.code==1){
                }else{
                    return false;
                }
            }
        });
    });
});
//初始状态，加载数据
function loadAction() {
    init_user_location();
//        /*按比例放大缩小*/
    var scale = $(document).width() / (640 * 2);
    var viewport = "<meta name='viewport' content='width=640, initial-scale=" + scale + ",minimum-scale=0.5, maximum-scale=0.5, user-scalable=no'>";
    $("meta[name='viewport']").remove();
    $("head").prepend(viewport);
    $('#pullUp').hide();
    myScroll.refresh();
}

//下拉刷新当前数据
function pullDownAction() {
    setTimeout(function () {
        //这里执行刷新操作
        init_page();
        myScroll.refresh();
    }, 400);
}

//上拉加载更多数据
function pullUpAction() {
    setTimeout(function () {
        myScroll.refresh();
    }, 400);
};

/**
 * @功能:获取地理位置
 */

var xmCity = "厦门市",bannerCity="";
function init_user_location() {

    if(decodeURI(getCookie('selected_city'))!=''&&decodeURI(getCookie('selected_city'))!='null'){
        var city_name=decodeURI(getCookie('selected_city'));
        $("#location_box span").html(city_name);
        init_page();
    }else if(decodeURI(getCookie('cookie_city'))!=''&&decodeURI(getCookie('cookie_city'))!='null'){
        var city_name=decodeURI(getCookie('cookie_city'));
        $("#location_box span").html(city_name);
        init_page();
    }else{

        ajax_post("/common/weixinInfo?uri="+encodeURIComponent(getRequestUrl()),initWeixinInfo);
        //测试
        // setCookie('cookie_city', encodeURI('厦门市'), 1);
//            $("#location_box span").html('厦门市');
        wx.ready(function () {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

                    var cityUrl = commonChangeDtUrl("/common/getCity/"+latitude+"/"+longitude+"/");

                    ajax_post(cityUrl,function(data){
                        var exists = data.exists;
                        var city = data.city;
                        if(exists){
                            setCookie('cookie_city', encodeURI(city), 1);
                            $("#location_box span").html(city);
                            init_page();
                        }else{
                            layer.msg('该城市暂未开通，已自动切换到厦门市');
                            city = xmCity;
                            $("#location_box span").html(city);
                            setCookie('cookie_city', encodeURI(city), 1);
                            init_page();
                        }

                    },{},function(data){
                        console.log("error");
                        layer.msg('获取城市失败');
                        setTimeout(function(){
                           location.href= commonChangeDtUrl('/common/chooseCity');

                        },1500);
                    });
                    
                },
                cancel: function (res) {
                   location.href=commonChangeDtUrl('/common/chooseCity');
                },
                fail: function (res) {
                   location.href =commonChangeDtUrl('/common/chooseCity');
                }
            });
        });
    }
}
/**
 * @功能:获取页面数据
 * */
function init_page() {

    if(decodeURI(getCookie('selected_city'))!=''&&decodeURI(getCookie('selected_city'))!='null'){
        var city_name=decodeURI(getCookie('selected_city'))
    }else if(decodeURI(getCookie('cookie_city'))!=''&&decodeURI(getCookie('cookie_city'))!='null'){
        var city_name=decodeURI(getCookie('cookie_city'))
    } 
    var data = {'city_name': city_name};

    var city = city_name;// '厦门';
    listBanner(city); //获取banner
    listTopic(city);//获取最新动态
    listSubjectActivity(city);//获取主题活动
    listWeixinArticle(city);//获取钻石会最新动态
    //baiduLocation();
    listshopbrand(city);
    //listLimitedIndulgence();//获取限时特惠
    listLastGift();//获取积分礼品
    listLastCard();//获取最新电子券
    listWechatLink({classLevel:'181512493',type:'wxlj',name:'热门服务',classId:'nav_detail_list',imgPath:'vip/purchase/goufang.png',pageSize:10,pageNo:1}); //购房服务
    getAdvert(city); // 广告弹窗
}

/**
 *  广告弹窗
 * */
function getAdvert(city){
    commonAjax(commonChangeDtUrl("/index/getAdvertRecord/"+city), {}, function (result) {
        if(result){
            if(result.code==1 && result.data){
                var img = BASE_PIC_PATH + JSON.parse(result.data.itemImage)[0].path;
                $('.ad_img').attr('src', img);
                $('#advertId').val(result.data.id);
                $('.ad_container').attr('href', commonChangeDtUrl(result.data.itemRemoteUrl));
                $('#ad_mask').show();
            }else{
                return false;
            }
        }
    });
}
/**
 *  微信链接
 * */
function listWechatLink(params){
    ajax_post("/wechatlink/list/"+params.classLevel+"?pageSize="+params.pageSize+"&pageNo="+params.pageNo,parse_wechatLink,params);
}

/**
 * 微信链接处理
 */
function parse_wechatLink(wechatlinks,params){
    if(!isEmpty(wechatlinks)){
        var html = '';
        $.each(wechatlinks, function (i, item) {
            html += '<a class="nav_detail_item" href="' + item.itemUrl + '" onclick="_czc.push([\'_trackEvent\', \'' +  params.name +   '-' +
                +item.itemName+'\', \'点击\']);">';
            html += '<span><img src="'+BASE_PIC_PATH + JSON.parse(item.itemHomeLogo)[0].path + '"></span>';
            html += '<span class="nav_detail_name">'+item.itemName+'</span>';
            html += '</a>';
        });
        $('#'+params.classId).html(html);
    }else{
        $('#'+params.classId).hide();
    }
}
/**
 * 解析商家权益
 * @param brandData
 * @param shopId
 * @returns
 *  style="height:80px;width: 80px;"
 */
function parse_shop_brand(brandData,shopId){
	 var html='';
    if(!isEmpty(brandData.data)){
          //  html = '<div class="brands_list bt_a_flex">';
        $.each(brandData.data, function (i, item) {
            html += '<div class="brand_item">';
            html += '<a href="/tenant/detail?itemTenantId=' + item.itemTenantId + '" class="bt_c_column_flex">';
            html += '<img src="'+BASE_PIC_PATH+item.itemTenantLogo +' "class="brand_logo">';
            html += '<div class="brand_name">'+ item.itemTenantZname.substring(0,4)+'</div>';
            html += '</a>';
            html += '</div>';
        });
        html +='<div class="more_brand">';
        html +='<a href="/tenant/index?shopId='+shopId+'" class="c_c_flex to_more_brand">';
        html +='更多<br/>品牌';
        html +='</a></div>';
      //      html +='</div>';
    }
    return html;
}
/**
 * 展示商场
 */
function showshop(item){
	 var shopId=encodeURIComponent(item.itemShopId);
	 var path=BASE_PIC_PATH + JSON.parse(item.itemShopLog)[0].path
	 var html = '<div class="brand_item"><a href="/shop/detail?itemShopId='+shopId+'" class="bt_c_column_flex">';
	html +='<img src="'+path+'"  class="market_logo">';
        html +='<div class="brand_name">' + item.itemShortName + '</div>';
    html +='</a></div><span class="market_clear_line"></span>';
    return html;
}
function ajaxBrand(item){
	var shopId=item.attr("id");
	var url ='/tenant/list?pageSize=3&itemShopId='+shopId;
	//获取商户品牌
    $.ajax({
        url: url,
        type: "post",
        dataType: 'json',
        beforeSend: function () {
        },
        success: function (obj) {
            if(obj.success){
            	var html=parse_shop_brand(obj.data,shopId);
            	item.append(html);
            }
        },
        error: function (xhr, status, errorThrown) {
            console.log(errorThrown)
        }
    });
    
}
/**
 * 解析商城
 * @param shops
 * @returns
 */
function parse_shop(shops){
	if(!isEmpty(shops)){
		var html='';
        $.each(shops, function (i, item) {
           var shopId=item.itemShopId;
    	   html+='<div class="market_detail a_a_flex">';
        	html+='<div class="brands_list bt_a_flex" id="'+shopId+'">';
        	html+=showshop(item);
           html+='</div></div>';
        });
        $('#shopList').html(html);
        //加载商户品牌 start
        var objs= $("#shopList").find(".brands_list.bt_a_flex");
        $.each(objs, function (i, item) {
        	ajaxBrand(objs.eq(i));
        });
      //加载商户品牌 end
	} else{
        $('#vertical_red_line').hide();
        $('#new_gifts').css('padding-top','0px');
    }
}
/**
 * 获取本地商场品牌权益
 */
function listshopbrand(city){
	 ajax_post(commonChangeDtUrl("/shop/list/"+city),parse_shop);
}
/**
 * 显示所有的商场
 */
function listShop(city){
    ajax_post(commonChangeDtUrl("/shop/list/"+city),parse_mall_discount);
}
/**
 * 获取最新电子券
 */
function listLastCard(){
    ajax_post(commonChangeDtUrl("/lastCard/list"),parse_latest_tickets);
}

/**
 * 获取最新积分礼品
 */
function listLastGift(){
    ajax_post(commonChangeDtUrl("/lastGift/list"),parse_integral_gift);
}
/**
 * 获取限时特惠
 * */
function listLimitedIndulgence(){
    ajax_post(commonChangeDtUrl("/limitedIndul/list"),parse_time_discount);
}


/**
 * <p>获取最新动态
 * */
function listWeixinArticle(city){
    ajax_post(commonChangeDtUrl("/weixinArticle/list/"+city),parse_latest_news);
}

/**
 * 获取主题活动
 * */
function listSubjectActivity(city){
    ajax_post(commonChangeDtUrl("/activityIndex/list/"+city),parse_topic_activity);
}

/**
 * <p>获取砖石头条</p>
 * */
function  listTopic(city) {
    ajax_post(commonChangeDtUrl("/topic/list/"+city),parse_vip_topic);
}
/**
 * 获取banner 图
 * */
function listBanner(city){
    bannerCity = city;
    ajax_post(commonChangeDtUrl("/banner/list/"+city),parse_banner);
}


/**
 * @功能:解析轮播图
 */
function parse_banner(banner) {
    if(!isEmpty(banner)){
        var html = '';
        html += '<ul>';
        $.each(banner, function (i, item) {
            html += '<li  id= "li' + i + '">';
            html += '<a href="' + item.itemUrl + '" onclick="_czc.push([\'_trackEvent\', \'首页轮播图-'+(i+1)+'\', \'点击\']);">';
            html += '<img src="'+ BASE_PIC_PATH + JSON.parse(item.itemImage)[0].path + '">';
            html += '</a>';
            html += '</li>';
        });
        html += '</ul>';
        $('.banner_list').html(html);
        
        imgs=$('#banner_content ul li');
        html='';
        imgs.each(function (i,item) {
            if(i==0){
                $(item).addClass('current_img');
                html+='<span id= "point' + i + '" class="blue"></span>';
                cArr.push('current_img');
            }else if(i==1){
                $(item).addClass('next_img');
                html+='<span id= "point' + i + '" ></span>';
                cArr.push('next_img');
            }else if(i==imgs.length-1){
                $(item).addClass('previous_img');
                html+='<span  id= "point' + i + '"></span>';
                cArr.push('previous_img');
            }else{
                $(item).addClass('no_show');
                html+='<span id= "point' + i + '"></span>';
                cArr.push('no_show');
            }
        })
        $('#banner_buttons').html(html);
    }
}

/**
 * @功能:解析钻石头条
 */
function parse_vip_topic(topic) {
    if(!isEmpty(topic)){
        var html = '';
        $.each(topic, function (i, item) {
            html += '<div class="swiper-slide">';
            html += '<a class="hot-name" href="' + item.itemUrl + '" onclick="_czc.push([\'_trackEvent\', \'钻石头条'+item.itemTopic+'\', \'点击\']);"><span class="name">' + item.itemTopic + '</span><span class="top_news_btn">了解一下</span></a>';
            html += '</div>';
        });
        $("#vip_topic .topic_content").html(html);
    }else{
        $("#vip_topic").hide();
    }

    /*垂直滚动效果  start*/
    var swiper = new Swiper('.msg-vertical .swiper-container', {
        pagination: '.msg-vertical .swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        slidesPerColumn: 1,
        autoplay: 3000,
        loop: true,
//            用户操作之后（swipes,arrow以及pagination 点击）autoplay不会被禁掉
        autoplayDisableOnInteraction: false
    });
    /*垂直滚动效果  end*/
    myScroll.refresh();
}

/**
 * @功能:解析商城
 */
function parse_mall_discount(shops) {
    if(!isEmpty(shops)){
        var html = '';
        $.each(shops, function (i, item) {
            var imgUrl = JSON.parse(item.itemShopLog)[0].path;
            var shopUrl = commonChangeDtUrl("/shop/detail?itemShopId="+item.itemShopId);
            
            html += '<a class="nav_detail_item" href="' + shopUrl + '" onclick="_czc.push([\'_trackEvent\', \'' +  item.itemShortName +   '-' +
                +item.itemShortName+'\', \'点击\']);">';
            html += '<span><img src="'+BASE_PIC_PATH + imgUrl + '"></span>';
            html += '<span class="nav_detail_name">'+item.itemShortName+'</span>';
            html += '</a>';
        });
        $('#nav_detail_list').html(html);
    }else{
        $('#nav_detail_list').hide();
    }
}

/**
 * @功能:解析主题活动
 */
function parse_topic_activity(res) {
    var subject_activity = res.data;
    var title = res.title;

    if(title!=''){
        $("#activity_title").text(title);
    }

    if(subject_activity){
        var html = '';
        html += '<a href="' + commonChangeDtUrl(subject_activity.itemUrl) + '" onclick="_czc.push([\'_trackEvent\', \'主题活动\', \'点击\']);">';
        html += '<img src="'+BASE_PIC_PATH + JSON.parse(subject_activity.itemImage)[0].path + '">';
        html += '<div class="dream_mail_content"><span class="">'+subject_activity.itemTitle+'</span><span class="to_dream_detail">去看看</span>';
        html += '</div>';
        html += '</a>';
        $("#dream_mail .dream_detail_box").html(html);
    }else{
        $("#dream_mail").hide()
    }
    myScroll.refresh();
}

/**
 * @功能:解析最新动态
 */
function parse_latest_news(latest_news) {
    if(!isEmpty(latest_news)){
        var html='';
        html+='<div class="area_dynamic_box">';
        $.each(latest_news,function(i,item){
            html+='<div class="dynamic_item">'
            html+='<a href="'+item.itemArticleUrl+'" onclick="_czc.push([\'_trackEvent\', \'最新动态-'+item.itemAritcleTitle+'\', \'点击\']);">';
            html+='<img src="'+BASE_PIC_PATH+JSON.parse(item.itemArticleImg)[0].path+'">'; // JSON.parse(item.itemArtilceImage)[0].path
            html+='<div class="name">'+item.itemAritcleTitle+'</div>';
            html+='</a>';
            html+='</div>';
        });
        html+='</div>';
        $("#news_container").html(html);

    }else{
        $("#latest_news").hide();
        $("#area_dynamic").hide();
    }
}

/**
 * @功能:解析限时特惠
 */
function parse_time_discount(limited_indulgence) {
    if(limited_indulgence != null ){
        var html = '';
        html += '<a href="' +commonChangeDtUrl( limited_indulgence.itemUrl) + '" onclick="_czc.push([\'_trackEvent\', \'限时特惠\', \'点击\']);">';
        html += '<img src="'+BASE_PIC_PATH + JSON.parse(limited_indulgence.itemImage)[0].path + '">';
        html += '</a>';
        $("#time_discount .discount_img_box").html(html)
        $("#time_discount").show();
    }else{
        $("#time_discount").hide();
    }
    myScroll.refresh();
}

/**
 * @功能:解析最新积分礼品
 */
function parse_integral_gift(data) {
    var last_gift  = data.list;
    if(!isEmpty(last_gift)){
        var html = '';
        html+='<div class="gift_container a_a_flex">';
        $.each(last_gift, function (i, item) {
            var thisUrl = commonChangeDtUrl('/gift/get?itemHactId='+item.itemHactId );
            html += '<a href="'+thisUrl+'" class="gift_item">';
            html+='<div class="gift_img_box" >'
            html += '<img src="'+BASE_PIC_PATH + item.itemPic + '" class="gift_img">';
            html+='</div>'
            html += '<div class="gift_info">';
            html += '<div class="gift_name">' + item.itemGiftName + '</div>';
            if(item.itemIfflag&&item.itemIfflag=='1')
                html += '<div class="gift_integral"><span class="num">'+item.itemPayMoney+'</span>元</div>';
            else {
            	html += '<div class="gift_integral"><span class="num">'+item.itemIntegral+'</span>积分</div>';
            }
            html += '<span class="to_gift_detail">了解详情</span>';
            html += '</div>';
            html += '</a>';
        });
        html += '</div>';
        $('#new_gifts_list').html(html);

        setTimeout(function(){
            var scroll_box_integral_gift = $(".gift_container.a_a_flex");
            scroll_box_integral_gift.width((scroll_box_integral_gift.find("a").length) * (scroll_box_integral_gift.find("a").width())+265);
            var myScroll_integral_gift = new iScroll('new_gifts_list', {scrollX: true, scrollY: false,scrollbars:false});
            //设置图片宽高
            var img_width=$(".gift_item .gift_img").css('width');
            $('.gift_item .gift_img').css('height',img_width);
        },500);
        
    }else{
    	$('#new_gifts').hide();
    	$('#new_gifts_list').hide();
    }

    if(data.totalEffectivePoints!=null){
        $('#my_integral_section .num span').html(data.totalEffectivePoints);
    }

    $('.a_c_flex').click(function(){
        location.href='http://www.rabbitpre.com/m/NmzV3FfUK?lc=1&sui=DaRwpjno&from=groupmessage&isappinstalled=0#from=share'
    })

    myScroll.refresh();
}

/**
 * @功能:解析电子券
 */
function parse_latest_tickets(last_card) {
    if(!isEmpty(last_card)){
        var html = '';
        $.each(last_card, function (i, item) {
            
            html +='<a href="' + commonChangeDtUrl( item.cardUrl) + '">';
            html += '<div class="tickets_item">';
            html += '<img src="'+BASE_PIC_PATH + item.itemPicPath +'" class="ticket_bg">';
            html += '<div class="ticket_info bt_a_column_flex">';
            html += '<div class="integral_expire">';
            html += '<div class="integral_num">';
            html += '<span class="num">'+ parseInt(item.itemIntegral) +'</span>积分</div>';
            
            html += '<div class="expire_date">'+(item.itemEtime != null ? item.itemEtime.substring(0,10) :"") + '到期</div>';
            html += '</div>';
            html += '<div class="ticket_name">' + item.itemCouponName + '</div>';
            html += '<div class="market_and_detail bt_c_flex">';
            html += '<div>';
            html += '<div class="market_name">'+ item.itemShopName +'</div>';
            
            if(item.itemViplevelName!=''&&item.itemViplevelName){
                if (item.itemViplevelName != '金钻卡') {
                    html +='<div class="ticket_mark">'+item.itemViplevelName.split(";")[0]+'以上等级会员专属</div>'
                } else {
                    html += ' <div class="ticket_mark">金钻会员专享</div>'
                }
            }
            
            html+='</div>';
            html += '<div class="to_ticket_detail">了解详情</div>';
            html += '</div>';
           
            html += '</div>';
            html += '</div>';
            html += '</a>';
        });
        $(".tickets_box").html(html);
    }else{
        $('#tickets').hide()
    }
    $(".to_more_ticket").attr("href",commonChangeDtUrl("/mall/index?type=2&city_name="+$("#location_box span").html()));
}

//提示弹框
function showTipsPop(obj) {
    if (obj == null) {
        obj = {
            text: '暂未开放，敬请期待'
        }
    }
    layer.msg(obj.text,{time:1500});
}
/**
 * 解析导航栏
 * */
function parse_nav_bar() {
    var scroll_box_latest_news = $(".top_slider_bar");
    setTimeout(function () {
        scroll_box_latest_news.width((scroll_box_latest_news.find(".nav_item").length) * (scroll_box_latest_news.find(".nav_item").width()+40)+24);
        var myScroll_latest_news = new iScroll('top_slider_bar_box', {scrollX: true, scrollY: false,scrollbars:false,bounce:false});
    },500)
}