    function ajax(opts){
        var xhr = createXHR();

        // 处理参数，将参数转换成 key=value 的形式
        var dataStr = "";
        for(var key in opts.data){
            dataStr += key + "=" + opts.data[key] + "&";
        }
        // 去掉字符串末尾的&符号
        dataStr = dataStr.substr(0,dataStr.length-1);

        // open()的参数分别表示：请求方式，请求地址
        // true表示异步请求
        if(opts.type.toLowerCase() == "get"){
            // get请求直接通过?将请求参数拼接在url后面即可
            xhr.open(opts.type,opts.url + "?" + dataStr,true);
            xhr.send();
        }
        if(opts.type.toLowerCase() == "post"){
            xhr.open(opts.type,opts.url,true)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            // post请求直接将请求参数写在send方法里
            xhr.send(dataStr);
        }

        // 当readystate改变时触发
        xhr.onreadystatechange = function(){
            // xhr.readyState == 4  请求已完成（请求可能失败也可能成功）
            // xhr.status == 200  请求成功
            // xhr.status == 304  请求成功并且请求条件较上一次并没有改变
            if( xhr.readyState == 4 && ( xhr.status == 200 || xhr.status == 304 ) ){
                var json = JSON.parse(xhr.responseText)
                opts.success(json);
            }else if( xhr.readyState == 4 && xhr.status == 404 ){
                opts.error();
            }
        }
    }

    // 创建异步对象
    function createXHR(){
        // 该对象用于在后台与服务器交换数据
        var xhr = new XMLHttpRequest();
        try{
            xhr = new XMLHttpRequest();
        }catch (error){
            try{
                // 兼容老版本的IE5、IE6
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (error){
                xhr = null;
            }
        }
        return xhr;
    }
