//获取地址栏中用户输入的关键字
var keyWord=getParamsByUrl(location.href,'keyWord');
//当前页
var page=1;
//页面中的数据
var html ="";
//按价格排序 升序
var priceSort=1;
//销量排序 升序
var salesSort=1;

//改变this指向
var This=null;
$(function(){

    /**
     * 根据用户输入的关键字获取搜索结果
     * 1.获取到地址栏中用户输入的搜索关键字
     * 2.用关键字去调取索接口
     * 3.将搜索结果展示在页面中
     */

    console.log(keyWord);
    
    mui.init({
        pullRefresh : {
          container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :getDate //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });
    //callback 页面一上来的时候 会自动调用一次
    //当页面上拉到底部时 还会继续调用


    /**
     * 按照价格对商品进行排序
     * 1.对价格按钮添加轻敲事件
     * 2.将价格排序规则传递到接口中
     * 3.对之前的各种配置进行初始化
    *     3.1页面中的数据要清空
    *     3.2恢复当前页的值为1
    *     3.3重新开启前上拉加载
     * 4.将排序后的结果重新展示在页面中
     */

      $('#priceSort').on('tap',function(){

        //更改价格排序条件
            priceSort = priceSort == 1 ? 2 : 1;
            //3.
            html = "";

            page = 1;

            mui('#refreshContainer').pullRefresh().refresh(true);

            getDate();
      })

      /**
       * 按照销量对商品进行排序
       * 1.对销量按钮添加轻敲事件
       * 2.将价格排序规则传递到接口中
       * 3.对之前的各种配置进行初始化
       *   3.1页面中数据要清空
       *   3.2恢复当前页的值为1
       *   3.3重新开启上拉加载
       * 4.将排序后的结果重新展示在页面中
       */
      $('#salesSort').on('tap',function(){
        
        //更改销量排序条件
        if(salesSort == 1){
            salesSort=2;
        }else{
            salesSort=1;
        }

        html = "";

        page = 1;

        mui('#refreshContainer').pullRefresh().refresh(true);

        getDate();

      });

});





function getDate(){
   if(!This){
        This=this;
    }
    $.ajax({
        url:'/product/queryProduct',
        type:'get',
        data:{
            page:page++,
            pageSize:4,
            proName:keyWord,
            price:priceSort,
            num:salesSort
        },
        success:function(res){
            console.log(res);
            if(res.data.length>0){
                html+=template('searchTpl',res);
                // console.log(html);
                $('#search-box').html(html);
                
                //告诉上拉加载组件当前数据加载完毕
                This.endPullupToRefresh(false);
            }else{
                //告诉上拉加载组件当前数据加载完毕
                This.endPullupToRefresh(true);
            }
        }

    })
}