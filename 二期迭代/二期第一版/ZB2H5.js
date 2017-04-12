/**
 * Created by raferxu on 17/3/27.
 */
$(function () {

    // 获取展示区域宽高
    var imgBoxW = $('.billImg').width();
    var imgBoxH = $('.billImg').height();
    // console.log({'W':imgBoxW,'H':imgBoxH});

    // 计算图片最终大小和移动的坐标
    function calc(config) {
        // 获取图片原始大小
        var initImgW = config.imgW || 0;
        var initImgH = config.imgH || 0;
        // 获取图片展示框大小
        var imgWrapW = config.imgWrapW || 0;
        var imgWrapH = config.imgWrapH || 0;

        // 获取坐标，将框各往外扩t以消除框不准而看不到的情况
        var t = 5;
        var startX = (config.x1 - t) || 0;
        var startY = (config.y1 - t) || 0;
        var endX = (config.x2 + t) || 0;
        var endY = (config.y2 + t) || 0;

        // 计算后台数据所得的框宽高
        var dataRectW = endX - startX;
        var dataRectH = endY - startY;

        // 确定水平还是垂直方向占满
        var direct = (imgWrapW / dataRectW * dataRectH < imgWrapH) ? 'h' : 'v';
        var scale = 1, scaleRectH, scaleRectW,pdt,pdl;
        var scaleImgW,scaleImgH,scaleX1,scaleY1;

        // 确定缩放比及框宽高缩放后的数值
        if(direct == 'h'){
            scale = imgWrapW / dataRectW;
            scaleRectH = dataRectH * scale;
            pdt = (imgWrapH - scaleRectH) / 2;
            pdl = 0;
        }else{
            scale = imgWrapH / dataRectH;
            scaleRectW = dataRectW * scale;
            pdl = (imgWrapW - scaleRectW) / 2;
            pdt = 0;
        }

        // 根据缩放比确定图片缩放后的宽高和坐标数值
        scaleImgW = initImgW * scale;
        scaleImgH = initImgH * scale;
        scaleX1 = startX * scale;
        scaleY1 = startY * scale;

        // 修正居中问题
        scaleX1 = scaleX1 - pdl;
        scaleY1 = scaleY1 - pdt;

        return {
            'fw' : scaleImgW,
            'fh' : scaleImgH,
            'sx' : scaleX1,
            'sy' : scaleY1,
        };
    }

    var result = calc({
        'imgW' : 1637.3,
        'imgH' : 1010,
        'imgWrapW' : imgBoxW,
        'imgWrapH' : imgBoxH,
        // 'x1' : 244,
        // 'x2' : 631,
        // 'y1' : 158,
        // 'y2' : 209

        // 'x1' : 320,
        // 'x2' : 576,
        // 'y1' : 605,
        // 'y2' : 634

        'x1' : 325,
        'x2' : 608,
        'y1' : 952,
        'y2' : 984

    });
    // console.log(result);

    // billImg
    $('.billImg').css('background','url(http://192.168.0.88:8000/reciept/9_0/000009_roi_0.jpg) no-repeat -'+result['sx']+'px -'+result['sy']+'px/'+result['fw']+'px '+result['fh']+'px');



    // http://192.168.0.88:5001/ocr_api/crowd_rec
    // {"url":"http://192.168.0.88:8000/reciept/9_0/000009_roi_0.jpg"}
    /*

     {
     "box": {
     "border": "8.000000,28.000000,1637.000000,1010.000000",
     "date": "325.000000,952.000000,608.000000,984.000000",
     "fee": "320.000000,605.000000,576.000000,634.000000",
     "hospital": "244.000000,158.000000,631.000000,209.000000",
     "no": "1192.000000,198.000000,1470.000000,236.000000"
     },
     "imgsize": "1010,1637,3",
     "text": {
     "border": "1|ShouJu_MenZhen",
     "date": "5|;",
     "fee": "4|整",
     "hospital": "3|泾",
     "no": "2|1502774948"
     }
     }

    */

     // 任务指引
    $('.taskGuide').on('touchstart',function () {
        location.href = 'https://www.baidu.com/';
    });
});
