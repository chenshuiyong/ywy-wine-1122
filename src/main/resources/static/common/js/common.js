
// 格式化价格
function priceFormat(obj){
    if(obj.value.length > 13){
        obj.value = obj.value.substring(0,13);
    }
    obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
    obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字而不是
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
}
// 得到表单数据
function getFormValues(formId) {
    var result = {};
    var form = $('#' + formId);
    var inputs = form.find('input');
    for (var i = 0; i < inputs.length; i++) {
        var input = $(inputs[i]);
        var id = input.attr('id');
        if (id) {
            result[(id + '').replace(/form_/g, '')] = $.trim(input.val());
        }
    }
    var selects = form.find('select');
    for (var i = 0; i < selects.length; i++) {
        var select = $(selects[i]);
        var id = select.attr('id');
        if (id) {
            result[(id + '').replace(/form_/g, '')] = $.trim(select.val());
        }
    }
    var textareas = form.find('textarea');
    for (var i = 0; i < textareas.length; i++) {
        var textarea = $(textareas[i]);
        var id = textarea.attr('id');
        if (id) {
            result[(id + '').replace(/form_/g, '')] = $.trim(textarea.val());
        }
    }
    if (!result.Id) {
        delete result.Id;
    }
    return result;
};

function commonAjax(url, postData, successHandle, dataType, contentType, async, errorHandle, timeout, caculateHeight) {
    if (url == null) {
       layer.msg("Ajax 地址错误！");
    }
    if (successHandle == undefined || successHandle == null) {
        successHandle = "";
    }
    if (errorHandle == undefined || errorHandle == null) {
        errorHandle = "";
    }
    var op = {
        type : "POST",
        url : url,
        dataType : dataType ? dataType : 'json',
        data : postData,
        async : typeof (async) === "boolean" ? async : true,// 默认为true
        traditional : true,
        success : function(result) {
            try {
                var json = result;
                if (json == null) {
                    return;
                }
            // 如果 dataType为html 时 后台controller出现异常返回的是json时 需要转json做处理
                if (typeof (result) == "string") {
                    json = eval("(" + result + ")");
                }
            } catch (e) {
                console.log(e);
            }
            if (successHandle) {
                successHandle(result);
                /* 重新计算iframe页面高度 */
                try {
                    if(rs.iframe!=undefined){
                        rs.iframe.utils.setIframeHeight(caculateHeight);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText);
            if (errorHandle) {
                errorHandle();
                rs.framework.layer.msg(errorThrown + "\n" + XMLHttpRequest.responseText);
            }
        },
        complete : function(XMLHttpRequest, T) {
        }
    }
// op.timeout = 5 * 1000;
    if (timeout) {
        op.timeout = timeout;
    }
    if (contentType) {
        op.contentType = contentType;
    }
    $.ajax(op);
};

// 弹窗内容
function commonMsg(msg){
    var tipsInfo="";
    tipsInfo+="<samp style='font-size: 16px'>"+msg+"</samp>";
    layer.msg(tipsInfo);
}
function commonAlert(msg){
    var tipsInfo="";
    tipsInfo+="<samp style='font-size: 15px'>"+msg+"</samp>";
    layer.alert(tipsInfo);
}
// 录入成功
function commonComfirm(msg,callback,data){
    // 确认框
    var index = layer.confirm(setMsg(msg), {
        btn : [ '确认','取消' ]
        // 按钮
    }, function() {
        // 重载
        if(callback){
            callback(data);
        }
    }, function() {
        layer.close(index);
    });
}

// 弹窗内容
function setMsg(msg){
    var tipsInfo="";
    tipsInfo+="<samp style='font-size: 15px'>"+msg+"</samp>";
    return tipsInfo;
}
