
/*
function logout() {
    location.href = '/logout';
}
*/

// 弹窗内容
function logout(){
    commonComfirm(msg,deleteAjax,data);

/*
    // 确认框
    var index = layer.confirm('确认退出', {
        btn : [ '确定', '取消' ]
        // 按钮
    }, function() {
        // 关闭弹窗
        parent.layer.close(index);
    }, function() {
    });
*/

    location.href = '/logout';
}
