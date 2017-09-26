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
        $(this).blur();
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
        $(this).blur();
      });
      break;
  }
});



// num.js

function setInputVal(task,n,ds,blockStr) {
  blockStr.str = task.info.alg_answer || ds;
  blockStr.str = blockStr.str.replace(/[^0-9]/g,'0');
  if(n==8){  //date project
    blockStr.str = blockStr.str.length != 8 ? ds : blockStr.str;
    blockStr.str.substring(0,4)
    blockStr.str.substring(4,6)
    blockStr.str.substring(6,8)
  }else{  //sn project
    var blockStrLen = n - blockStr.str.length, f = '';
    if(blockStrLen>0){
      for(var i=0;i<blockStrLen;i++){
        f+='0';
      }
      blockStr.str = f + blockStr.str;
    }else{
      blockStr.str = blockStr.str;
    }
  }
//将获取的数字数据表示出来
  var aInput = $('#codeLockWrap input.ansNum');
  var nowValue;
  for(var i=0;i<n;i++){
    aInput[i].value = blockStr.str[i];
    aInput[i].onfocus = function () {
      nowValue = this.value;
      this.value = '';
    };
    aInput[i].onblur = function () {
      if(!this.value){
        this.value = nowValue;
      }
    };
    aInput[i].onkeyup = function () {
      this.blur();
      // if(this.value.length>1){
      //   this.value = this.value.slice(0,1);
      // }
    };
  }
}
//获取某时刻的字符串
getCurStr = function () {
  var curStr = [];
  var aInput = $('#codeLockWrap input');
  for(var i = 0, olen = aInput.length; i < olen; i++){
    curStr[i] = aInput[i].value;
  }
  return curStr.join('');
};

jsloadDone = true;
console.log('jsloadDone: '+jsloadDone);