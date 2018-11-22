/**
 * Created by shijsh on 2018/5/19.
 */

//下拉刷新和上拉加载更多
var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset;

function loaded() {
    $('#has_load').val('1');
    //动画部分
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;
    myScroll = new iScroll('page_container', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
            }
        },
        onScrollMove: function () {

            if(this.maxScrollY >0){
                this.maxScrollY = -10;
            }
            
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载更多';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                var html = '<img src="/default/Index/img/loading.gif" style="width: 80px;height: 80px">';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = html;
                pullDownAction();   // Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                var html = '<img src="/default/Index/img/loading.gif" style="width: 80px;height: 80px">';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = html;
                pullUpAction(); // Execute custom function (ajax call?)
            }
        }
    });
    var winHeight = $(window).height();   //获取当前页面高度
    $(window).resize(function(){
        var thisHeight=$(this).height();
        if(winHeight - thisHeight >50){
            //当软键盘弹出，在这里面操作
            myScroll.refresh();
        }else{
            //当软键盘收起，在此处操作
            myScroll.refresh();
        }
    });
    loadAction();
}