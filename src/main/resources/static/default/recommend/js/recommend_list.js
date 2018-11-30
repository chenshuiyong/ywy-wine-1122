// recommend_list.js

$(".goto_rec").click(function(){
    location.href = '/rec/recommend';
});

function deleteById(id) {
    if(!id){
        commonMsg("推荐id不能为空")
        return false;
    }
    var data={};
    data.recId = id;
    data.isDelete = 0;
    commonComfirm("确认删除",deleteAjax,data);


}

function deleteAjax(data){
    commonAjax("/rec/updateStateOrDelete", data, function (result) {
        if(result){
            if(result.code==1){
                window.location.reload();
                commonMsg(result.msg);
            }else{
                commonMsg(result.msg);
                return false;
            }
        }
    });
}