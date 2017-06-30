/**
 * Created by raferxu on 17/6/30.
 */
function showPageData(task,tokenStr,interface) {
//发起ajax请求获取任务统计数据userInfo插入页面中
  var task_id = task.id;
  var userData = {'task_id':task_id};
  userData = JSON.stringify(userData);
//判断是否需要跳到抽奖页面 getchanceconfig／interval  ＝＝  userInfo／total_order_num ？
  $.when(
    $.ajax({
      type : 'POST',
      url : ''+interface+'/token/statistics/userInfo',
      data : userData,
      dataType : 'json',
      timeout: 5000,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-Type','application/json;charset=utf-8');
        xhr.setRequestHeader('Accept','application/json,text/plain');
        xhr.setRequestHeader('Authorization',tokenStr);
      }
    }),
    $.ajax({
      type : 'GET',
      url : ''+interface+'/token/lottery/getchanceconfig',
      timeout: 5000,
      dataType : 'json'
    })
  ).then(function (userInfo, lotteryInfo){

    var userInfoCode = userInfo[0].code;
    var lotteryInfoCode = lotteryInfo[0].code;
    if(userInfoCode == 200){
      var total_order_num = userInfo[0].body.total_order_num;
      $('.task_rand_score span').html(userInfo[0].body.task_rand_score);
      $('.total .num').html(total_order_num);
      $('.today_order .num').html(userInfo[0].body.current_day_tasks);

      for(var i=0,len=lotteryInfo[0]['body']['chance_configs'].length;i<len;i++){
        var interval = lotteryInfo[0]['body']['chance_configs'][i]['interval'];
        var lottery_id = lotteryInfo[0]['body']['chance_configs'][i]['lottery_id'];

        if(interval == total_order_num){
          var remainData = {"threshold_value": interval};
          function getuserremainingchanceFun() {
            var getuserremainingchanceAjax = $.ajax({
              type: 'POST',
              url: ''+interface+'/token/lottery/getuserremainingchance',
              dataType: 'json',
              timeout: 5000,
              beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type','application/json;charset=utf-8');
                xhr.setRequestHeader('Accept','application/json,text/plain');
                xhr.setRequestHeader('Authorization',tokenStr);
              },
              data: JSON.stringify(remainData),
              success: function (remainingChanceInfo) {

                var getuserremainingchanceCode = remainingChanceInfo.code;
                if(getuserremainingchanceCode == 200){
                  var times = remainingChanceInfo['body']['remaining_chance'];
                  if(times>0){
                    var lockTimer = setInterval(function () {
                      clearInterval(lockTimer);
                      jobTask.lotteryConfigInterval(JSON.stringify({'interval':interval,'times':times,'lottery_id':lottery_id}));
                    },30);
                  }
                }else if(getuserremainingchanceCode == 604){
                  console.log('getuserremainingchanceCode604');
//                            jobTask.notifyToRelogin();
                }
              },
              error: function () {
                console.log('remaining_chanceError');
                if(error == "timeout"){
                  getuserremainingchanceAjax.abort();
                  getuserremainingchanceFun();
                }
              }
            });
          }
          getuserremainingchanceFun();
          break;
        }
      }
    }else if(userInfoCode == 604){
      console.log('userInfoCode604');
//                jobTask.notifyToRelogin();
    }

  });
}
function bindJumpNative() {
  //点击任务指引
  $('.taskGuide').off(touchstart).on(touchstart,function () {
    console.log('taskGuideBtnclick');
    jobTask.taskGuide();
  });
//点击查看
  $('.more').off(touchstart).on(touchstart,function () {
    console.log('nextBtnClick');
    jobTask.checkTaskStatistics();
  });
}