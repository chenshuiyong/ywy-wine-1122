package com.ywy.controller;

import com.ywy.domain.Constant;
import com.ywy.domain.Message;
import com.ywy.domain.ProGoods;
import com.ywy.domain.UsrUser;
import com.ywy.exception.WorkException;
import com.ywy.service.ProGoodsService;
import com.ywy.service.UsrUserService;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Administrator on 2017/8/16.
 */
@Controller
@RequestMapping(value = "/goods")
public class ProGoodsController {

    /**
     * 日志
     */
    private static final Logger LOG = LoggerFactory.getLogger(ProGoodsController.class);

    @Autowired
    private ProGoodsService proGoodsService;

    @RequestMapping(value = "/goods_list")
    public String idnex(HttpServletRequest request, Model model) {
        return "/goods/goods_list";
    }

    @ResponseBody
    @RequestMapping(value = "/list")
    public Message list(HttpServletRequest request) {
        List<ProGoods> list = proGoodsService.selectAllGoods(1, 100);
        //  会员信息
        return Message.success(list);
    }

    @ResponseBody
    @RequestMapping(
            value = "/add",
            produces = {"application/json;charset=UTF-8"})
    public Message add(HttpServletRequest request, ProGoods goods) {
         UsrUser user = (UsrUser) request.getSession().getAttribute(Constant.USER_BY_USERNAME);
         if (user == null){
             return Message.failure("失败");
         }
         if (goods.getGoodsId() ==null){
             goods.setUserId(user.getUserId());
             proGoodsService.insert(goods);
         }else {
             proGoodsService.updateByPrimaryKey(goods);
         }

         return Message.success();
    }

    @RequestMapping(value = "/detial/{goodsId}", produces = {"application/json;charset=UTF-8"})
    public String detial(
            @PathVariable("goodsId") int goodsId, HttpServletRequest request, Model model) {
        ProGoods goods = proGoodsService.selectByPrimaryKey(goodsId);
        model.addAttribute("goods", goods);
        return "/goods/goods_detail";
    }

    @RequestMapping(value = "/add_goods")
    public String addGoods(HttpServletRequest request, Model model) {
        model.addAttribute("goods", new ProGoods());
        return "/goods/edit_goods";
    }
    @RequestMapping(value = "/edit/{goodsId}", produces = {"application/json;charset=UTF-8"})
    public String edit(
            @PathVariable("goodsId") int goodsId, HttpServletRequest request, Model model) {
        ProGoods goods = proGoodsService.selectByPrimaryKey(goodsId);
        model.addAttribute("goods", goods);
        return "/goods/edit_goods";
    }
}
