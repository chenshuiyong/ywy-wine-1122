/**
 * Created by shijsh on 2018/5/31.
 */
var appId="";
var timestamp="";
var noncestr="";
var signature="";
var url="";
var logo="";
function initWeixinInfo(data){
    appId = data.appId;
    timestamp = data.timestamp;
    noncestr =data.noncestr;
    signature = data.signature;
    url = data.url;
    logo = data.logo;
    if(typeof(jsApiList) == "undefined"){
        jsApiList = [];
    }
   jsApiList.push("onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","getLocation","previewImage","checkJsApi","error","scanQRCode","closeWindow");
    wx.config({
        url:url,
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: noncestr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

}



//拼接分享链接id
function getWxData(source){
    var link = addWMaineixinId(redirectUrl);
    var wxData={
        link:link,
        imgUrl:logo,
        desc: "邀请注册",
        title:'邀请注册',
        success:function(){
            var postUrl= "/common/saveSharedLinkRecord?link="+linkUrl+"&shareId="+source+"&title="+$('title').html();
            ajax_post(postUrl)
        },
        cancel:function () {

        }
    };
    return wxData;
}
$(function(){
    ajax_post("/common/weixinInfo?uri="+encodeURIComponent(getRequestUrl()),initWeixinInfo);
    wx.ready(function(){
        wx.onMenuShareAppMessage(getWxData(50));    //分享给朋友
        wx.onMenuShareTimeline(getWxData(60));      //分享到朋友圈
        wx.onMenuShareQQ(getWxData(70));        //分享到qq
        wx.onMenuShareWeibo(getWxData(80));     //分享到微博
    });
});