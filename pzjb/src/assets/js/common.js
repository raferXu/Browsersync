let common = {
    refresh: function(t) {
        // t.$router.push({
        //     path: '/_empty',
        // });
        // t.$router.go(-1);
    },
    refresh2: function(t) {
        location.reload();
    },
    setStorage: function(key, value) {
        var curTime = new Date().getTime();
        localStorage.setItem(key, JSON.stringify({
            data: value,
            time: curTime
        }));
    },
    getStorage: function(key, exp) {
        var data = localStorage.getItem(key);
        var dataObj = JSON.parse(data);
        if (new Date().getTime() - dataObj.time > exp) {
            console.log('信息已过期');
        } else {
            var dataObjDatatoJson = JSON.parse(dataObj.data)
            return dataObjDatatoJson;
        }
        /**
         *
         var dataObjData = get('information', 1000 * 60 * 60 * 24 * 7); //过期时间为1周
         console.log(dataObjData || null);
         if (dataObjData != "" && dataObjData != null) {
             console.log("姓名:" + dataObjData.name);
             console.log("年龄:" + dataObjData.Age);
             console.log("地址:" + dataObjData.Age);
         } else {
             alert("获取的信息已经过期");
         }
         */
    },
    GetUrlParam: function(paraName) {　　　　
        var url = document.location.toString();　　　
        var arrObj = url.split("?");
        if (arrObj.length > 1) {　　
            var arrPara = arrObj[arrObj.length - 1].split("&");　　　
            var arr;
            for (var i = 0; i < arrPara.length; i++) {　　　　　　　　
                arr = arrPara[i].split("=");　
                if (arr != null && arr[0] == paraName) {　　　　　　　　　　
                    return arr[1];　　　　　　　　
                }　　　　　　
            }　　　　　　
            return "";　　　　
        }　　　　
        else {　　　　　　
            return "";　　　　
        }　　
    },
    backTo: function(url) {
        console.log('backTo函数参数: ' + url);
        // alert(url)
        var backUrl = 'index.html'
        switch (url) {
            case 'manage':
                backUrl = 'manage.html'
                break;
            case 'manage_OCRmodel':
                backUrl = 'manage.html?to=OCRmodel'
                break;
            case 'manage_manageCustomDevIndex':
                backUrl = 'manage.html?to=manageCustomDevIndex'
                break;
            case 'manage_ZBmodel':
                backUrl = 'manage.html?to=ZBmodel'
                break;

            default:
                break;
        }
        window.location.href = backUrl;
    }
}
export {
    common
};