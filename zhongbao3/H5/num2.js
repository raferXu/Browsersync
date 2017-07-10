/**
 * Created by raferxu on 17/7/6.
 */
function setInputVal(config) {
  // alert(config.task.info.alg_answer);
  config.blockStr.str = config.task.info.alg_answer || config.ds;
  config.blockStr.str = config.blockStr.str.replace(/[^0-9]/g,'0');
  if(config.n==8){  //date project
    config.blockStr.str = config.blockStr.str.length != 8 ? config.ds : config.blockStr.str;
    if(config.blockStr.str.substring(0,4)<minYear || config.blockStr.str.substring(0,4)>maxYear || config.blockStr.str.substring(4,6)>12 || config.blockStr.str.substring(6,8)>31){
      console.log('结果不是日期格式');
      config.blockStr.str = config.today;
    }
  }else{  //sn project
    var blockStrLen = config.n - config.blockStr.str.length, f = '';
    if(blockStrLen>0){
      for(var i=0;i<blockStrLen;i++){
        f+='0';
      }
      config.blockStr.str = f + config.blockStr.str;
    }else{
      config.blockStr.str = config.blockStr.str;
    }
  }
//将获取的数字数据表示出来
  var aInput = $('#codeLockWrap input.ansNum');
  var nowValue;
  for(var i=0;i<config.n;i++){
    aInput[i].value = config.blockStr.str[i];
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
  var aInput = $('#codeLockWrap input.ansNum');
  for(var i = 0, olen = aInput.length; i < olen; i++){
    curStr[i] = aInput[i].value;
  }
  return curStr.join('');
};













