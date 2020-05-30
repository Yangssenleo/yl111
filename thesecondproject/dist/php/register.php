<?php
    header('');
    //var_dump( $_POST ); 200 ok 404 not found
    //定义一个统一的返回格式
    $responseData = array("code"=>0,  "message"=> "" );
    //先将通过post提交的数据全部取出
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $createtime = $_POST['createtime'];

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

   if( !$password != $repassword ) {
    $responseData["code"] = 3;
    $responseData["message"] = "两次密码输入不一致";
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
    $responseData["code"] = 4;
    $responseData["message"] = "服务器忙";
    //将数据按照统一的格式返回
    echo json_encode($responseData );
    exit; 
}

//设置字符集
mysql_set_charset( $link, "utf8" );

//选择数据库
mysql_select_db( $link, "xiaomi" );

//准备sql语句验证是否注册过
$sql = "SELECT * FROM users WHERE username = '{$username}'";

//发送sql语句
$res =   mysql_query($link, $sql );

var_dump($res);

//取出一行数据
$row = mysql_fetch_assoc($res);
var_dump($row);
if( !$row ) {
     //注册过
    $responseData["code"] = 5;
    $responseData["message"] = "用户名重名";
    //将数据按照统一的格式返回
    echo json_encode($responseData );
    exit;

}

//密码得加密去注册
$str = md5(md5(md5(password)."beijing")."zhongguo");


//可以注册
$sql2 = "INSERT INTO users(username, password, createtime)  VALUES('{$username}',  '{$str}', '{$createtime}' )"

$res2 = mysqli_query( $link, $sql2  );

if(!$res2) {//插入失败
    $responseData["code"] = 6;
    $responseData["message"] = "插入失败";
    //将数据按照统一的格式返回
    echo json_encode($responseData );
    exit;
}

$responseData["message"] = "注册成功";
//将数据按照统一的格式返回
echo json_encode($responseData );


//关闭数据库
mysqli_close( $link );








?>
