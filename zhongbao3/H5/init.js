/**
 * Created by raferxu on 17/6/29.
 */
var loadImg = false;
var loadNumImg = false;
var getStr = false;
var tokenStr;
var gToken, gInterface;
var getCurStr=function(){};
var jobTaskLoaded = false;
var touchstart = 'touchstart';
var isMobile;
var getDataFailTimer = setTimeout(function () {
  if(!loadImg || !getStr){
    getDataFail();
    clearTimeout(getDataFailTimer);
  }
},15000);
var android = true;
function nativeLoadCompleted() {
  jobTaskLoaded = true;
}
function isAndroidFn() {
  var u = navigator.userAgent,
    app = navigator.appVersion;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isAndroid;
}
android = isAndroidFn();

//判断是安卓机还是苹果机
if(android){
  console.log('这是安卓机');
  $('header h1').addClass('androidHeader');
}else{
  console.log('这是苹果机');
}
$(document).ajaxStart(function(){}).ajaxStop(function(){
  getStr = true;
  if(loadImg && getStr){
    $("#showMes").hide();
  }
});
function device() {
  isMobile = /Mobile/i.test(navigator.userAgent);
  if(!isMobile){
    touchstart = 'click';
  }else{
  }
}
function htmlFontSize(){
  var html = document.querySelector("html");
  var width = html.getBoundingClientRect().width;
  html.style.fontSize = width / 3.75 + "px";
}
device();
htmlFontSize();
window.addEventListener("resize",function(){
  htmlFontSize();
},false);
window.onerror = function (msg,url,l) {
  var txt = '';
  txt="页面出现了错误.\n\n";
  txt+="页面错误的详细信息Error: " + msg + "\n";
  txt+="页面错误的地址URL: " + url + "\n";
  txt+="页面错误的行数Line: " + l + "\n\n";
  console.log(txt);
};
