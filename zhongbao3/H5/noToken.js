/**
 * Created by raferxu on 17/6/30.
 */
function noTokenHandle() {
  $('#toLogin').removeClass().addClass('bgHide').show();

//单击未登录的取消按钮
  $('#cacelBtn').off(touchstart).on(touchstart,function () {
    $('#toLogin>div').hide();
    $('#toLogin').removeClass().addClass('bgHide');
    $('html')[0].addEventListener(touchstart,function () {
      $('#toLogin').removeClass().addClass('bgShow');
      $('#toLogin>div').show();
    },true);
  });

//单击登录跳转登录页面
  $('#loginBtn').off(touchstart).on(touchstart,function () {
    console.log('loginBtnTouchstart');
    jobTask.launchLoginPage();
  });

  $('html')[0].addEventListener(touchstart,function () {
    console.log('htmlPageTouchstart');
    $('#toLogin').removeClass().addClass('bgShow');
    $('#toLogin>div').show();
  },true);

  $('.task_rand_score span').html(0);
  $('.total .num').html(0);
  $('.today_order .num').html(0);
}
