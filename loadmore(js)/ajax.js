    function ajax(opts){
        var xhr = createXHR();
        xhr.onreadystatechange = function(){
            if( xhr.readyState == 4 && ( xhr.status == 200 || xhr.status == 304 ) ){
                var json = JSON.parse(xhr.responseText)
                opts.success(json);
            }else if( xhr.readyState == 4 && xhr.status == 404 ){
                opts.error();
            }
        }

        var dataStr = "";
        for(var key in opts.data){
            dataStr += key + "=" + opts.data[key] + "&";
        }
        dataStr = dataStr.substr(0,dataStr.length-1);

        if(opts.type.toLowerCase() == "get"){
            xhr.open(opts.type,opts.url + "?" + dataStr,true);
            xhr.send();
        }
        if(opts.type.toLowerCase() == "post"){
            xhr.open(opts.type,opts.url,true)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(dataStr);
        }
    }

    function createXHR(){
        var xhr = new XMLHttpRequest();
        try{
             xhr = new XMLHttpRequest();
        }catch (error){
            try{
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }catch (error){
                try{
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }catch (error){
                    xhr = null;
                }
            }
        }
        return xhr;
    }