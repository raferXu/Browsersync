/**
 * Created by raferxu on 17/6/30.
 */
// submit1 和 submit2 没区别
function normalSubmit(task,answer,tokenStr,interface,deferred,getDataFail) {
  if (answer["text"]) {
    pybossa.saveTask(task, answer).done(function() {
      if(jumpProjectFlag){
        function getongoingprojectFun() {
          var getongoingprojectAjax = $.ajax({
            type: 'GET',
            async: false,
            cache: false,
            timeout: 10000,
            url: ''+interface+'/token/getongoingproject',
            dataType: 'json',
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization',tokenStr);
            },
            success: function (data) {
              var getongoingprojectCode = data.code;
              if(getongoingprojectCode == 905){
                window.location.href = "/static/h5/noTask.html";
              }else if(getongoingprojectCode == 200){
                var shortName = data['body']['short_name'];
                console.log('shortName: '+shortName);
                if(shortName){
                  jobTask.switchToAnotherProject(shortName);
                }else{
                  window.location.href = "/static/h5/noTask.html";
                }
              }else if(getongoingprojectCode == 604){
                jobTask.notifyToRelogin();
              }
            },
            error: function (xml, error) {
              console.log('getongoingproject接口报错：'+error);
              if(error == "timeout"){
                getongoingprojectAjax.abort();
                getongoingprojectFun();
              }
            }
          });
        }
        getongoingprojectFun();
      }
      $('.pinch-zoom-container').css('height','auto');
      deferred.resolve();
    }).fail(function (err) {
      getDataFail();
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