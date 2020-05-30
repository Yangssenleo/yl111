<?php
      header('');
      //var_dump( $_POST ); 200 ok 404 not found
      //定义一个统一的返回格式
      $responseData = array("code"=>0,  "message"=> "" );
      //先将通过post提交的数据全部取出
      $username = $_POST['username'];
      $password = $_POST['password'];

      
    //对后台接收到的数据进行一个简单的判断
    if( !$username ) {
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        //将数据按照统一的格式返回
        echo json_encode($responseData );
        exit; 
   }

   if( !$password  ) {
       $responseData["code"] = 2;
       $responseData["message"] = "密码不能为空";
       //将数据按照统一的格式返回
       echo json_encode($responseData );
       exit; 
  }

  //链接数据库，判断用户名之前是否注册过
//天龙八部，php7语法,安装php5.6的语法

$link = mysql_connect("127.0.0.1", "root", "123456");
//php5.6 

//判断数据库是否链接成功
if ( !$link  ) {
    $responseData["code"] = 3;
    $responseData["message"] = "服务器忙";
    //将数据按照统一的格式返回
    echo json_encode($responseData );
    exit; 
}

//设置字符集
mysql_set_charset( $link, "utf8" );

//选择数据库
mysql_select_db( $link, "xiaomi" );

//准备sql语句进行登录
//密码要加密
$str = md5(md5(md5(password)."beijing")."zhongguo");

$sql = "SELECT * FROM users WHERE username = '{$username}' AND password = '{$password}' ";

//echo  $sql;


$res =   mysqli_query( $link,  $sql );

//取出第一行数据
$row = mysqli_fetch_assoc(  $res );

if ( !$row ) {
    $responseData["code"] = 4;
    $responseData["message"] = "用户名或密码错误";
    //将数据按照统一的格式返回
    echo json_encode($responseData );
    exit; 
} else {
    $responseData["message"] = "登陆成功";
    //将数据按照统一的格式返回
    echo json_encode($responseData );
}

mysqli_close(  $link  );






?>