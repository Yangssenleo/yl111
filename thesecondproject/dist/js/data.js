//主页数据加载
define(["jquery"], function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/data.json",
            success:function(result){
                //alert(result)
                var firstData = arr[0];
                var node = $('');
                

              
            },
            error:function(msg){
                console.log( msg );
            }

        })

        return {
            download:download,
            banner:banner
    
        }

})