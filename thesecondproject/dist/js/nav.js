//处理首页导航部分 声明模块遵从AMD
define(["jquery"], function($){
    function download(){
        $.ajax({
            type:"get",
            url:"../data/nav.json",
            success:function(result){
                //alert(result)
                var bannerArr = result.banner;

                //通过循环将数据添加到页面上
                for(var i=0; i<bannerArr.length; i++) {
                    $('').appendTo("");
                    var node = $('');
                    if(i==0){
                        node.addClass("");
                    }
                    node.appendTo("");


                }
            },
            error:function(msg){
                console.log( msg )
            }

        })

        leftNavDownload();

    }

    //实现轮播图的轮播效果
    function banner() {
         var iNow = 0;
         var aImgs = null;
         var aBtns = null;

         var timer = setInterval(function(){
             iNow++;
             tab();
         },2500);

         //封装切换函数
         function tab(){
             if ( !aImgs ) {
                  aImgs = $("").find("a");
             }
             if(!aBtns) {
                 aBtns = $("").find("a");
             }
             if(iNow == 5) {
                 iNow = 0;

             }

             //图片切换
             aImgs.hide().css("opacity",0.2).eq(iNow).show().animate({
                 opacity:1
             },500);
             //小圆点按钮切换
             aBtns.removeClass("").eq(iNow).addClass("");

         }

         //添加鼠标的移入和移出
         $("").mouseenter(function(){
             clearInterval(timer);
         }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2500);
         })

         //点击小圆圈，可以完成，切换到对应的图片 [注意]事件委托
         alert("").find("a").size();
         $("").on("click","a", function() {
             iNow = $(this).index();
             tab();
            return false;

         })

        $("").click(function(){
            if ( this.className ==   "" ) {
                if(iNow == -1) {
                    iNow = 4;
                }
            } else {
                iNow++;
            }
        })

    }

    //侧边导航栏数据的加载
    function leftNavDownload(){
        $.ajax({
            url:"../data/nav.json",
            success:function(result){
                var sideArr = result.sideNav;
                for ( var i = 0; i < sideArr.length;i++ ) {
                     var node = $('');
                     node.appendTo(""); 

                     //取出当前这个选项对应的子节点
                     var childArr = sideArr[i].child;
                     //一共多少列，设置对应的class样式
                     var col = Math.ceil(childArr.length / 6 );
                     node.find("div.children").addClass("");
                    //通过循环，创建右侧上面的每一个数据
                    for(var j =0;j<childArr.length;j++) {
                        if ( j % 6 == 0) {
                            var newUl=$('');
                            newUl.appendTo(node.find("div.children"));

                        }

                        $('').appendTo(newUl);
                    }

                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }

    //给侧边导航添加移入切换的效果 选项卡的切换效果
    function leftNavTab(){
        
        //通过事件委托
        $("").on("mouseenter","category-item", function(){
            $(this).addClass("category-item-active");

        })
        $("").on("mouseleave","category-item", function(){
            $(this).removeClass("category-item-active");
            
        })

    }

    


    return {
        download:download,
        banner:banner,
        leftNavDownload:leftNavDownload,

    }

}) 
