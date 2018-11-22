/**
 * Created by shijsh on 2018/6/14.
 */
$(function(){
    var screen_height=$(window).height();
    $('.page_container').css('min-height',screen_height);
    var items_height=$('.page_container').find('.top_section').length*parseInt($('.top_section').css('height'));
    if(!items_height){
        $('#join_section').css('height',screen_height-94+'px')
    } else if(items_height<screen_height){
        $('#join_section').css('height',screen_height-items_height-94+'px')
    }else{
        $('#join_section').css('padding','120px 0')
    }

});
