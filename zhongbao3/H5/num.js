/**
 * Created by raferxu on 17/7/6.
 */
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













