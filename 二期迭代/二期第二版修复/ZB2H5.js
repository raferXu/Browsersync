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
        // console.log(result);

        // billImg
        $('.billImg').css({
            'width' : result.fw +'px',
            'height' : result.fh + 'px',
            'marginTop' : result.pt +'px',
            'marginLeft' : result.pl +'px',
            // 'transform':'rotate(90deg)',
            'display' : 'inline-block'
        });
    }

    // 发送图片获取识别字符串，并放入input中
    // 模拟数据
   var str = "1404021205";
   $('.showInfo').val(str);
   $('.reviseInfo').html(str);

    // 软键盘控制底部input的显示

    // 获取task_id
    var task_id = 1;
    // 拿到token判断有没登录
    // 发起ajax请求获取任务统计数据userInfo插入页面中
    // 判断是否需要跳到抽奖页面 getchanceconfig／interval  ＝＝  userInfo／total_order_num ？

    // 点击任务指引
    // 点击查看
    // 点击下一张按钮
    // 单击未登录的取消按钮
    // 单击登录跳转登录页面


});
