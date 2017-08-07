/**
 * Created by raferxu on 17/7/6.
 */
function setInputVal(task) {
  //发送图片获取识别字符串，并放入input中
  var str = task.info.alg_answer || '';
  $('.showInfo').val(str);
  keyboardEvent(str);
}
function keyboardEvent(str) {
  var strArr = [];
  strArr = str.split('');
  $('#answerInput').off(touchstart).on(touchstart, function(e) {
    e.preventDefault();
    $('#keyboardWrap').show();
    // alert($(window).scrollTop());
    $('.keyboard').animate({'bottom': 0});
  });
  $('#sureTotalBtn').off(touchstart).on(touchstart, function(e) {
    e.preventDefault();
    $('.keyboard').animate({'bottom': '-4rem'},function () {
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
        console.log('delTimer1');
        strArr.pop();
        $('.showInfo').val(strArr.join(''));
        if(strArr.length>0){
          delTimer2 = setInterval(function () {
            clearInterval(delTimer1);
            strArr.pop();
            $('.showInfo').val(strArr.join(''));
            console.log('delTimer2');
          },200);
        }
      },500);
    }
  });
  $(document).off(touchend).on(touchend, function(e) {
    console.log(touchend);
    var delTimer3 = setTimeout(function () {
      clearInterval(delTimer1);
      clearInterval(delTimer2);
      clearInterval(delTimer3);
    },0);
  });
  $('#keyboardM').off(touchstart).on(touchstart, '.zi', function(e) {
    e.preventDefault();
    strArr.push($(this).html());
    $('.showInfo').val(strArr.join(''));
  });
  $('#keyboardWrap').off(touchstart).on(touchstart, function () {
    $(this).hide();
  });
  $('#keyboard').off(touchstart).on(touchstart, function (event) {
    event.stopPropagation();
  });
}
