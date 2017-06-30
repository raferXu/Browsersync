/**
 * Created by raferxu on 17/6/30.
 */
//给数字输入框父元素添加滑动事件
var startX,startY;
$('#codeLockWrap').off(touchstart).on(touchstart,function (e) {
  startX = e.originalEvent.touches[0].pageX;
  startY = e.originalEvent.touches[0].pageY;
});
$('#codeLockWrap').off('touchend').on('touchend',function (e) {
  var endX = e.originalEvent.changedTouches[0].pageX;
  var endY = e.originalEvent.changedTouches[0].pageY;
  var direction = GetSlideDirection(startX, startY, endX, endY);
  var liLen = $('#codeLockWrap input').length;
  switch (direction){
    case 3:
      console.log('left');
//              $('#codeLockWrap input').eq(0).appendTo($('#codeLockWrap'));
      var arr = [];
      $('#codeLockWrap input').each(function (i,v) {
        arr.push($(this).val());
      });
      arr.push(arr.shift());
      $('#codeLockWrap input').each(function (i,v) {
        // console.log(arr[i]);
        $(this).val(arr[i]);
      });
      break;
    case 4:
      console.log('right');
      var liLen = $('#codeLockWrap input').length;
      // $('#codeLockWrap input').eq(liLen-1).prependTo($('#codeLockWrap'));
      var arr = [];
      $('#codeLockWrap input').each(function (i,v) {
        arr.push($(this).val());
      });
      arr.unshift(arr.pop());
      $('#codeLockWrap input').each(function (i,v) {
        // console.log(arr[i]);
        $(this).val(arr[i]);
      });
      break;
  }
});