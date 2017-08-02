<?php
/*
参数:username   用户名 password 密码
返回格式:json
{"ret":200,"msg":"该用户名可以注册"}
返回字段
ret 状态码 100 用户名不能为空
           101 用户名已被注册
           200 可以注册
*/
$ret = 100;
$username = isset($_GET['username']) ? $_GET['username'] : '';
if(empty($username)){
    echo json_encode(array('ret'=>$ret,'msg'=>'用户名不能为空'));
    return;
}
session_start();
$sessionUser = $_SESSION;
if(isset($sessionUser[$username]) || $username == 'hunger'){
    echo json_encode(array('ret'=>101,'msg'=>'该用户名已经被注册'));
    return;
}
echo json_encode(array('ret'=>200,'msg'=>'该用户名可以注册'));
