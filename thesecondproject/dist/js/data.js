//主页数据加载
define(["jquery"], function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/data.json",
            success:function(arr){
                //alert(result)
                var firstData = arr[0];
                var node = $('');
                node.appendTo();
                //通过循环添加子元素在页面上
                for(var i=0;i<firstData.childs.length;i++) {
                    $('').appendTo(node.find(""));

                }
                 //后续部分数据的加载
                 for(var i=0;i<arr.length;i++) {
                      $('');

                      node2.appendTo();
                      //加载热门子商品数据
                      var hotChilds = arr[i].hotChilds;
                      for(var k=0;k<hotChilds.length;k++) {
                          $('').appendTo(node2.find("").eq(0));
                          
                          
                          //实现第二部分的子商品数据
                          var childs = arr[i].childs;
                           for (var i=0;i<childs.length;i++) {

                           } 

                      }  

                 }
              
            },
            error:function(msg){
                console.log( msg );
            }

        })
    }
        

        //通过事件委托添加移入移出函数
        fuction tabMenu(){
            $("").on("mouseenter", , function(){
                $(this).addClass("").silblings("li").removeClass("");

                //同时切换显示商品的内容
                $(this).closest("").find("").addClass("hide").eq($(this).index()).removeClass("hide");


            })
        }

    

        return {
            download:download,
            banner:banner
    
        }

})