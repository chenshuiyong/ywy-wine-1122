/**
 * Created by shijsh on 2018/6/27.
 */

var globalVar = {};
var pageNo = 1,totalPages = 0,currentId = '';
$(window).scroll(function(){
    if ($(document).height() - $(this).scrollTop() - $(this).height()<120) {
        loadMore();
    }
});

function loadMore(){
    if(pageNo  >= totalPages){
        return;
    }
    pageNo = pageNo+1;

    var postUrl =url+'&pageNo='+pageNo+"&itemFloorId="+currentId;
    $(".tips").show();
    $.get(postUrl, {}, function (res) {
        console.log(res);
        if(res.success){
            loadData(res.data);
            $(".tips").hide();
        }
    }, 'json');
}

//高度自适应
$(function () {

    var current= $("#currentFloor").html();
    if(current == ''){
        var  cFloor = $("#show-select li").eq(0);
        $("#currentFloor").html(cFloor.text())
        var floorId = cFloor.attr("id");
        $("#map-"+floorId).show();
        var postUrl = url +"&itemFloorId="+cFloor.attr("id");
        cFloor.addClass("selected");
        ajax_post(postUrl,loadData);
        currentId = floorId;
    }

    //类型选择
    $(".selfloor").click(function(){

        $(".selfloor").each(function (item) {
            $(this).removeClass('selected');
            var tId = $(this).attr("id");
            $("#map-"+tId).hide();
        });

        var iText  = $(this).html();
        $("#currentFloor").html(iText);

        var floorId = $(this).attr("id");
        $(this).addClass("selected");
        var postUrl = url +"&itemFloorId="+floorId;

        $("#dynamicAdd").html('');
        ajax_post(postUrl,loadData);
        //改变列表
        $("#map-"+floorId).show();

        currentId = floorId;
    });

    $("#floor").hide();

    $("#floor_list").click(function(){
        if($("#floor").is(":hidden")){
            //显示
            $("#floor").show();
            $("#map").hide();
            $("#floor_list").text('列表');
        }else{
            $("#floor").hide();
            $("#map").show();
            $("#floor_list").text('地图');
        }
    });

    globalVar.flag = true;
    $("#current-select-tenant").click(function(event){
        event.stopPropagation();
        if(globalVar.flag){
            globalVar.flag = false;
            $("#show-select").slideDown('fast');
            $(this).toggleClass('sub-nav-list-on');
            $(this).children("i.Arrow").css("background","url(/default/CommercialGuide/4.png) no-repeat");
            $("#fade").show();
        }else{
            $(this).toggleClass('sub-nav-list-on');
            $("#show-select").slideUp('fast',function(){
                globalVar.flag = true;
            });
            $(this).children("i.Arrow").css("background","url(/default/CommercialGuide/1.png) no-repeat");
        }
    });
    $("#fade").click(function(){
        $(this).hide();
        $("#current-select-tenant").trigger("click");
    })
    $(".search-icon").click(function(){
        if($(".form").css("display")=="none"){
            $(".pre-form").show();
            $(".form").show();
        }else{
            $(".pre-form").hide();
            $(".form").hide();
        }
    })

});

/***
 * <p>加载数据</p>
 * @param res
 */
function loadData(res){
    var data =res.data;
    totalPages = res.totalPages;
    var html = '';
    $.each(data,function(i,item){
        html += '<a href="/tenant/detail?itemTenantId=' + item.itemTenantId + '" class="weui-media-box weui-media-box_appmsg">';
        html += '<div class="floor">      <dl class="dealHeight">  ' +
            ' <dt class="center float_left"><img src="'+ basePicPath +item.itemTenantLogo +'" /></dt> '+
            ' <dd class="float_left"> ' +
            '    <ul class="introduce"> ' +
            '   <li class="jiacu" style="color: #000;"> '+ item.itemTenantZname  ;

        if(item.itemIfarranging!=''){
            html += '<span style="display:none;" class="has-row yu">排</span>';
        }
        if(item.itemState == ''){
            html += '<span style="display:none;" class="has-new te">新</span>';
        }
        if(item.itemHasPref != 0){
            html+='<span style="display:none;" class="has-pref hui">惠</span>';
        }
        if(item.itemHasRedpacket !=0){
            html+='<span style="display:none;" class="has-red huo">红</span>';
        }

        html+="</li>";
        html+='<li><span>主营:</span><span>'+ item.itemBusiness+'</span></li>';
        html+='<li><span>位置:</span><span>'+item.itemShopNo+'</span></li>';
        html+='<li><span>电话:</span><span><a href="'+item.itemtenantTel+'">'+ item.itemtenantTel+'</a></span></li>';
        html+='</ul>';
        html+='  <div class="clear"></div> </dd> <div class="clear"></div> </dl> </div>';
        html+= '</a>';
    });
    $("#dynamicAdd").append(html);

}
$("#dianji").click(function () {
    $(this).addClass("purple");
    $("#floor_list").removeClass("purple");
    $("#content .floor").hide();
    $("#content .plane").show();
});