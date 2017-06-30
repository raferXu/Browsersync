/**
 * Created by raferxu on 17/6/29.
 */
pybossa.taskLoaded(function(task, deferred) {

  if ( !$.isEmptyObject(task) ) {

    var img = $('<img id="billImg" class="billImg"/>');
    var imgUrl = task.info.url;
    function getImgFn() {
      var getImgNeedPortTimer = setInterval(function () {
        if(jobTaskLoaded){
          clearInterval(getImgNeedPortTimer);
          var interface = getTokenAndPort().interface;
          var getImgAjax = $.ajax({
            type: 'GET',
            async: false,
            cache: false,
            url: ''+interface+imgUrl,
            dataType: 'json',
            timeout: 10000,
            success: function (data) {
              var getImgAjaxCode = data.code;
              if(getImgAjaxCode == 200){
                var imgUrlbase64 = 'data:image/jpeg;base64,'+data['body']['base64'];
                img.load(function() {
                  deferred.resolve(task);
                });
                img.attr('src', imgUrlbase64).css('height', 'auto');
                task.info.image = img[0];
              }else{
                console.log('getImgAjax调用失败，状态码为: '+getImgAjaxCode);
              }
            },
            error: function (xml, error) {
              console.log('/token/img接口Error');
              if(error == "timeout"){
                console.log('/token/img接口timeout');
                getImgAjax.abort();
                getImgFn();
              }
            }
          });
        }
      },50);
    }
    if(/^\/token\/img/.test(imgUrl)){
      getImgFn();
    }else{
      img.load(function() {
        deferred.resolve(task);
      });
      img.attr('src', imgUrl).css('height', 'auto');
      task.info.image = img;
    }
  } else {
    console.log('运行taskLoaded函数时候已经没有任务了,自动重新刷新页面获取可用任务');
    deferred.resolve(task);
  }
});
