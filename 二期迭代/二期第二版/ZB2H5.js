/**
 * Created by raferxu on 17/3/27.
 */
$(function () {

    // 计算图片最终大小和移动的坐标
    function calc(config) {

        // 获取图片原始大小
        var initImgW = config.imgInitW || 0;
        var initImgH = config.imgInitH || 0;

        // 获取图片展示框大小
        var imgWrapW = config.imgWrapW || 0;
        var imgWrapH = config.imgWrapH || 0;

        // 确定水平还是垂直方向占满
        var direct = (imgWrapW / initImgW * initImgH < imgWrapH) ? 'h' : 'v';
        var scale = 1, scaleImgH, scaleImgW,pdt,pdl;

        // 确定缩放比、缩放后的宽高及留白大小
        if(direct == 'h'){
            scale = imgWrapW / initImgW;
            scaleImgW = imgWrapW;
            scaleImgH = initImgH * scale;
            pdt = (imgWrapH - scaleImgH) / 2;
            pdl = 0;
        }else{
            scale = imgWrapH / initImgH;
            scaleImgH = imgWrapH;
            scaleImgW = initImgW * scale;
            pdl = (imgWrapW - scaleImgW) / 2;
            pdt = 0;
        }

        // 返回显示在屏幕的图片的宽高和左边及上边的留白
        return {
            'fw' : scaleImgW,
            'fh' : scaleImgH,
            'pl' : pdl,
            'pt' : pdt
        };
    }

    // 获取展示区域宽高
    var imgBoxW = $('.billImgBox').width();
    var imgBoxH = $('.billImgBox').height();

    // 判断图片是否加载完成
    function imgLoaded(img) {
        return img.complete && img.naturalHeight !== 0;
    }

    // 确保图片加载完成及执行的回调
    var imgLoadTimer = setInterval(function () {
        if(imgLoaded($('.billImg')[0])){
            clearInterval(imgLoadTimer);
            imgCallback($('.billImg')[0]);
        }
    },500);

    // 定义图片加载后的回调
    function imgCallback(img) {

        // 获取图片原始宽高
        var imgInitH = img.naturalHeight;
        var imgInitW = img.naturalWidth;

        //计算图片最终显示的大小及留白
        var result = calc({
            'imgInitW' : imgInitW,
            'imgInitH' : imgInitH,
            'imgWrapW' : imgBoxW,
            'imgWrapH' : imgBoxH
        });
        console.log(result);

        // billImg
        $('.billImg').css({
            'width' : result.fw +'px',
            'height' : result.fh + 'px',
            'paddingTop' : result.pt +'px',
            'paddingLeft' : result.pl +'px',
            'visibility' : 'visible'
        });
    }

    // http://192.168.0.162:5000/token/statistics/userInfo
    // {"token":
    //          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE1MDE3OTgwMDI1IiwidGltZSI6IjIwMTctMDMtMjkgMTg6MDc6MDAifQ.iftWXK1bxmeKjnpnWnMBmigcdgt_x8EoPo55pLIxrrI",
    //  "task_id":
    //          199
    // }

    /*

     {
         "body": {
             "current_score": 0,
             "current_day_tasks": 0,
             "task_rand_score": 100,
             "total_order_num": 0
         },
         "message": "operate successfully",
         "code": 200
     }

     */

    //发起ajax请求获取任务统计数据userInfo插入页面中
/*
    var userData = {'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE1MDE3OTgwMDI1IiwidGltZSI6IjIwMTctMDMtMjkgMTg6MDc6MDAifQ.iftWXK1bxmeKjnpnWnMBmigcdgt_x8EoPo55pLIxrrI','task_id':199};
    // var userData = {};
    userData = JSON.stringify(userData);
    $.ajax({
        type : 'POST',
        url : 'http://192.168.0.162:5000/token/statistics/userInfo',
        data : userData,
        dataType : 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-Type','application/json;charset=utf-8');
            xhr.setRequestHeader('Accept','application/json,text/plain');
        },
        success : function (userInfo) {
            // userInfo = JSON.parse(userInfo);

            console.log(userInfo);
            $('.num').html(userInfo.body.total_order_num);
            $('.other span').eq(0).html(userInfo.body.task_rand_score);
            $('.other span').eq(1).html(userInfo.body.current_score);
            $('.other span').eq(2).html(userInfo.body.current_day_tasks);
        },
        error : function (err) {
            console.log('error: '+err);
        }

    });
*/

    var userData = {'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE1MDE3OTgwMDI1IiwidGltZSI6IjIwMTctMDMtMjkgMTg6MDc6MDAifQ.iftWXK1bxmeKjnpnWnMBmigcdgt_x8EoPo55pLIxrrI','task_id':199};
    userData = JSON.stringify(userData);
    $.ajax({
        type : 'POST',
        url : 'http://192.168.0.182:5000/token/statistics/userInfo',
        data : userData,
        dataType : 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-Type','application/json;charset=utf-8');
            xhr.setRequestHeader('Accept','application/json,text/plain');
        },
        success : function (userInfo) {
            // userInfo = JSON.parse(userInfo);

            console.log(userInfo);
            $('.num').html(userInfo.body.total_order_num);
            $('.other span').eq(0).html(userInfo.body.task_rand_score);
            $('.other span').eq(1).html(userInfo.body.current_score);
            $('.other span').eq(2).html(userInfo.body.current_day_tasks);
        },
        error : function (err) {
            console.log('error: '+err);
        }

    });


/*
    var userInfo = {
        "body": {
            "current_score": 0,
            "current_day_tasks": 0,
            "task_rand_score": 100,
            "total_order_num": 0
        },
        "message": "operate successfully",
        "code": 200
    };
    $('.num').html(userInfo.body.total_order_num);
    $('.other span').eq(0).html(userInfo.body.task_rand_score);
    $('.other span').eq(1).html(userInfo.body.current_score);
    $('.other span').eq(2).html(userInfo.body.current_day_tasks);
*/

     // 任务指引
    $('.taskGuide').on('touchstart',function () {
        location.href = 'https://www.baidu.com/';
    });
});
