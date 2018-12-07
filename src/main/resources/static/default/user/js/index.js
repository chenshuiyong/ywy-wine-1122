(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

function back() {
    history.go(-1);
}

function more() {
    location.href = '/more';
}
$("#product").click(function(){
    location.href = '/goods/goods_list';

});

function recList(state) {
    if (state){
        location.href = '/recList?state='+state;
    } else {
        location.href = '/recList';
    }

}

$("#recList").click(function(){
    location.href = '/recList';

});
// 弹窗内容
function logout(){
    // 确认框
    var index = layer.confirm("<samp style='font-size: 15px;color: #333'>确认退出登录？</samp>", {
        btn : [ '确认','取消' ]
        // 按钮
    }, function() {
        location.href = '/logout';
    }, function() {
        layer.close(index);
    });

}
