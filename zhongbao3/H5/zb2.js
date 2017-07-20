/**
 * Created by raferxu on 17/7/6.
 */
function setInputVal(task,h,t) {
  //发送图片获取识别字符串，并放入input中
  var str = task.info.alg_answer || '';
  $('.showInfo').val(str);
  keyboardEvent(str,h,t);
}
function keyboardEvent(str,h,t) {
  var strArr = [];
  strArr = str.split('');
  $('#answerInput').off(touchstart).on(touchstart, function(e) {
    e.preventDefault();
    $('#keyboardWrap').show();
    $('.keyboard').animate({'top': t});
  });
  $('#arrowDown, #sureTotalBtn').off(touchstart).on(touchstart, function(e) {
    e.preventDefault();
    $('.keyboard').animate({'top': h},function () {
      $('#keyboardWrap').hide();
    });
  });
  var delTimer1 = null, delTimer2 = null;
  $('#delTxt').off(touchstart).on(touchstart, function(e) {
    e.preventDefault();
    if(strArr.length>0){
      strArr.pop();
      $('.showInfo').val(strArr.join(''));
    }
    if(strArr.length>0){
      delTimer1 = setInterval(function () {
        strArr.pop();
        $('.showInfo').val(strArr.join(''));
        if(strArr.length>0){
          delTimer2 = setInterval(function () {
            clearInterval(delTimer1);
            strArr.pop();
            $('.showInfo').val(strArr.join(''));
          },200);
        }
      },500);
    }
  });
  $('#delTxt').off(touchend).on(touchend, function(e) {
    clearInterval(delTimer1);
    clearInterval(delTimer2);
  });
  $('#keyboardM').off(touchstart).on(touchstart, '.zi', function(e) {
    e.preventDefault();
    strArr.push($(this).html());
    $('.showInfo').val(strArr.join(''));
  });
}
