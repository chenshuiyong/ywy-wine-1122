/*
//初始状态，加载数据
function loadAction() {
//        /!*按比例放大缩小*!/
    var scale = $(document).width() / (640 * 2);
    var viewport = "<meta name='viewport' content='width=640, initial-scale=" + scale + ",minimum-scale=0.5, maximum-scale=0.5, user-scalable=no'>";
    $("meta[name='viewport']").remove();
    $("head").prepend(viewport);
    // 得到商品
    commonAjax("/goods/list", data, function (result) {
        if(result){
            if(result.code==1){
                var goodsList = result.data;
                parse_latest_tickets(goodsList)
            }else{
                return false;
            }
        }
    });
}*/

$(function () {
    // 得到商品
    commonAjax("/goods/list", {}, function (result) {
        if(result){
            if(result.code==1){
                var data = result.data;
                goodsList(data);
            }else{
                return false;
            }
        }
    });
});

/**
 * @功能:解析商品
 */
function goodsList(goodsList) {
    if(!isEmpty(goodsList)){
        var html = '';
        $.each(goodsList, function (i, item) {
            
            html +='<a href="/goods/detial/' + ( item.goodsId) + '">';
            html += '<div class="tickets_item">';
            html += '<img src="'+ item.itemPicPath +'" class="ticket_bg">';
            html += '<div class="ticket_info bt_a_column_flex">';
            html += '<div class="integral_expire">';
            html += '<div class="integral_num">';
            html += '<span class="num">'+ parseInt(item.price) +'</span>元</div>';
            
            html += '<div class="expire_date">'+item.bid  + '</div>';
            html += '</div>';
            html += '<div class="ticket_name">' + item.goodsName + '</div>';
            html += '<div class="market_and_detail bt_c_flex">';
            html += '<div>';
            html += '<div class="market_name"></div>';

            html+='</div>';
            html += '<div class="to_ticket_detail" onclick="goodsDetail(item.goodsId)">了解详情</div>';
            html += '</div>';
           
            html += '</div>';
            html += '</div>';
            html += '</a>';
        });
        $(".tickets_box").html(html);
    }else{
        $('#tickets').hide();
    }
}


function goodsDetail(goodsId) {
    location.href = '/goods/detial/'+goodsId;
}

$("#exchange_btn").click(function(){
    location.href = '/goods/add_goods';

});
