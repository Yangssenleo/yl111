console.log("加载成功");
/*
    配置当前项目引入的模块

*/
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "login":"login"
    }
})

require(['login'], function(login){

      login.loginSend();
      //register.registerSend();
      $.ajax({
        type:"post",
        url:"./php/login.php",
        data:{
            username:$("").eq(0).val(),
            password:$("").eq(1).val()
           
        },
        success:function(result){
             // console.log(result);
             //解析数据
             var obj = JSON.parse(result);
             if ( obj.code ) {
                  $("").find("").attr(); 
             } else {
                  $("").find("").attr(); 
                  $("").show().find().attr();
                  setTimeout(function{
                      location.assign( "" );
                  },1000);
             }

             $().show().find("span").html(obj.message);


        },
        error:function(msg){
             console.log(msg); 
        }
    })
} )