/**
 * Created by yangzhinan on 2018/6/29.
 */
var idx = 0;var autoLoad = true;
$(function(){
    $('.weui-tab__panel').eq(0).show();
    show_no_data();
    $('.weui-navbar__item').click(function () {
        autoLoad = true;
        $('.weui-loadmore__tips').html('点击加载');
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        idx = $(this).index();
        $('.weui-tab__panel').hide();
        $('.weui-tab__panel').eq(idx).show();
        show_no_data()
    });
});
$('.weui-loadmore__tips').click(function(){
    var content_list=$('.weui-tab__panel').eq(idx);
    var current_page=parseInt(content_list.attr('current_page'));
    current_page ++;
    if (autoLoad) {
        get_data(idx,current_page);
    }
});
function get_data(status,current_page){
    show_loading('数据加载中...');
    var content_list=$('.weui-tab__panel').eq(idx);
    autoLoad = false;
    data={};
    data['p']=current_page;
    data['status']=status;
    var url = "/playIntegral/myGiftDatas";
    $.get(url,data,
        function(res){
            if(!res){
                hide_loading('暂无更多数据');
                autoLoad = false;
            }else{
                var html = loadMoreGifts(res);
                content_list.append(html);
                hide_loading('上拉加载');
                autoLoad = true;
            }
            content_list.attr('current_page',current_page);
        },'json');
}

function show_no_data() {
    var none_all=$('#none_all_gifts').val();
    var none_no_use=$('#none_no_use_gifts').val();
    var none_use=$('#none_use_gifts').val();
    var none_expire=$('#none_expire_gifts').val();
    if(none_all==1&&$('.weui-tab__panel').eq(0).css('display')=='block'){
        $('.weui-loadmore').hide()
    }else if(none_no_use==1&&$('.weui-tab__panel').eq(1).css('display')=='block'){
        $('.weui-loadmore').hide()
    }else if(none_use==1&&$('.weui-tab__panel').eq(2).css('display')=='block'){
        $('.weui-loadmore').hide()
    }else if(none_use==1&&$('.weui-tab__panel').eq(3).css('display')=='block'){
        $('.weui-loadmore').hide()
    }else{
        $('.weui-loadmore').show()
    }
}
/*下来加载更多积分礼品 s*/
function loadMoreGifts(giftsList){
    var html = '';
    var img = '';
    var imgUrl = '';
    var url = '';
    for(var i=0;i<giftsList.length;i++){
        var intelgral = giftsList[i]['ITEM_INTELGRAL']==''?'0':parseInt(giftsList[i]['ITEM_INTELGRAL']);
        var money = giftsList[i]['ITEM_MONEY']==''?'0':parseInt(giftsList[i]['ITEM_MONEY']);
        
        imgUrl = giftsList[i]['ITEM_PIC'];
        url="/playIntegral/myGiftDetail/" + giftsList[i]['ITEM_INVENTORY_ID'];
        html+='<a class="weui-media-box weui-media-box_appmsg" href="'+url+'">';
        html+='<div class="weui-media-box__hd">';
        html+='<img class="weui-media-box__thumb" src="'+imgUrl+'">';
        html+='</div>';
        html+='<div class="weui-media-box__bd">';
        html+='<h4 class="weui-media-box__title">'+giftsList[i]['ITEM_GIFT_NAME']+'</h4>';
        if(money>0){
            html+='<p class="weui-media-box__desc">消费金额:￥'+ money +'</p>';
        }else{
        	html+='<p class="weui-media-box__desc">消费积分：'+ intelgral +'</p>';
        }

        html+='<div class="weui-cells weui-cell aa">';
        html+='<div class="weui-cell__bd">';
        html+='<p class="weui-media-box__desc">数量：'+giftsList[i]['ITEM_QUANTITY']+'</p>';
        html+='</div>';
        html+='<div class="weui-cell__ft">'+giftsList[i]['ITEM_STATUS_CH']+'</div>';
        html+='</div>';
        html+='</div>';
        html+='</a>';
    }
    return html;
}
/*下拉加载更多礼品 e*/
function show_loading(msg){
    $('.weui-loadmore').removeClass('weui-loadmore_line');
    $('.weui-loading').show();
    $('.weui-loadmore__tips').html(msg);
}
function hide_loading(msg){
    $('.weui-loadmore').addClass('weui-loadmore_line');
    $('.weui-loading').hide();
    $('.weui-loadmore__tips').html(msg);
}