'use strict';

/**
 * Created by raferxu on 17/7/7.
 **/
//日期插件
function datePlugin(blockStr, minYear, maxYear) {
  $('#appDate').val(blockStr.str);
  var opt = {};
  opt.date = { preset: 'date' };
  opt.default = {
    theme: 'android-ics light', //皮肤样式
    display: 'bottom', //显示方式
    mode: 'scroller', //日期选择模式
    dateFormat: 'yymmdd',
    lang: 'zh',
    showNow: false, //是否显示'今天'按钮
    nowText: "今天", //'今天'按钮的显示内容
    startYear: minYear, //开始年份
    endYear: maxYear //结束年份
  };
  $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));

  if (android) {
    jobTask.datePickerShow(false); //页面加载先让能滑动
    tap($("#appDate")[0], function () {
      if (android) {
        console.log('datePickerShow(true)');
        jobTask.datePickerShow(true);
      }
      $(document).on(touchstart, '#dwb,#dwb2', function () {
        console.log('datePickerShow(false1)');
        jobTask.datePickerShow(false);
      });
    });
    // tap($(document)[0],function () {
    //   if(android){
    //     console.log('datePickerShow(false1)');
    //     jobTask.datePickerShow(false);
    //   }
    // });
    // $("#appDate").on(touchstart,function () {
    //   if(android){
    //     console.log('datePickerShow(true)');
    //     jobTask.datePickerShow(true);
    //   }
    // });
  }
}
//# sourceMappingURL=dateScroll.js.map