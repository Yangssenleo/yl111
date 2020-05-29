console.log("加载成功");

//引入当前页面需要用的模块
require.config({

    paths:{
        "jquery":"jquery-1.11.3.js"
         //用到首页导航部分的js模块
        "nav":"nav",
        "goodsList":"goodsList"


    }
})


require(["nav", "goodsList"], function(nav, goodsList){

    nav.leftNavDownload();

    goodsList.download();
    goodsList.banner();

} )