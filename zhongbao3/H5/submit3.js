/**
 * Created by raferxu on 17/6/30.
 */
function normalSubmit(task,answer,tokenStr,interface,deferred) {
  if (answer["text"]) {
    pybossa.saveTask(task, answer).done(function() {
      $('.pinch-zoom-container').css('height','auto');
      deferred.resolve();
    });
  }
  else {
    $("#showMes").hide();
    $('#answerTipBtn').off(touchstart).on(touchstart,function () {
      $('#answerTip').hide();
    });
    $('#answerTip').show();
  }
}


















