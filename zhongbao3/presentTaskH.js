/**
 * Created by raferxu on 17/9/22.
 */
pybossa.presentTask(function (task, deferred) {
  if (!$.isEmptyObject(task)) {

    var jsloadDoneTimer = setInterval(function () {
      console.log('presentTaskjsloadDone: '+jsloadDone);
      if (jsloadDone) {
        clearInterval(jsloadDoneTimer);

        console.log('blockStr: ' + blockStr);

        var way = {};

        switch (nowProject) {
          case 'sn':
            way.setInputVal = function (task) {
              setInputVal(task, 10, '0123456789', blockStr);
            };
            way.textAnswer = function () {
              return getCurStr();
            };
            break;
          case 'hospital':
            way.setInputVal = function (task) {
              setInputVal(task);
            };
            way.textAnswer = function () {
              return $('.showInfo').val();
            };
            break;
          case 'total':
            way.setInputVal = function (task) {
              setInputVal(task);
            };
            way.textAnswer = function () {
              return $('.showInfo').val();
            };
            break;
          case 'date':
            way.setInputVal = function (task) {
              var now = new Date();
              var defaultDate = (now.getFullYear()+""+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+""+(now.getDate()<10?"0":"")+now.getDate());
              var config = {
                'task': task,
                'n': 8,
                'ds': defaultDate,
                'blockStr': blockStr,
                'maxY': maxYear,
                'minY': minYear,
                'today': defaultDate
              };
              setInputVal(config);
              datePlugin(blockStr,minYear,maxYear);
            };
            way.textAnswer = function () {
              return getCurStr();
            };
            break;
        }

        canSubmit = true;
        imgHandleFn(task);

        way.setInputVal(task);

        $('#next,#indistinct').prop('disabled', false);
        var interface = gInterface;
        showPageData(task, tokenStr, interface);
        bindJumpNative(nowProject);

        //拿到token判断有没登录
        if (!tokenStr) {
          flag = 1;
          console.log('没有拿到token值！');
          noTokenHandle();
        } else {
          console.log('拿到了token值，为 ' + tokenStr);
          $('#toLogin').hide();
          flag = 0;

          //点击下一张按钮
          $('#next,#indistinct').off(touchstart).on(touchstart, function () {
            console.log('next按钮点击了');
            $('#next,#indistinct').prop('disabled', true);

            var touchstartWhich = $(this).attr('id') == 'indistinct';
            if (!window.navigator.onLine) {
              $("#showMes").hide();
              $('#offLine').show();
              flag = 1;
              $('#sureBtn').off(touchstart).on(touchstart, function () {
                $('#offLine').hide();
                flag = 0;
              });
            } else {
              if (canSubmit) {
                $("#showMes").show();
                flag = 1;

                canSubmit = false;

                var answer = touchstartWhich ? {"text": '看不清'} : {"text": way.textAnswer()};

                console.log('整理答案中: '+answer);
                console.log(answer);

                normalSubmit(task, answer, tokenStr, interface, deferred, getDataFail);
              }
            }
          });
        }
        
      }else{
        console.log('jsloadDone is false, so jsloadDoneTimer continue');
      }
    }, 50);

  }
  else {
    console.log('运行presentTask函数时候已经没有任务了,自动重新刷新页面获取可用任务');
    console.log('只加载本次任务，不会出现这个日志');
  }
});
pybossa.run('hospital');