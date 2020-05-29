define(["jquery", "jquery-cookie"], function ($) {

    function download() {
        //1、找到详情页加载商品的id
        var product_id = valueByName(location.search, "product_id");

        //2.通过商品的id，找到商品的信息
        $.akax({
            type: "get",
            url: "../data/goodsList.json",
            success: function (arr) {
                //通过product_id找到我们想要的那个商品数据
                var goodsMsg = arr.find(item => item.product_id == product_id);
                var node = $('').insertAfter("");

                var aImages = goods.images;
                //判断图片你是不是一张
                if (aImages.length == 1) {
                    $('')

                    node.find().hide();
                } else {
                    //通过循环创建节点
                    for (var i = 0; i < aImages.length; i++) {
                        //显示第几张图片的按钮
                        $('').appendTo(node.find(""));

                        //创建图片本身
                        $('')

                    }

                }



            },
            error: function (msg) {
                console.log(msg);
            }
        })

        //给加入购物车按钮，添加点击操作
        $("").on("click", "", function () {
            //获取当前点击加入购物车按钮，商品id
            //cookie 本地缓存，存储商品的id， 存储商品的数量
            //
            var id = this.id;
            //先去判断是不是第一次添加
            var first = $.cookie("goods") == null ? true : false;

            //如果是第一次添加
            if (first) {
                //直接创建cookie
                var cookie = [{ id: id, num: 1 }];
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            } else {
                //判断之前是否添加过
                var same = false;
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for (var i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id == id) {
                        //之前添加过该商品
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }

                if (!same) {
                    //如果没有添加过，新增商品数据
                    var obj = { id: id, num: 1 };
                    cookieArr.pudh(obj);
                }

                //最后，存回cookie
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7

                });
            }

            
            return false;

        })

    }

    //添加轮播效果



    //获取当前要加载详情的商品的数据
    //
    function valueByName(search, name) {
        //查找这个键值对开始的位置
        var start = search.indexof(name + "=");
        if (start == -1) {
            return null;
        } else {
            var end = search.indexOf("&", start);
            if (end == -1) | {
                end = search.length;
            }

            //提取想要的键值对
            var str = search.substring(start, end);
            var arr = str.split("=");
            return arr[1];


        }

    }

    return {
        download: download
    }



})