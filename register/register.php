<?php
/*
参数:username   用户名 password 密码
返回格式:json
{"ret":200,"msg":"注册成功"}
返回字段
ret 状态码 100 用户名不能为空
           101 用户名已被注册
           102 密码不能为空
           200 可以注册
*/
$ret = 200;
$msg = '注册成功';
$username = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';
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
if(isset($users[$username])){
    echo json_encode(array('ret'=>101,'msg'=>'该用户名已被注册'));
    return;
}
$_SESSION[$username] = array('username'=>$username,'password'=>$password);
echo json_encode(array('ret'=>$ret,'msg'=>$msg));
return;