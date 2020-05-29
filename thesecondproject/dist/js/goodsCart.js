define(["jquery", "jquery-cookie"], function ($) {

    //加载已经加入购物车的商品
    /*
        cookie只存储商品的id和数量
        加载数据，必须使用商品的具体信息，数据源
            goodsCarList.json
            goodsList.json
        【注】找出加入购物车的商品的数据（详情）
        new Promise处理两次按照顺序加载数据


    */
    function loadCarData() {

        //清空
        $("").html("");


        new Promise(function(resolve, reject) {
            $.ajax({
                url:"../data/goodsCarList.json",
                success:function(obj){
                    resolve(obj.data);
                },
                error:function(msg) {
                    reject(msg);  
                }
            })
        }).then(function(arr1) {
              //下载第二份代码
        
            return new Promise(function(resolve, reject) {
                $.ajax({
                    url:"../data/goodsList2.json",
                    success:function(arr2){
                        //将两份数据合并
                        var newArr = arr1.concat(arr2);
                        resolve(  newArr );
                    },
                    error: function (msg) {
                          reject(msg);
                    }
                })
            })

        }).then(function(arr){
            //所有商品的信息，需要在页面上加载加入购物车的数据
            //通过已经加入购物车的商品找出这些数据，哪些被加载购物车里了
            //1、在购物车中将所有的数据拿到
            var cookieStr = $.cookie( "goods" );
            if ( cookieStr  ) {
                  var  cookieArr = JSON.parse(cookieStr);
                  var newArr = [];
                  for ( var i = 0; i < cookieArr.length; i++) {
                       for ( var j = 0; j < arr.length; j++  ) {
                            if ( cookieArr[i].id == arr[j].product_id  || cookieArr[i].id == arr[j].goodsid  ) {
                                  arr[j].num = cookieArr[i].num;
                                  //设置商品的id
                                  arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
                                  newArr.push(arr[j]);
                            }
                               
                       } 
                  }  

                  //newArr 存储都是购物车加载商品，商品的信息，商品的数量，商品id
                  //通过循环，加载到页面上
                  for(var i =0; i<newArr.length; i++) {
                       node.appendTo("");
                  }
                  
            }

        })

    }


        function download(){
            $.ajax({
                url: "../data/goodsCarList.json",
                success:function(obj) {
                     var arr = obj.data;
                     for(var i = 0; i < arr.length; i++) {
                         $('').appendTo("");
                     } 

                }, 
                error:funcion(msg){
                    console.log(msg);
                }
            })

        }

        function cartHover() {
             //事件委托添加
             $("").on("mouseenter", "" , function() {
                   $(this).find( "" ).css("display",  "block")
             }  ) 
             $("").on("mouseleave", "" , function() {
                $(this).find( "" ).css("display",  "none")
                   
            }  ) 


            //通过事件委托实现加入购物车操作
            $("").on("click", "", function(){
                var id = this.id;
                var first = $.cookie("goods") == null ? true : false;

                //如果是第一次添加
                if ( !first ) {
                    var cookieArr =  [{id:id, num:1}];
                    $.cookie("goods", JSON.stringify(cookieArr), {
                         expires: 7
                    } )
                } else {
                    var same = false;
                    var cookieStr = $.cookie( "goods" );
                    var cookieArr = JSON.parse( cookieStr );
                    for (  var i = 0;  i < cookieArr.length; i++ )  {
                          if ( cookieArr[i].id == id ) {
                               //说明之前添加过
                               cookieArr[i].num++;
                               same = true;
                               break; 
                          } 
                    }

                    if (!same ) {
                         var obj = {id:id, num:1};
                         cookieArr.push(obj); 
                    }

                    //最后数据存储会cookie
                    $.cookie("goods", JSON.stringify(cookieArr), {
                          expires:7 
                    } )

                }

                isCheckAll();
                return false;
            })

        }

        //全选按钮 和 单选按钮添加点击
        function checkFunc(){
            //全选
            $("").find("i").click(function(){
                //获取每一个单个选项商品的框
                var allChecks = $("").find("").find(i); 


                if($(this).hasClass("")) {
                    $(this).add(allChecks).removeClass("");
                } else {
                    $(this).add(allChecks).addClass("");
                      
                }
                isCheckAll();
            });

            //给每一个商品的复选框设置点击
            $("").on("click", "", function(){
                if($(this).hasClass("")) {
                    $(this).removeClass("");
                } else {
                    $(this).addClass("");
                }
                isCheckAll();

            })


        }

        //判断有多少个被选中
        function isCheckAll(){
            var allChecks = $("").find("");
            var isAll = true;
            var total = 0;
            var count = 0;
            var totalCount = 0;
            allChecks.each( function(index, item) {
                  if ( !$(item).find("").hasClass("") ){
                      //判断其中这商品没有被选中
                      isAll = false;
                  } else {
                      total += parseFloat($(item).find("").html().trim() ) * parseFloat($(this).find("").val());
                      //被选中的商品数量
                      count += parseInt($(this).find("").val());
                  }
                  //计算所有加购物车的商品一共有几件
                  totalCount += parseInt($(this).find("").val());

            } )

            //设置
            $("").html(count);
            $("").html(totalCount);
            $("").html(total);

            //判断是否是全选
            if(isAll){
                $("").find("i").addClass("")
            } else {
                $("").find("i").removeClass("")
            }

        }

        //给页面上的商品添加删除，或者数量增减的操作
        function changeCars() {
            //给每一个删除的按钮添加事件
            $("").on("click", "", function(){
                $(this).closest("").remove().attr("id");
                //在cookie中删除
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);

                for ( var i =0; i < cookieArr.length; i++) {
                     if ( id == cookieArr[i].id ) {
                           //删除数据
                           cookieArr.splice( i, 1 );
                           break; 
                     } 
                }
                cookie.length == 0? $.cookie( "goods", null ) : $.cookie("goods",JSON.stringify(cookieArr),  {
                    expires:7
                }  ) ;
                isCheckAll();
                return false;//阻止a标签的默认行为
            }  ) 
           
            //给每一个+和-添加事件
            $("").on("", "", function(){
                //找到所有商品的id
                var id = $(this).closest("").remove().attr("id");

                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);

                for ( var i = 0; i < cookieArr.length; i++) {
                      if ( cookieArr[i].id == id ) {
                           //说明该用户找到了
                           if ( this.className == "" ) {
                                cookieArr[i].num == 1 ? alert("数量已经为1， 不能再减少！") : cookieArr[i].num-- ; 
                           } else {
                               cookieArr[i].num++;
                           }
                           break;
                      }
                }

                //更新页面的商品

                $(this).siblings("").val(cookieArr[i].num);
                //更新一下页面上单个商品的价格
                var price = $(this).closest("").siblings("input").html().trim();

                $(this).closest("").siblings("").html( (price * cookieArr[i].num ).toFixed(1) + "元" )


                //最后要更改数据，存储到cookie

                $.cookie("goods", JSON.stringify(cookieArr), {
                      expires:7
                }  )

                //重新计算一次总价
                isCheckAll();
                loadCarData();

                 return false; 
            } )


        }    

        return{
            download:download，
            cartHover:cartHover，
            loadCarData:loadCarData,
            checkFunc:checkFunc
        }

})