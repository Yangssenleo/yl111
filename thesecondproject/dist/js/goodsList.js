
define(["jquery"], function($){
    //数据下载
    function download(){
       $.ajax({
           type:"get",
           url:"../data/goodsList2.json",
           success:function(arr){
                $('').appendTo("");

                //创建小图商品
                for (var i=0;i<arr.length; i++) {
                    //，每两个商品创建一行
                    if (i % 2 != 0) {
                         var row = $('');
                         row.appendTo("");
                    }
                    $('')
                }
           },
           error:function(msg){
               console.log(msg);
           }
       })
    }
    
    //实现商品列表页轮播图效果
    function banner(){
        //获取页面上所有的图
        var oDiv = $("");

        //获取页面上所有的按钮
        var aBtns = $("");

        //设置当前显示图片的下标
        var iNow = 0;
        var timer = null;

        //给页面上所有按钮添加点击
        aBtns.click(function() {

            $(this).index();
            iNow = $(this).index();

            return false;//阻止a链接的默认行为

        })

        timer = setInterval(function(){
            iNow++;
            tab();
        },2000);


        //切换函数
        function tab(){
            aBtns.removeClass("").eq(iNow).addClass("");
            if ( iNow == aBtns.size() ) {
                  aBtns.eq(0).addClass("");
            }

            oDiv.animate({left:-2560 * iNow},1000, function(){
                //最后一张图片动画结束的时候
                if(iNow == aBtns.size()) {
                    iNow = 0;
                    oDiv.css( "left" , 0);
                }
            });
        }


        //给整个轮播图控件添加移入移出
        $(""),mouseenter(function(){
            clearInterval(timer);
        })
        $("").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000);
    
        })


    }


    return {
        download:download
        banner:banner
    }


} )