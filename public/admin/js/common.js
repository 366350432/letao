
//登录拦截
$.ajax({
	url:'/employee/checkRootLogin',
	type:'get',
	success:function(res){
		console.log(res);
	}
});

$(function(){
	
	/**
	 * 退出
	 * 1.获取退出按钮并且添加点击事件
	 * 2.调用退出接口实现退出功能
	 */
	$('.login_out_bot').on('click',function(){
		if(confirm("确定要退出吗?")){
			$.ajax({
				url:'/employee/employeeLogout',
				type:'get',
				success:function(res){
					if(res.success){
						location.href="login.html";
					}else{
						alert(res.message);
					}
					//console.log(res);
				}
			});
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//导航特效
	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});