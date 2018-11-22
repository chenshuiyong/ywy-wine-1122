/**
 * Created by shijsh on 2018/5/19.
 */

/**
 * @功能:解析电子券列表
 */
function parse_ticket_list(res) {

    var list = res.data;

    var html = '';
    if(list.length!= 0){
        $.each(list, function (i, item) {
            html += '<div class="ticket_item">';
            html += '<a href="/preferentialCard/detail/' + item.itemCouponNo + '?dt='+(new Date()).getTime()+'">';
            html += '<div class="ticket_title">' + item.itemShopName + '</div>';
            html += '<div class="ticket_box">';
            html += '<div class="ticket_content">';
            html += '<div class="ticket_name">' + item.itemCouponName + '</div>';
            html += '<div class="ticket_company">' + (item.itemMallortenant == '2' ? item.itemShopName :item.itemPtenantName) + '</div>';
            html += '<div class="ticket_integral_date">';
            html += '<div class="ticket_integral"><span>' +parseInt(item.itemIntegral)  + '</span>积分</div>';
            html += '<div class="ticket_date">';
            html += ' <span class="date">有效期至' + item.itemEtime.substring(0,10) + '</span>';
            html += '<span class="to_ticket_detail">点击查看</span>';
            html += ' </div>';
            html += '</div>';
            if(item.itemViplevelName!=''&&item.itemViplevelName){
                if (item.itemViplevelName != '金钻卡') {
                    html +=' <div class="zhuanshu">'+item.itemViplevelName.split(";")[0]+'以上等级会员专属</div>'
                } else {
                    html += ' <div class="zhuanshu">金钻会员专享</div>'
                }
            }
            html += '</div>';
            html += '</div>';
            html += '</a>';
            html += '</div>';
        });

        $("#thelist").append(html);

        var ticket_width = parseInt($('.ticket_box').width());
        var content_width = parseInt(ticket_width * 0.5);
        var padding_l = 330 - content_width;
        $('.ticket_integral').css('padding-left', padding_l + 'px');
        listHeight = $('#thelist').height();
        myScroll.refresh();
    }else{
           $('#pullUp').hide();
        if(pageNo == 1){
            layer.msg('暂无电子券');
        }else{
            layer.msg('没有更多电子券了');
        }

    }

}


/**
 * @功能:解析实物礼品列表
 */
function parse_gift_list(res) {
    var html = '';
    var list = res.data;
    if(list.length!= 0){
        $.each(list,function(i,item){
            
            var ifFlag=item.itemIfflag;
            html += '<div class="gift_item">';
            html += '<a href="/gift/get?itemHactId='+item.itemHactId+  '&dt='+(new Date()).getTime()+'">';
            html += '<div class="top_line">';
            html += '<div class="gold_icon">';
            if (getVipLevel(item.itemViplevelName) == '金钻专享') {
                html += '<img src="/default/Index/img/integral/jz.png">';
            }else if(getVipLevel(item.itemViplevelName) == '钻石、金钻专享'){
            	html += '<img src="/default/Index/img/integral/jzzs.png">';
            }
            html += '</div>';
            html += '</div>';
            html += '<div class="gift_img" style="background-image:url('+basePicPath + item.itemPic +')">';
//            html += '<img src="'+basePicPath + item.itemPic + '">';
            html += '</div>';
            html += '<div class="gift_desc">' + item.itemGiftName + '</div>';
            html+='<div class="bottom_line">'
            html += '<div class="need_integral">';
            if(ifFlag==2){
                html+='<span class="num">' + item.itemIntegral + '</span>积分';
            }else if(ifFlag==1){
            	 html+='<span class="num">￥' + item.itemPayMoney + '</span>';
            }
            html+='<span class="original_price">￥'+ item.itemSelPrice + '</span>';
            html+='</div>';
            html += '<div class="left_num">';
            html += '库存: <span>' + item.itemSurplusQuantity + '</span>件';
            html += '</div>';
            html+='</div>';
            html += '</a>';
            html += '</div>';
            
        });
//        $("#thelist").append(html);
//        var size=$("#thelist").find(".gift_item").length;
        
        if(list.length%2>0){
            html+='<div style="width: 48.5%"></div>';
        }
        $("#thelist").append(html);
        
        var img_width = $('.gift_img img').width();
        $('.gift_img img').css('height', img_width);
        listHeight = $('#thelist').height();
        myScroll.refresh();
    }else{
        $('#pullUp').hide();
        if(pageNo == 1){
            layer.msg('暂无礼品');
        }else{
            layer.msg('没有更多礼品了');
        }

    }
};

