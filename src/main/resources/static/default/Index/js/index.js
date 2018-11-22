/**
 * Created by shijsh on 2018/5/31.
 */

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);//阻止冒泡
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


function baiduLocation(longitude,latitude){
}

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
                            // location.href='/index.php/Index/choose_city';
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
    listWeixinArticle();//获取钻石会最新动态
    listLimitedIndulgence();//获取限时特惠
    listLastGift();//获取积分礼品
    listLastCard();//获取最新电子券
    listShop(city);//获取商场

    listWechatLink({classLevel:'174366360',type:'gffw',name:'购房服务',classId:'purchase_service',imgPath:'vip/purchase/goufang.png',pageSize:3,pageNo:1}); //购房服务
    listWechatLink({classLevel:'173991080',type:'yzzx',name:'业主尊享',classId:'owners_enjoy',imgPath:'vip/owners/yezhu.png',pageSize:3,pageNo:1}); //业主尊享
    listWechatLink({classLevel:'174757436',type:'jrfw',name:'金融服务',classId:'financial_service',imgPath:'vip/financial/jinrong.png',pageSize:3,pageNo:1}); //金融服务

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
                $('.ad_container').attr('href', result.data.itemRemoteUrl);
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
        var html = '<img src="/default/Index/img/' + params.imgPath+ '" class="title-img"> <div class="btn-box">';
        $.each(wechatlinks, function (i, item) {
            html += '<a href="' + item.itemUrl + '" onclick="_czc.push([\'_trackEvent\', \'' +  params.name +   '-' +
                +item.itemName+'\', \'点击\']);">';
            html += '<img src="'+BASE_PIC_PATH + JSON.parse(item.itemHomeLogo)[0].path + '">';
            html += '<div>'+item.itemName+'</div>';
            html += '</a>';
        });
        ///  html += '   <a href="/index.php/Index/more.html?code=" ' + params.type + '>   <img src="/default/Index/img/vip/owners/ico_more.png"> <div>更多</div></a> ';
        var url = commonChangeDtUrl("/wechatlink/more?classLevel="+ params.classLevel+ '&moduleName=' +params.name);
        html += '   <a href="' + url + '">  <img src="/default/Index/img/vip/owners/ico_more.png"> <div>更多</div></a> ';
        html += '</div>';
        $('#'+params.classId).html(html);
    }else{
        $('#'+params.classId).hide();
    }
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
function listWeixinArticle(){
    ajax_post(commonChangeDtUrl("/weixinArticle/list"),parse_latest_news);
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
            html += '<li>';
            html += '<a href="' + item.itemUrl + '" onclick="_czc.push([\'_trackEvent\', \'首页轮播图-'+(i+1)+'\', \'点击\']);">';
            html += '<img src="'+ BASE_PIC_PATH + JSON.parse(item.itemImage)[0].path + '">';
            html += '</a>';
            html += '</li>';
        });
        html += '</ul>';
        $('#banner').html(html);
    }else{
        //$('#banner').hide();
       if(bannerCity!=xmCity) {
           bannerCity = xmCity;
           listBanner(xmCity);
       }
    }
    /*顶部轮播图 start*/
//    TouchSlide({
//        slideCell: "#slideBox",
//        titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
//        mainCell: ".bd ul",
//        effect: "leftLoop",
//        interTime: "3000",
//        autoPage: true //自动分页
//    });
//    if ($("#header").find("li").length > 1) {
//        TouchSlide({
//            slideCell: "#header",
//            titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
//            mainCell: ".bd ul",
//            effect: "leftLoop",
//            autoPlay: true,
//            interTime: "3000",
//            autoPage: true //自动分页
//        });
//    }
    /*顶部轮播图 end*/
    myScroll.refresh();
}

/**
 * @功能:解析钻石头条
 */
function parse_vip_topic(topic) {
    if(!isEmpty(topic)){
        var html = '';
        $.each(topic, function (i, item) {
            html += '<div class="swiper-slide">';
            html += '<a class="hot-name" href="' + item.itemUrl + '" onclick="_czc.push([\'_trackEvent\', \'钻石头条'+item.itemTopic+'\', \'点击\']);">' + item.itemTopic + '</a>';
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
 * @功能:解析商城优惠
 */
function parse_mall_discount(shops) {
    if(!isEmpty(shops)){
        var html = '';
        $.each(shops, function (i, item) {
            var imgUrl = JSON.parse(item.itemShopLog)[0].path;
            //html += '<a href="' + item.ITEM_URL + '">';
//                html += '<a href="/index.php/nearByShops/marketDetail.html?nearByShopId="'+item.itemShopId+'"&shop_id='+item.itemShopId+'">';
            var shopUrl = commonChangeDtUrl("/shop/detail?itemShopId="+item.itemShopId);
            html += '<a href="'+shopUrl +'">';
            html += '<img src="'+BASE_PIC_PATH + imgUrl + '">';
            html += '<div>' +  (item.itemShortName !=''? item.itemShortName :item.itemShopName  ) + '</div>';
            html += '</a>';
        });
        var sUrl = commonChangeDtUrl('/shop/index');
        html += '<a href="' + sUrl + '">';
        html += '<img src="/default/Index/img/vip/financial/ico_more.png">';
        html += '<div>更多</div>';
        html += '</a>';

        $("#mall_discount .btn-box").html(html);
    }else{
        $('#mall_discount').hide();
    }
    myScroll.refresh();
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
        html += '<a href="' + subject_activity.itemUrl + '" onclick="_czc.push([\'_trackEvent\', \'主题活动\', \'点击\']);">';
        html += '<img src="'+BASE_PIC_PATH + JSON.parse(subject_activity.itemImage)[0].path + '">';
        html += '</a>';
        $("#topic_activity .topic_img_box").html(html);
    }else{
        $("#topic_activity").hide()
    }
    myScroll.refresh();
}

/**
 * @功能:解析最新动态
 */
function parse_latest_news(latest_news) {
    if(!isEmpty(latest_news)){
        var html='';
        html+='<div class="scroll_box_latest_news">';
        $.each(latest_news,function(i,item){
            html+='<div class="news_item">'
            html+='<a href="'+item.itemArticleUrl+'" onclick="_czc.push([\'_trackEvent\', \'最新动态-'+item.itemAritcleTitle+'\', \'点击\']);">';
            html+='<img src="'+BASE_PIC_PATH+JSON.parse(item.itemArticleImg)[0].path+'">'; // JSON.parse(item.itemArtilceImage)[0].path
            html+='<div class="item_title">'+item.itemAritcleTitle+'</div>';
            html+='</a>';
            html+='</div>';
        });
        html+='</div>';
        $("#news_container").html(html);

        setTimeout(function(){
            var scroll_box_latest_news = $(".scroll_box_latest_news");
            scroll_box_latest_news.width((scroll_box_latest_news.find("a").length) * (scroll_box_latest_news.find("a").width())+24);
            var myScroll_latest_news = new iScroll('news_container', {scrollX: true, scrollY: false});
        },500)
    }else{
        $("#latest_news").hide();
    }
    myScroll.refresh();
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
        html+='<div class="scroll_box_integral_gift">';
        $.each(last_gift, function (i, item) {
            html += '<div class="gift_item">';

            var thisUrl = commonChangeDtUrl('/gift/get?itemHactId='+item.itemHactId );
            html += '<a href="' + thisUrl + '">';
            if(item.itemViplevelName=='金钻卡'){
                html+='<img src="/default/Index/img/vip/sd.png" class="gold_label">'
            }
            html+='<div class="gift_img_box">';
            html += '<img src="'+BASE_PIC_PATH + item.itemPic + '" class="gift_img">';
            html+='</div>';
            html += '<div class="gift_name">' + item.itemGiftName + '</div>';
            html += '<div class="integral"><span class="num">'+item.itemIntegral+'</span>积分</div>';
            html += '<div class="exchange_btn">';
            html += '<img src="/default/Index/img/vip/btn01.png">';
            html += '</div>';
            html += '</a>';
            html += '</div>';
        });
        html += '<div class="gift_item" >';
        var mUrl = commonChangeDtUrl("/mall/index")
        html += '<a href="' +  mUrl +  '">';
        html += '<img src="/default/Index/img/vip/all.jpg" class="gift_img" style="margin-right: 24px">';
        html += '</a>';
        html += '</div>';
        html += '</div>';

        $('#integral_gift .gift_container').html(html);

        setTimeout(function(){
            var scroll_box_integral_gift = $(".scroll_box_integral_gift");
            scroll_box_integral_gift.width((scroll_box_integral_gift.find("a").length) * (scroll_box_integral_gift.find("a").width())+162);
            var myScroll_integral_gift = new iScroll('gift_container', {scrollX: true, scrollY: false});
            //设置图片宽高
            var img_width=$('.gift_item .gift_img').css('width');
            $('.gift_item .gift_img').css('height',img_width);
        },500);

    }else{
        $('#integral_gift .gift_container').hide()
    }

    if(data.totalEffectivePoints!=null){
        $('.my_integral .num span').html(data.totalEffectivePoints);
    }

    $('.get_integral_tips').click(function(){
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
            //html +='<a href="#">';
            html += '<div class="ticket_item">';
            html += '<div class="ticket_content">';
            html += '<div class="ticket_name">' + item.itemCouponName + '</div>';
            html += '<div class="ticket_company">' + item.itemShopName + '</div>';
            html += '<div class="ticket_integral_date">';
            html += '<div class="ticket_integral"><span>' + parseInt(item.itemIntegral) + '</span>积分</div>';
            html += '<div class="ticket_date">';


            html += '<span class="date">有效期至'+(item.itemEtime != null ? item.itemEtime.substring(0,10) :"") + '</span>';
            html += '<span class="to_ticket_detail">点击查看</span>';
            html += '</div>';
            html += '</div>';
            if(item.itemViplevelName!=''&&item.itemViplevelName){
                if(item.itemViplevelName!='金钻卡'){
                    html +=' <div class="zhuanshu">'+item.itemViplevelName.split(";")[0]+'以上等级会员专属</div>'
                }else{
                    html +=' <div class="zhuanshu">金钻会员专享</div>'
                }
            }
            html += '</div>';
            html += '</div>';
            html += '</a>';
        });
        html+='<div class="to_more_tickets">';
        html+='<span>点击查看更多电子券</span>';
        html+='</div>';
        $("#latest_tickets .tickets_container").html(html);
        $('.to_more_tickets').click(function(){
            location.href= commonChangeDtUrl('/mall/index?type=2');
        })
    }else{
        $('#latest_tickets').hide()
    }

    var ticket_width=parseInt($('.ticket_item').width());
    var content_width=parseInt(ticket_width*0.5);
    var padding_l=330-content_width;
    $('.ticket_integral').css('padding-left',padding_l+'px');
    myScroll.refresh();
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