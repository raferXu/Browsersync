let common = {
    ajax: {
        'accountLog_in': function() {},
        'accountLog_out': function() {},
        accountRegister: function() {},
        'add_experience_task': function() {},
        'add_orc_zb_task': function() {},
        'experience_resultsOcr': function() {},
        'experience_resultsZb': function() {},
        'identity_card_grab_rec': function() {},
        'id_test_inner': function() {},
        'list_public': function() {},
        paymentBalance: '/token/payment/balance',
        paymentRecharge: function() {},
        projectCheck_balance: function() {},
        projectDetail: function() {},
        projectStart: function() {},
        'publicList_all': "/token/public/list_all",
        'publicList_ocr': function() {},
        'publicList_zb': function() {},
        templateDetail: function() {},
        templateNnew: function() {},
        'upload_files': function() {},

        ajaxReq: function(that, obj = { data: {}, config: {} }, type = 'post') {
            type = type.toLowerCase();
            that.axios[type](obj.url, obj.data, obj.config).then((res) => {
                console.log(obj.url + ' 请求进入then函数')
                console.log(res)
                if (res.status == 200) {
                    var resData = res.data;
                    if (resData.code == 200) {
                        obj.suc && obj.suc(that, resData)
                    } else {
                        console.log(obj.url + '接口异常，返回码为: ' + resData.code);
                        obj.fail && obj.fail(that, resData)
                        return;
                    }
                } else {
                    console.log(obj.url + '网络异常，返回状态码: ' + res.status);
                }
            }).catch((err) => {
                console.log(obj.url + ' 请求错误，进入catch函数')
                console.log(err)
            });
        }
    },
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
    getFullImgLeft: function() {
        var winWidth = window.innerWidth;
        var maxWidth = 1920;
        return -(maxWidth - winWidth) / 2;
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