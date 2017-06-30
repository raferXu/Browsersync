/**
 * Created by raferxu on 17/6/29.
 */
function getDataFail() {
  $("#showMes").hide();
  $("#failData").show();
  setTimeout(function () {
    // autoRelogin();
  },3000);
}
function autoRelogin() {
  $("#failData").hide();
  jobTask.notifyToRelogin();
}

$(window).on('scroll', function () {
  $('#toLogin').css('top',$(window).scrollTop());
  $('#showMes').css('top',$(window).scrollTop());
  $('#offLine').css('top',$(window).scrollTop());
  $('#answerTip').css('top',$(window).scrollTop());
  $('#failData').css('top',$(window).scrollTop());
});

//判断图片是否加载完成
function imgLoaded(img) {
  return img.complete && img.naturalHeight !== 0;
}

function getTokenAndPort() {
  var tokenStr = sessionStorage.getItem("token") || null;
  var interface = sessionStorage.getItem("url") || null;
  var receiveNativeTokenJson;
  if(!tokenStr || !interface){
    receiveNativeTokenJson = JSON.parse(jobTask.receiveNativeToken());
    tokenStr = receiveNativeTokenJson['token'];
    interface = receiveNativeTokenJson['url'];
    sessionStorage.setItem("token",tokenStr);
    sessionStorage.setItem("url",interface);
  }
  gToken = tokenStr;
  gInterface = interface;
  return {'tokenStr':tokenStr,'interface':interface};
}

//按下软键盘确认键后收起键盘
$('.showInfo').bind('keydown', function (e) {
  var key = e.which;
  if (key == 13) {
    e.preventDefault();
    document.activeElement.blur();
  }
});