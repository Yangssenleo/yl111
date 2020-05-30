define(["jquery"], function($) {
     function registerSend() {
          $("#register-button").click(function() {
                $.ajax({
                    type:"post",
                    url:"./php/register.php",
                    data:{
                        username:$("").eq(0).val(),
                        password:$("").eq(1).val(),
                        repassword:$("").eq(2).val(),
                        createtime:(new Date()).getTime()
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
          }) 
     } 
     return {
         registerSend:registerSend 
     }
} )