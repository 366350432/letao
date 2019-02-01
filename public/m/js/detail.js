$(function(){
    //库存数量
    var kucunnum=0;
    //选择尺寸
    var size=null;
    //产品id
   var id= getParamsByUrl(location.href,"id");
   var productId=0;
   console.log(id);
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:{
            id:id
        },
        success:function(res){
            console.log(res);
            //库存数量
            kucunnum=res.num;
            //产品id
            productId=res.id;

            var html=template("productTpl",res)
            // console.log(html);
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
        //用户选择的尺码
        size=$(this).html();
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
     * 4.提示用户 加入购物车成功 是否跳转到购物车页面
     */

    $('#addCart').on('tap',function(){
        if(!size){
            alert("请选择尺码")
            return;

        }
        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{
                productId:productId,
                num:kucunnum,
                size:size
            },
            success:function(res){
                if(res.success){
                    mui.confirm("加入购物车成功,跳转到购物车?",function(message){
                        console.log(message);
                    })
                }
                console.log(res);
            }
        });
    })    

});