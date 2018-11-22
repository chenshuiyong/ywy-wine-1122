
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);//阻止冒泡


//初始状态，加载数据
function loadAction() {
    get_search_result();
    myScroll.refresh();
}

//下拉刷新当前数据
function pullDownAction() {
    setTimeout(function () {
        //这里执行刷新操作
        $("#thelist").html('');
        pageNo=1;
        get_search_result();
        myScroll.refresh();
    }, 400);
}

//上拉加载更多数据
function pullUpAction() {
    setTimeout(function () {
        pageNo++;
        get_search_result();
        myScroll.refresh();
    }, 400);
}



$(function(){

    /*按比例放大缩小*/
//  /*按比例放大缩小*/
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

    $('#pullDown').hide();
    $('#pullUp').hide();

    $('#searchForm').on('submit', function (e) {
        e.preventDefault();
        pageNo=1;
        var search_key= $("#search_key").val();
        if(search_key==''){
            layer.msg('请输入搜索内容');
            return
        }
        if (regMatch(search_key)) {
            layer.msg('请勿输入#，+，<，>等特殊字符！');
            return;
        }
      //  $('#pullDown').show();
     //   $('#pullUp').show();
        $('#thelist').html('');
        if($('#has_load').val()==2){
            setTimeout(loaded, 0);
        }else{
            loadAction()
        }
        document.activeElement.blur();
    });


});