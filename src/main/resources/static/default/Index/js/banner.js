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

var imgs=$('#banner_content ul li');
var cArr=[];
var html='';
imgs.each(function (i,item) {
    if(i==0){
        $(item).addClass('current_img');
        html+='<span class="blue"></span>';
        cArr.push('current_img');
    }else if(i==1){
        $(item).addClass('next_img');
        html+='<span></span>';
        cArr.push('next_img');
    }else if(i==imgs.length-1){
        $(item).addClass('previous_img');
        html+='<span></span>';
        cArr.push('previous_img');
    }else{
        $(item).addClass('no_show');
        html+='<span></span>';
        cArr.push('no_show');
    }
})
$('#banner_buttons').html(html);
init_slider_event();

var $s = $("#banner_buttons span");
var banner_index=0;

/**
 * 下一张图片
 * */
function nextImg() {
    var imgs=$('#banner_content ul li');
    cArr.unshift(cArr[imgs.length-1]);
    cArr.pop();
    $("#banner_content ul li").each(function (i, e) {
        $(e).removeClass().addClass(cArr[i]);
    })
    $('#point' + banner_index).removeClass('blue');
    banner_index++;
    var obj = $('#point' + banner_index).attr('id');
    if(obj){
        $('#point' + banner_index).addClass('blue');
    }else{
        $('#point' + 0).addClass('blue');
    }
    if (banner_index>imgs.length-1){
        banner_index = 0;
    }
    show();
    init_slider_event();
}

/**
 * 前一张图片
 * */
function preImg() {
    var imgs=$('#banner_content ul li');
    cArr.push(cArr[0]);
    cArr.shift();
    $("#banner_content ul li").each(function (i, e) {
        $(e).removeClass().addClass(cArr[i]);
    })
    banner_index--;
    if(banner_index<0){
        banner_index = imgs.length-1;
    }
    show();
    init_slider_event();
}
//改变轮播图导航点的背景色
function show(){
    $("#banner_buttons span").eq(banner_index).addClass("blue").siblings().removeClass("blue");
}
//自动播放功能
//进入页面自动开始定时器
timer=setInterval(nextImg,3000);

/**
 * 绑定滑动事件监听
 */
function init_slider_event() {
    $('.current_img img').unbind();
    $(".current_img img").one("touchstart", function(e) {
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        startX = e.originalEvent.changedTouches[0].pageX, startY = e.originalEvent.changedTouches[0].pageY;
    });

    $(".current_img img").one("touchend", function(e) {
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        moveEndX = e.originalEvent.changedTouches[0].pageX, moveEndY = e.originalEvent.changedTouches[0].pageY,
            X = moveEndX - startX,
            Y = moveEndY - startY;
        //左滑
        if ( X > 0 ) {
            preImg();
        }
        //右滑
        else if ( X < 0 ) {
            nextImg();
        }
        //下滑
        else if ( Y > 0) {
            // alert('下滑');
        }
        //上滑
        else if ( Y < 0 ) {
            // alert('上滑');
        }
        //单击
        else{
            // alert('单击');
        }
    });
}