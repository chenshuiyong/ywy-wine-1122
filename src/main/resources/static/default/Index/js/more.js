/**
 * Created by shijsh on 2018/6/9.
 */


function parseWebLink(wechatlinks){
    var html = '';
    $.each(wechatlinks, function (i, item) {
        html += '<div class="item">';
        if( item.itemUrl.indexOf("http%3a%2f%2fnull") == -1){
            html += '<a href="' + item.itemUrl + '" onclick="_czc.push([\'_trackEvent\', \'' + moduleName+   '-' + item.itemName+'\', \'点击\']);">';

        }else{
            html += '<a href="#" onclick="showTipsPop();_czc.push([\'_trackEvent\', \'' +  moduleName+   '-' + item.itemName+'\', \'点击\']);">';

        }
        html += '<img src="'+BASE_PIC_PATH + JSON.parse(item.itemHomeLogo)[0].path + '">';
        html += '<p>'+item.itemName+'</p>';
        html += '</a>';
        html += '</div>';
    });

    $("#body").append(html);
}

/*
window.onload=function(){
    /!*按比例放大缩小*!/
    var scale = $(document).width()/(640*2);
    var viewport = "<meta name='viewport' content='width=640, initial-scale="+scale+",minimum-scale=0.5, maximum-scale=0.5, user-scalable=no'>";
    $("meta[name='viewport']").remove();
    $("head").prepend(viewport);
};*/

//提示弹框
function showTipsPop(obj){
    if(obj==null){
        obj={
            text:'暂未开放，敬请期待'
        }
    }
    $("#tips_pop_container span").text(obj.text);
    $("#tips_pop_container").fadeIn();
    setTimeout(function(){
        $("#tips_pop_container").fadeOut();
    },2000)
}