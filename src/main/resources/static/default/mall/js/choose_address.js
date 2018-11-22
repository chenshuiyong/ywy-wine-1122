    var all_city=[];
    window.onload = function () {
        /*按比例放大缩小*/
        var scale = $(document).width() / (640 * 2);
        var viewport = "<meta name='viewport' content='width=640, initial-scale=" + scale + ",minimum-scale=0.5, maximum-scale=0.5, user-scalable=no'>";
        $("meta[name='viewport']").remove();
        $("head").prepend(viewport);

        $.ajax({
            url: "/mall/listAddress",
            type: "post",
            dataType: 'json',
            beforeSend: function () {
                layer.load(2);
            },
            success: function (obj) {
                layer.close(layer.index);
                if(obj.code=="1"){
                    all_city=obj.data;
                    parse_list();
                }else{
                    alert(JSON.stringify(obj.data));
                }
            },
            error: function (xhr, status, errorThrown) {
                console.log(errorThrown)
            }
        });

    };

    function parse_list() {
        var html = '';
        html += '<div class="city-item">';
        $.each(all_city, function (i, item) {
            if(i==all_city.length-1){
                html += '<div class="item item_city" addr_id="'+item.id+'" consignee="'+item.ITEM_CONSIGNEE+'" phone="'+item.ITEM_CONSIGNEE_PHONE+'"  address="'+item.ITEM_CONSIGNEE_ADDR+'" style="border:none;">' + item.ITEM_CONSIGNEE +item.ITEM_CONSIGNEE_PHONE+item.ITEM_CONSIGNEE_ADDR+ '</div>';
            }else{
                html += '<div class="item item_city" addr_id="'+item.id+'" consignee="'+item.ITEM_CONSIGNEE+'" phone="'+item.ITEM_CONSIGNEE_PHONE+'"  address="'+item.ITEM_CONSIGNEE_ADDR+'">' + item.ITEM_CONSIGNEE +item.ITEM_CONSIGNEE_PHONE+item.ITEM_CONSIGNEE_ADDR+'</div>';
            }
        });
        html += '</div>';

        $('#city_list').html(html);

        $(".item_city").click(function () {
        	
            var address = $(this).attr('address');
            var consignee = $(this).attr('consignee');
            var phone = $(this).attr('phone');
            var addr_id = $(this).attr('addr_id');
            location.href='gift/exchange?&address='+address+'&addr_id='+addr_id+'&phone='+phone+'&consignee='+consignee
        });
    }

    //设置cookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    //获取cookie
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
    //清除cookie
    function clearCookie(name) {
        setCookie(name, "", -1);
    }