//遵从AMD规范
define(["parabola", "jquery", "jquery-cookie"], function (parabola, $) {
    function download() {
        sc_num();
        sc_msg();
        //数据加载
        $.ajax({
            type: "get",
            url: "../data/data.json",
            success: function (arr) {
                // console.log(arr);

                for (var i = 0; i < arr.length; i++) {
                    $(`<li class="goods_item">
                    <div class="goods_pic">
                        <img src="${arr[i].img}" alt="">
                    </div>
                    <div class="goods_title">
                        <p>【京东超市】奥利奥软点小草莓1</p>
                    </div>
                    <div class="sc">
                        <div id="${arr[i].id}" class="sc_btn">加入购物车</div>
                    </div>
                </li>`).appendTo($(".goods_box ul"));
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    }


    //封装函数，点击加入购物车，完成购物车操作
    function addCarClick() {
        //通过事件委托给，所有加入购物车按钮，添加点击
        $(".goods_box ul").on("click", ".sc_btn", function () {
            //获取到当前点击的按钮，所在商品的id
            var id = this.id;
            //1、先去判断是否是第一次添加
            var first = $.cookie("goods") == null ? true : false;
            if (first) {
                var arr = [{ id: id, num: 1 }];
                $.cookie("goods", JSON.stringify(arr), {
                    expires: 7
                })
            } else {
                //2、判断之前是否添加过
                var cookieArr = JSON.parse($.cookie("goods"));

                var index = cookieArr.findIndex(item => item.id == id);
                if (index != -1) {
                    //添加过 数量+1
                    cookieArr[index].num++;
                } else {
                    //没添加过，新增数据
                    var obj = { id: id, num: 1 };
                    cookieArr.push(obj);
                }

                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }

            sc_num();
            sc_msg();

        })
    }

    //实现右侧购物车移入移出部分
    function handleHover() {
        $(".sc_right").mouseenter(function () {
            $(this).stop(true).animate({
                right: 0
            }, 500)
        }).mouseleave(function () {
            $(this).stop(true).animate({
                right: -270
            }, 500)
        })
    }

    //

    //购物车数量计算
    function sc_num() {
        var cookieStr = $.cookie("goods");
        if (cookieStr) {
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }
            $(".sc_right .sc_num").html(sum);
        } else {
            $(".sc_right .sc_num").html(0);
        }
    }

    //右侧购物车数据的加载
    function sc_msg() {
        var cookieStr = $.cookie("goods");
        if (cookieStr) {
            var cookieArr = JSON.parse(cookieStr);

            //异步数据串行
            new Promise(function (resolve, reject) {
                $.ajax({
                    type: "get",
                    url: "../data/data.json",
                    success: function (arr) {
                        resolve(arr);
                    },
                    error: function (err) {
                        reject(err);
                    }
                })
            }).then(function (arr) {
                var newArr = [];
                for (var i = 0; i < arr.length; i++) {
                    for (var j = 0; j < cookieArr.length; j++) {
                        if (arr[i].id == cookieArr[j].id) {
                            //添加商品数量
                            arr[i].num = cookieArr[j].num;
                            newArr.push(arr[i]);
                        }
                    }
                }

                //newArr加入购物车的数据
                var html = ``;
                for (var i = 0; i < newArr.length; i++) {
                    html += `<li id="${newArr[i].id}">
                    <div class="sc_goodsPic">
                        <img src="${newArr[i].img}" alt="">
                    </div>
                    <div class="sc_goodsTitle">
                        <p>这是商品曲奇饼干</p>
                    </div>
                    <div class="sc_goodsBtn">购买</div>
                    <div class="delete_goodsBtn">删除</div>
                    <div class="sc_goodsNum">
                        <div>
                            <button>+</button>
                            <button>-</button>
                            <span>商品数量：${newArr[i].num}</span>
                        </div>
                    </div>
                </li>`;
                }
                $(".sc_right ul").html(html);


            }).catch(function (err) {
                console.log(err);
            })
        }
    }

    //清空购物车的按钮添加点击
    $("#clearBtn").click(function () {
        $.cookie("goods", null);
        sc_num();
        $(".sc_right ul").html("");
    })


    //给购物车内的删除按钮添加点击事件
    $(".sc_right ul").on("click", ".delete_goodsBtn", function () {
        //清空购物车的数据  1、清空cookie中的这个值  2、清空页面的节点
        var id = $(this).closest("li").remove().attr("id");
        // alert(id);
        var cookieArr = JSON.parse($.cookie("goods"));
        for (var i = 0; i < cookieArr.length; i++) {
            if (cookieArr[i].id == id) {
                cookieArr.splice(i, 1);
                break;
            }
        }
        //判断数组是否为空
        if (!cookieArr.length) {
            $.cookie("goods", null);
        } else {
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
        }

        //更新购物车商品数量
        sc_num();

    })


    //通过事件委托，给购物车上的按钮+和按钮-添加事件
    $(".sc_right ul").on("click", "button", function () {
        var id = $(this).closest("li").attr("id");
        //更新cookie中的数据
        var cookieArr = JSON.parse($.cookie("goods"));
        //找出符合条件的数据的下标
        var index = cookieArr.findIndex(item => item.id == id);

        if (this.innerHTML == "+") {
            cookieArr[index].num++;
        } else {
            cookieArr[index].num == 1 ? alert("数量已经到1了") : cookieArr[index].num--;
        }
        $.cookie("goods", JSON.stringify(cookieArr), {
            expires: 7
        })

        //更改页面上的数据
        $(this).siblings("span").html("商品数量：" + cookieArr[index].num);

        sc_num();

    })




    return {
        download: download,
        addCarClick: addCarClick,
        handleHover: handleHover
    }
})