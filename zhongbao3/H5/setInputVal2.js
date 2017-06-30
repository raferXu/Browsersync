/**
 * Created by raferxu on 17/6/30.
 */
function setInputVal() {
  //发送图片获取识别字符串，并放入input中
  var str = task.info.alg_answer || '';
  $('.showInfo').val(str);
}
