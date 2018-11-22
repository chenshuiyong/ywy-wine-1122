// JavaScript Document
var globalVar = {};
$(function(){

	var ua = navigator.userAgent.toLowerCase();
	/*	if(ua.match(/MicroMessenger/i) != "micromessenger") {
	 layer.alert("请用微信打开此页面!")
	 var url  = 	window.location.href;
	 window.location.href= commonChangeDtUrl(url);
	 return ;
	 }*/

	var js_id=  getUrlParam("js_id");
	var  noJsId = $("#noJsId");
	/*	if($("#noJsId").length == 0){
	 //控制不同微信的ID 的访问
	 if((js_id != null && getCookie("jsessionId") != js_id) || (js_id== null &&  getCookie("jsessionId") !=null) ){
	 console.log(js_id);
	 console.log( getCookie("jsessionId") );
	 var url  = 	window.location.href;
	 window.location.href= commonChangeDtUrl(url);
	 return ;
	 }
	 }*/

	$("a").each(function (item) {
		if($(this).attr("href") && $(this).attr("href").indexOf("www.cnzz.com")>-1){
			$(this).hide();
		}else{
			var href = $(this).attr("href");
			if(href && href.indexOf("javascript") == -1  && href.indexOf("tel")==-1 && href.indexOf("#")==-1){
				href = changeUrlArg(href,"dt",(new Date()).getTime());
				href = addWeixinId(href);
				href = changeUrlArg(href,"js_id",getCookie("jsessionId"));
			}
			$(this).attr("href",href);
		}
	});

	var historyRefresh = $("#historyRefresh");
	if(historyRefresh && historyRefresh.val()!='0'){
		// 兼容 android
		var fullHref = window.location.href;
		history.replaceState(null, null,	commonChangeDtUrl(fullHref) );

		var isPageHide = false;
		window.addEventListener('pageshow', function () {
			if (isPageHide) {
				window.location.reload();
			}
		});
		window.addEventListener('pagehide', function () {
			isPageHide = true;
		});
	}


	/*	scale = $(document).width() / (640 * 2);
	 viewport = "<meta name='viewport' content='width=640, initial-scale=" + scale + ",minimum-scale=0.5, maximum-scale=0.5, user-scalable=no'>";
	 $("meta[name='viewport']").remove();
	 $("head").prepend(viewport);
	 $('body').css({width: "100%", margin: "auto", background: "#fff !important"});*/

	// View.scaleView();
	$('nav ul li a,.header ul li a,#nav .sub-nav-list a').each(
		function(){
			//alert('location='+location.href+',a.href='+$(this).attr('href'));
			if(location.href.indexOf($(this).attr('href'))>4){
				//$(this).css({background:'#dedfe0',color:'black'});
				$(this).attr('href',"javascript:void(0);");
			}
		}
	);
	$('.link-to').click(function(){
		location.href=$(this).attr('url');
	});
	$('.link-to').live('click',function(){
		location.href=$(this).attr('url');
	});



})


/*$(window).load(function(){

 });*/
$(window).on("orientationchange",function(event){
	if(window.orientation == 0) // Portrait
	{
		View.scaleView();
	}
	else // Landscape
	{
		//alert("Landscape");
	}
});
var Timer={
	interval:1000,
	timeDisCount:function(id,leftSecond){
		var _this=this;
		setInterval(function(){
			_this.showCountDown(leftSecond,id);
			leftSecond--;
		},Timer.interval);
		this.showCountDown=function(leftSecond,id)
		{
			/*var now = new Date();
			 var endDate = new Date(year, month-1, day);
			 var leftTime=endDate.getTime()-now.getTime();
			 var leftSecond = parseInt(leftTime/1000); */
			//var day1=parseInt(leftSecond/(24*60*60*6));
			var day1=Math.floor(leftSecond/(60*60*24));
			var hour=Math.floor((leftSecond-day1*24*60*60)/3600);
			var minute=Math.floor((leftSecond-day1*24*60*60-hour*3600)/60);
			var second=Math.floor(leftSecond-day1*24*60*60-hour*3600-minute*60);
			var cc = document.getElementById(id);
			if(cc){
				cc.innerHTML = day1+"天"+hour+"时"+minute+"分"+second+"秒";
			}
		}
	},
	getDate:function (strDate) {
		var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
				function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
		return date;
	}
};
var View={
	scaleView:function(){
		width=$(document).width();
		scale=width/parseFloat(640*2);
		//alert(width+","+scale);
		viewPort='<meta name="viewport" content="width=640, initial-scale='+scale+',minimum-scale='+scale+',maximum-scale='+scale+'" />';

		$('body').css({width:"640px",margin:"auto",background:"#fff !important"});
		$("meta[name='viewport']").remove();
		$('head').append(viewPort);
	}
};

/**
 * <p>替换URL中的某个参数的值</p>
 * @param url
 * @param arg
 * @param val
 * @returns {*}
 */
function changeUrlArg(url, arg, val){
	var pattern = arg+'=([^&]*)';
	var replaceText = arg+'='+val;
	return url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
}


//*以下为冗余函数 common中也有，部分页面只包含了 public.js 脚步
//读取cookies
function getCookie(name) {

	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}


function  commonChangeDtUrl(url){
	var thisUrl = url;
	if(url&&url.indexOf("javascript") == -1 && url.indexOf("#")==-1){
		thisUrl = addWeixinId(thisUrl);
		thisUrl = changeUrlArg(thisUrl,"js_id", getCookie("jsessionId"));
		thisUrl = changeUrlArg(thisUrl,"dt",(new Date()).getTime());
	}
	return thisUrl;
}


function addWeixinId(url){
	var thisUrl = url;
	if(typeof currWeixinId != 'undefined'  && currWeixinId != null){
		thisUrl = changeUrlArg(thisUrl,"weixin_id",currWeixinId);
	}
	return thisUrl;
}