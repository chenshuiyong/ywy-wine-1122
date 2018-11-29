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
    commonAjax("/rec/updateStateOrDelete", data, function (result) {
        if(result){
            commonMsg(result.msg);
            if(result.code==1){
                window.location.reload();
            }else{
                return false;
            }
        }
    });
}
