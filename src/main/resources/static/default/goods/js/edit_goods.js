var sendFlag = true;

function check_form(data) {
    if (!data.goodsName) {
        commonMsg('商品不能为空');
        return false;
    }
    if (!data.goodsNo) {
        commonMsg('商品编号不能为空');
        return false;
    }
    if (!data.bid) {
        commonMsg('商品进价不能为空');
        return false;
    }
    if (!data.price) {
        commonMsg('商品售价不能为空');
        return false;
    }
    if (!data.inventory) {
        commonMsg('商品库存不能为空');
        return false;
    }
    return true
}

/*提交数据*/
function submit() {
    var data = getFormValues("dataInfo");
    if (!check_form(data)) {
        return
    }
    commonAjax("/goods/add", data, function (result) {
        if(result){
            if(result.code==1){
                commonMsg(result.msg);
                location.href = '/goods/goods_list/';
            }else{
                commonMsg(result.msg);
                return false;
            }
        }
    });
}

