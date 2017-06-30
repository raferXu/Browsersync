/**
 * Created by raferxu on 17/6/30.
 */
function setInputVal(task,n,ds) {
  //发送图片获取识别字符串，并放入input中
  var blockStr = {'str':''+ds};
  blockStr.str = task.info.alg_answer || blockStr.str;

  var blockStrLen=8-blockStr.str.length,f='';
  if(blockStrLen>0){
    for(var i=0;i<blockStrLen;i++){
      f+='0';
    }
    blockStr.str = f + blockStr.str;
  }else{
    blockStr.str = blockStr.str;
  }

//将获取的数字数据表示出来
  var aInput = $('#codeLockWrap input');
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
      // var This = this;
      // if(android){
      //   setTimeout(function () {
      //     if($(This).next()){
      //       $(This).next().focus();
      //     }
      //   },100);
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