console.log("加载成功");
//配置当前项目引入模块
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "goodsDesc":"goodsDesc"
    },
    shim:{
        //依赖关系
        "jquery-cookie":["jquery"]
    }
})

require(["nav", "goodsDesc" ],function(nav,goodDesc){
    nav.leftNavDownload();
    
} )