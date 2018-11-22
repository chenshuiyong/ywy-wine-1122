window.onload=function(){
    /*按比例放大缩小*/
    scale = $(document).width()/(640*2);
    viewport = "<meta name='viewport' content='width=640, initial-scale="+scale+",minimum-scale=0.5, maximum-scale=0.5, user-scalable=no'>";
    $("meta[name='viewport']").remove();
    $("head").prepend(viewport);
    $('body').css({width:"100%",margin:"auto",background:"#fff !important"});
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
    $("body").show();
}