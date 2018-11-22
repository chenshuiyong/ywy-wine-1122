/**
 * Created by Administrator on 15-5-18.
 */


/* 弹窗的定位设置 */

/* 定位到页面中心 */
function adjust(id) {
    var w = $(id).width();
    var h = $(id).height();

    var t = scrollY() + (windowHeight()/2) - (h/2);
    if(t < 0) t = 0;

    var l = scrollX() + (windowWidth()/2) - (w/2);
    if(l < 0) l = 0;

    $(id).css({left: l+'px', top: t+'px'});
}

//浏览器视口的高度
function windowHeight() {
    var de = document.documentElement;

    return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
}

//浏览器视口的宽度
function windowWidth() {
    var de = document.documentElement;

    return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth
}

/* 浏览器垂直滚动位置 */
function scrollY() {
    var de = document.documentElement;

    return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}

/* 浏览器水平滚动位置 */
function scrollX() {
    var de = document.documentElement;

    return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
}

/*自定义弹窗遮罩层 s*/
function dialog(content){
    if(!(document.getElementById("disable-box"))){
        var note = document.createElement("div");
        note.setAttribute("id", "disable-box");
        note.setAttribute("class", "disable-box");
        note.innerHTML =
            '<div class="dialog-content" id="dialog-content">'+
            '<div class="dialog-message" id="dialog-message">'+content+'</div>'+
            '<div class="dialog-btn clearfix">'+
            '<a class="btn-confirm" onclick="hideDiv(\'disable-box\');">确定</a>'+
            '</div>'+
            '</div>';
        document.body.appendChild(note);
    }else{
        document.getElementById("dialog-message").innerHTML = content;
    }
    document.getElementById("disable-box").style.display = "block";
}
function hideDiv(dom){
    document.getElementById(dom).style.display = "none";
}
/*自定义弹窗遮罩层 e*/

/*自定义弹窗遮罩层1 s*/
function dialog1(content, callDetermine, callCancel){
    if(!(document.getElementById("disable-box1"))){
        var note = document.createElement("div");
        note.setAttribute("id", "disable-box1");
        note.setAttribute("class", "disable-box");
        note.innerHTML =
            '<div class="dialog-content" id="dialog-content1">'+
            '<div class="dialog-message" id="dialog-message1">'+content+'</div>'+
            '<div class="dialog-btn clearfix">'+
            '<a class="btn-confirm1 left" onclick="'+callDetermine+'">确定</a>'+
            '<a class="btn-confirm1 left" onclick="'+callCancel+'">取消</a>'+
            '</div>'+
            '</div>';
        document.body.appendChild(note);
    }else{
        document.getElementById("dialog-message1").innerHTML = content;
    }
    document.getElementById("disable-box1").style.display = "block";
}
function hideDiv1(){
    document.getElementById('disable-box1').style.display = "none";
}

/*自定义弹窗遮罩层 s*/
function dialog2(content, callDetermine){
    if(!(document.getElementById("disable-box2"))){
        var note = document.createElement("div2");
        note.setAttribute("id", "disable-box2");
        note.setAttribute("class", "disable-box2");
        note.innerHTML =
            '<div class="dialog-content2" id="dialog-content2">'+
            '<div class="dialog-message2" id="dialog-message2">'+content+'</div>'+
            '<div class="dialog-btn2 clearfix">'+
            '<a class="btn-confirm2" onclick="'+callDetermine+'">确定</a>'+
            '</div>'+
            '</div>';
        document.body.appendChild(note);
    }else{
        document.getElementById("dialog-message2").innerHTML = content;
    }
    document.getElementById("disable-box2").style.display = "block";
}
function hideDiv2(){
    document.getElementById('disable-box2').style.display = "none";
}
