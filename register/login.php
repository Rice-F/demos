<?php
/*
参数:username   用户名
返回格式:json
{"ret":200,"msg":"登录成功"}
返回字段
ret 状态码 100 用户名不能为空
           102 密码不能为空
           103 用户不存在
           103 密码错误
           200 登录成功
*/
$ret = 200;
$msg = '登录成功';
$username = isset($_GET['username']) ? $_GET['username'] : '';
$password = isset($_GET['password']) ? $_GET['password'] : '';
if(empty($username)){
    echo json_encode(array('ret'=>100,'msg'=>'用户名不能为空'));
    return;
}
if(empty($password)){
    echo json_encode(array('ret'=>102,'msg'=>'密码不能为空'));
    return;
}
session_start();
$users = $_SESSION;
if(!isset($users[$username])){
    echo json_encode(array('ret'=>103,'msg'=>'用户不存在'));
    return;
}
$user = $users[$username];
if($user['password'] != $password){
    echo json_encode(array('ret'=>104,'msg'=>'密码错误'));
    return;
}
echo json_encode(array('ret'=>$ret,'msg'=>$msg,'user'=>$user));
return;
