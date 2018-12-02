// recommend_list.js

$(".goto_rec").click(function(){
    location.href = '/rec/recommend';
});

function changeState(id,state) {
    if(!id){
        commonMsg("推荐id不能为空")
        return false;
    }
    var data={};
    data.recId = id;
    data.state = state;
    var msg;
    switch (state)
    {
        case 2:
            msg="确认开始联系客户";
            break;
        case 3:
            msg="确认与客户开始合作";
            break;
        case 4:
            msg="确认客户付款成功";
            break;
        case 5:
            msg="确认向推荐人发送奖励";
            break;
    }
    commonComfirm(msg,deleteAjax,data);
}

function deleteAjax(data){
    commonAjax("/rec/updateStateOrDelete", data, function (result) {
        if(result){
            if(result.code==1){
                layer.alert(result.msg, {
                    closeBtn: 0
                }, function(){
                    window.location.reload();
                });
            }else{
                commonMsg(result.msg);
                return false;
            }
        }
    });
}
function workFail(id) {
    if(!id){
        commonMsg("推荐id不能为空")
        return false;
    }
    var data={};
    data.recId = id;
    layer.open({
        title:'失败原因',
        type: 1,
        skin: 'layui-layer-demo', //加上边框
        area: ['300px', '200px'], //宽高
        content: htmlInfo(),
        btn: ['提交'],
        yes: function(index, layero){
            failReason(index,data);
        }
    });
}
// 弹窗内容
function htmlInfo(){
    var htmlInfo="";
    htmlInfo+= "<div class=\"inputinfo\">"
    // htmlInfo+= " <p>请正确输入您的联系电话</p>"
    htmlInfo+= " <input type=\"text\" style=\"font-size: 14px;WIDTH: 80%;margin: 30px 0px 0px 29px;\" MAXLENGTH=\"500\" id=\"failReason\"  placeholder=\"请输入失败原因（如联系不到人）\"> </div>"
   // htmlInfo+= " <div class=\"inputinfo\">"
    // htmlInfo+= " <div class=\"inputinfo\"><p>验证码</p>"
   // htmlInfo+= " <input class=\"code\"  type=\"text\" style=\"font-size: 14px;WIDTH: 50%;margin: 0px 0px 0px 29px;\" id=\"code\"  MAXLENGTH=\"6\" onkeyup=\"this.value=this.value.replace(/[^0-9]/g,'')\" onafterpaste=\"this.value=this.value.replace(/[^0-9]/g,'')\" placeholder=\"验证码\"><button onclick=\"sendCode()\" id=\"getcode\"  class=\"getcode\">获取验证码</button></div>"
    // htmlInfo+= " <button class=\"savebtn\" type=\"button\" name=\"button\">提交</button>";
    return htmlInfo;
}

// 修改手机
function failReason(index,data){
    data.failReason = $("#failReason").val();
    if (!data.failReason) {
        commonMsg("请输入失败原因");
        return false;
    }
    commonAjax("/rec/update", data, function (result) {
        if (result) {
            if (result.code == 1) {
            //    layer.close(index);
                layer.alert(result.msg, {
                    closeBtn: 0
                }, function(){
                    window.location.reload();
                });
            } else {
                commonMsg(result.msg);
                return false;
            }
        }
    });
}