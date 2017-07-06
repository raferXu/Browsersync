/**
 * Created by raferxu on 17/6/30.
 */
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
    console.log('水平方面撑满屏幕， 缩放倍数为'+scale+'，缩放后宽度为'+scaleImgW+'，高度为'+scaleImgH+'，上边留白'+pdt+'，左边留白0');
  }else{
    scale = imgWrapH / initImgH;
    scaleImgH = imgWrapH;
    scaleImgW = initImgW * scale;
    pdl = (imgWrapW - scaleImgW) / 2;
    pdt = 0;
    console.log('水平方面撑满屏幕， 缩放倍数为'+scale+'，缩放后宽度为'+scaleImgW+'，高度为'+scaleImgH+'，上边留白0，左边留白'+pdl);
  }

  // 返回显示在屏幕的图片的宽高和左边及上边的留白
  return {
    'fw' : scaleImgW,
    'fh' : scaleImgH,
    'pl' : pdl,
    'pt' : pdt
  };
}
// 定义图片加载后的回调
function imgCallback(img) {
// 获取图片展示区域宽高
  var imgBoxW = $('.billImgBox').width();
  var imgBoxH = $('.billImgBox').height();
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
// 对图片区域相关处理
function imgHandleFn(task) {
  // 确保图片加载完成及执行的回调
  var imgLoadTimer = setInterval(function () {
    if(imgLoaded($('.billImg')[0])){
      clearInterval(imgLoadTimer);
      imgCallback($('.billImg')[0]);
      loadImg = true;
      if(loadImg && getStr){
        console.log('图片和ajax请求均完成');
        $("#showMes").hide();
      }
    }
  },100);
  $('.pinch-zoom').html('').append(task.info.image);
  var fontSize = parseInt($('html').css('fontSize'));
  var opt = {zoomFactor:3,offset:{x:3.75*fontSize,y:1.1*fontSize},maxZoom:6,tapZoomFactor:3};
  $('div.pinch-zoom').each(function () {
    new RTP.PinchZoom($(this), opt);
  });
}
// 左右滑动阻止默认
var imgStartX,imgStartY;
$('.imgWrap').off(touchstart).on(touchstart,function (e) {
  imgStartX = e.originalEvent.touches[0].pageX;
  imgStartY = e.originalEvent.touches[0].pageY;
});
$('.imgWrap').off('touchend').on('touchend',function (e) {
  var endX = e.originalEvent.changedTouches[0].pageX;
  var endY = e.originalEvent.changedTouches[0].pageY;
  var direction = GetSlideDirection(imgStartX, imgStartY, endX, endY);
  switch (direction){
    case 3:
      console.log('imgWrap left');
      e.preventDefault();
      break;
    case 4:
      console.log('imgWrap right');
      e.preventDefault();
      break;
  }
});