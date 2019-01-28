
// 页面的dom结构加载完成之后执行回调函数中的代码
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
       });
       $.ajax({
           url:'/category/queryTopCategory',
           type:'get',
           success:function(res){
               //模板引擎作用就是用来帮我们浆数据和html拼接好的结果返回给我们
                // console.log(res);
                // 将数据和html做拼接
                //(1)html模板ID
                //(2)数据
                //(3)告诉末班引擎html模板怎样进行拼接
                var html=template('category-first',{result:res.rows});
                // console.log(html);
                $('#links').html(html);
                //如果一级分类有数据的话
                if(res.rows.length){
                    //给第一个一级分类添加选中状态
                    $('#links').find('a').eq(0).addClass('active')
                    //获取第一个一级分类的ID
                    var id=res.rows[0].id;
                    $.ajax({
                        url:'/category/querySecondCategory',
                        type:'get',
                        data:{
                            id:id
                        },
                        success:function(res){
                            // console.log(res);
                            var html=template('category-second',res);
            
                            $('.brand-list').html(html);
                            // console.log(html);
                        }
                      });
                }
           }
       });

       //获取一级分类数据
       /*
       点击一级分类获取二级分类的数据
       1.一级分类添加点击事件
       2.在事件处理函数中获取到一级分类的id
       3.调用二级分类的接口获取对应的数据
       4.讲数据展示到对应的数据中
       5.如果接口中没有数据要在页面中显示暂无数据
       
       */
      //1
      $('#links').on('click','a',function(){
          //2.获取点钱电机的一级分类的ID
          var id=$(this).attr('data-id');
          //给当前点击的一级分类添加选中状态
          $(this).addClass('active').siblings().removeClass('active');
        //   console.log(id);
          getSecondCategory(id)
      })
});

function getSecondCategory(id){
    //3调用接口获取数据
    $.ajax({
        url:'/category/querySecondCategory',
        type:'get',
        data:{
            id:id
        },
        success:function(res){
            // console.log(res);
            var html=template('category-second',res);

            $('.brand-list').html(html);
            // console.log(html);
        }
      });
}



































