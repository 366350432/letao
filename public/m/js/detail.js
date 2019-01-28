$(function(){
    //库存数量
    var kucunnum=0;
   var id= getParamsByUrl(location.href,"id");
   console.log(id);
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:id
        },
        success:function(res){
            console.log(res);
            kucunnum=res.num;
            var html=template("productTpl",res)
            console.log(html);
            $('#product-box').html(html);
            var html2=template("productTpl2",res);

            $('#product-box2').html(html2);
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });
    $('#product-box').on('tap','.size span',function(){
        $(this).addClass('active').siblings('span').removeClass('active');
    });

    var oInp = $('#inp');

    $('#increase').on('tap',function(){
        var num=oInp.val();
        num++;
        if(num>kucunnum){
            num=kucunnum;
        }
        oInp.val(num);

    });
    $('#reduce').on('tap',function(){
        var num=oInp.val();
        num--;
        if(num<1){
            num=1;
        }
        oInp.val(num);
    });
    /**
     * 加入购物车
     * 1.获取加入购物车按钮 并添加点击事件
     * 2.判断用户是否选择尺码
     * 3.调用加入购物车接口
     * 4.
     */
});