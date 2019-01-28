$(function(){

    //恢复页面a元素跳转
    $('body').on('tap','a',function(e){
        e.preventDefault();
        
        mui.openWindow({
            url: $(this).attr('href')
        })

    })

});

/**
 * 获取地址栏中的参数
 * @param {string} url 地址栏字符串
 * @param {string} name 要获取的参数名称
 * @return {string}     参数名称对应的参数值  
 */
function getParamsByUrl(url,name,){
    
    var params = url.substr(url.indexOf('?')+1);

    params.split('&');
    
    var param =params.split('&');

    console.log(params.split('&'));

    for(var i=0;i<param.length;i++){
        
        var current= param[i].split('=');
        
        console.log(current);
        
        if(current[0]==name){
            
            return current[1];

        }
    }

    return null;
}