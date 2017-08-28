/**
 * Created by raferxu on 17/7/6.
 */

/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
/* * * DON'T EDIT BELOW THIS LINE * * */
function loadDisqus() {
  $("#disqus_thread").toggle();
  $(".btn-disqus").toggle();
  var disqus_shortname = 'pybossa';
  var disqus_developer = 1;
  (function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
}

$.ajaxSetup({
  error: function(jqXHR, textStatus, errorThrown){
    switch (jqXHR.status){
      case(500):
        console.log("服务器系统内部错误");
        break;
      case(401):
        console.log("未登录");
        break;
      case(403):
        console.log("无权限执行此操作");
        break;
      case(408):
        console.log("请求超时");
        break;
      default:
        console.log("未知错误");
    }
    getDataFail();
  }
});

// init.js
var flag = 0;
// loading加载框出现
$("#showMes").fadeIn();
flag = 1;
var nowProject;
var blockStr = {'str':''};
var loadImg = false;
var loadNumImg = false;
var getStr = false;
// var lotteryLoad = false;
var tokenStr;
var gToken;
var gInterface = location.origin;
var getCurStr=function(){};
var getDataFailTimer = setTimeout(function () {
  if(!loadImg || !getStr){
    getDataFail();
    clearTimeout(getDataFailTimer);
    $("#showMes").fadeOut(500);
  }
},5000);
var android = true;
var jobTaskLoaded = false;
var touchstart = 'touchstart';
var touchmove = 'touchmove';
var touchend = 'touchend';
if(!isMobile){
  touchstart = 'click';
  touchend = 'mouseup';
  touchmove = 'mousemove';
  $('#codeLockWrap input').attr('type','text');
}else{
  $('#codeLockWrap input').attr('type','number');
}

function isAndroidFn() {
  var u = navigator.userAgent,
    app = navigator.appVersion;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isAndroid;
}
android = isAndroidFn();
//判断是安卓机还是苹果机
if(android){
  console.log('这是安卓机');
  $('header h1').addClass('androidHeader');
  $('.phb').removeClass('l').addClass('r');
}else{
  console.log('这是苹果机');
}
$(document).ajaxStart(function(){}).ajaxStop(function(){
  getStr = true;
  if(loadImg && getStr){
    // if(loadImg && getStr && lotteryLoad){
    $("#showMes").fadeOut(500);
    $('#next,#indistinct').prop('disabled',false);
    flag = 0;
  }
});
function htmlFontSize(){
  var html = document.querySelector("html");
  var width = html.getBoundingClientRect().width;
  html.style.fontSize = width / 3.75 + "px";
}
htmlFontSize();
window.addEventListener("resize",function(){
  htmlFontSize();
},false);
window.onerror = function (msg,url,l) {
  var txt = '';
  txt="页面出现了错误.\n\n";
  txt+="页面错误的详细信息Error: " + msg + "\n";
  txt+="页面错误的地址URL: " + url + "\n";
  txt+="页面错误的行数Line: " + l + "\n\n";
  console.log(txt);
};
document.addEventListener('touchmove', function (event) { 　　 //监听滚动事件
  if(flag==1){　　//判断是遮罩显示时执行，禁止滚屏
    event.preventDefault();　　　//最关键的一句，禁止浏览器默认行为
  }
});

// pybossa-token.js
(function(pybossa, $, undefined) {
  var token="";
  var url = '/';  //默认为／开头的请求url
  var myTaskId = {'id':''};
  var _taskLoaded = function(task, deferred) {  //初始化定义_taskLoaded变量
    deferred.resolve(task);
  };
  var _presentTask = function(task, deferred) {  //初始化定义_presentTask变量
    deferred.resolve(task);
  };
  function _fetchProject(projectname) {
    return $.ajax({
      url: url + 'token/project',
      beforeSend: function (request)
      {
        if (token==="") {
          return;
        } else {
          request.setRequestHeader("Authorization", token);
        }
      },
      success: function (data) {
        console.log("url + 'token/project' success");
        console.log(data);
      },
      error: function (err) {
        console.log("url + 'token/project' error");
        console.log(err);
        if(err.status == 401){
          // jobTask.notifyToRelogin();
          console.log('token/project接口token超时');
        }
      },
      data: 'all=1&short_name='+projectname,
      dataType:'json'
    });
  }
  function _fetchNewTask(projectId, offset) {
    console.log("_fetchNewTask函数第一参数projectId: "+projectId+", 第二参数offset: "+offset);
    console.log(projectId);
    console.log(offset);

    offset = offset || 0;
    return $.ajax({
      url: url + 'token/project/' + projectId + '/newtask',
      beforeSend: function (request)
      {
        if (token==="") {
          return;
        } else {
          request.setRequestHeader("Authorization", token);
        }
      },
      success: function (data) {
        console.log("url + 'token/project/' + projectId + '/newtask' success");
        console.log(data);
        if(data.code == 808){
          $("#showMes").fadeOut(500);
          console.log('data.code: 808');
          var overtime = data['body']['latest_end_time'];
          if(overtime.substring(0,4)=='2100'){
            $('#fsText').html("您的账号因存在严重的刷分行为已被永久封停。");
            flag = 1;
          }else{
            $('#fsText').html("您的账号因存在刷分行为已被封停，解封时间"+overtime+"。");
            flag = 0;
          }
          $('#kqfs h3').html("公告");
          $('#fsText').css('marginBottom','0px');
          $('#kqfs').css({"background":"#aeb3bd","position":"fixed"});
          $('.kq-btns').fadeOut();
          $('#kqfs').fadeIn();
        } else if(!data['id']){
          console.log('jumpProjectFlag: true');
          jumpProjectFlag = true;
        }
      },
      error: function (err) {
        console.log("url + 'token/project/' + projectId + '/newtask' error");
        console.log(err);
      },
      data: 'offset=' + offset,
      cache: false,
      dataType: 'json'
    });
  }
  function _saveTaskRun(taskrun) {
    console.log('taskrun');
    return $.ajax({
      type: 'POST',
      url: url + 'token/taskrun',
      async: false,
      beforeSend: function (request)
      {
        if (token==="") {
          return;
        } else {
          request.setRequestHeader("Authorization", token);
        }
      },
      success: function (data) {
        console.log("url + 'token/taskrun' success");
        console.log(data);
      },
      error: function (err) {
        console.log("url + 'token/taskrun' error");
        console.log(err);
      },
      dataType: 'json',
      contentType: 'application/json',
      data: taskrun
    });
  }
  function _resolveNextTaskLoaded(task, deferred) {
    var udef = $.Deferred();
    // 新建的udef延迟对象的状态是由taskLoaded里的第二参数deferred状态确定,
    // 当它的状态成功(也就是taskLoaded运行完)后才会触发_resolveNextTaskLoaded第二参数deferred的状态改变
    _taskLoaded(task, udef);  //taskLoaded参数的运行在这行代码
    udef.done(function(task) {
      deferred.resolve(task);
    });
  }
  function _run (projectname, _window) {
    _window = _window || window;
    _fetchProject(projectname).done(function(project) {
      //_fetchProject返回的是一个xhr对象,请求成功后返回的data[0]是一个含id、short_name、presenter等的project对象
      project = project[0];

      function getNextTask(offset, previousTask) {
        offset = offset || 0;
        var def = $.Deferred(),taskSolved = $.Deferred();
        var taskId = myTaskId.id;  //第一次为空,loop中的getNextTask执行后才有值
        var xhr = _fetchNewTask(project.id, offset);
        // _fetchNewTask返回的是xhr对象,成功后返回的数据是一个含id、project_id、url等的对象
        xhr.done(function(task) {
          // alert('task.id: '+task.id);  //920   920      950   972
          // alert(previousTask);         //undefined  object   undefined  object
          if (previousTask && task.id === previousTask.id) {
            def.resolve(task);
            // 因为匿名下调用_fetchNewTask返回的任务同一project都是同一task，所以也不必_resolveNextTaskLoaded同一个任务，直接resolve
          }
          else {
            _resolveNextTaskLoaded(task, def);
            def.done(function () {
              _presentTask(task, taskSolved);
            });
          }
          if(task.id) myTaskId.id = task.id;
        });
        taskSolved.done(loop);
      }
      function loop(task) {
        getNextTask(0, task);  //这里offset都是为0，不能为1
      }
      getNextTask(0, undefined);
    });
  }
  pybossa.saveTask = function (task, answer) {
    var taskrun = {
      'project_id': task.project_id,
      'task_id': task.id,
      'info': answer
    };
    //这里必须要有return,而且_saveTaskRun返回的是一个延迟对象,所以pybossa.saveTask().done()后面的done才不会报错
    return _saveTaskRun(JSON.stringify(taskrun));
  };
  pybossa.run = function (projectname, _window) {
    if(isMobile){
      token = $("#token").data("token");
      tokenStr = token;
      gToken = tokenStr;
    }else{
      var search = location.search.split('?')[1];
      if(search){
        tokenStr = token = search.split('&')[0] || "";
      }
      // console.log('token: '+token);
      if(!token){
        token = tokenStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE1MjA4Mjg3MDA1IiwidGltZSI6IjIwMTctMDgtMTIgMTE6MDE6NDIifQ.Nb7gRjegnDc7rZ7ibdU4QBODdwdfaudZv3r5-3GdOaI';
      }
    }
    nowProject = projectname;
    _run(projectname, _window);
  };
  //pybossa.taskLoaded和pybossa.presentTask的调用都只是赋值而已,真正的运行都是在run里
  pybossa.taskLoaded = function (userFunc) {  //原始的taskLoaded运行后只是把参数传给了_taskLoaded,并没有调用
    _taskLoaded = userFunc;
  };
  pybossa.presentTask = function (userFunc) {  //原始的presentTask运行后只是把参数传给了_presentTask,并没有调用
    _presentTask = userFunc;
  };
} (window.pybossa = window.pybossa || {}, jQuery));


// pinchzoom.js
(function () {
  'use strict';
  var definePinchZoom = function ($) {
    var PinchZoom = function (el, options) {
        this.el = $(el);
        // this.zoomFactor = 1;
        // this.zoomFactor = 2;
        this.lastScale = 3;
        // this.offset = {
        //     x: 0,
        //     y: 0
        //     // x: 200,
        //     // y: 200
        // };
        this.options = $.extend({}, this.defaults, options);
        this.setupMarkup();
        this.bindEvents();
        this.update();
        // default enable.
        this.enable();
      },
      sum = function (a, b) {
        return a + b;
      },
      isCloseTo = function (value, expected) {
        return value > expected - 0.01 && value < expected + 0.01;
      };

    PinchZoom.prototype = {

      defaults: {
        zoomFactor: 3,
        offset: {x:0,y:0},

        tapZoomFactor: 2.8,
        zoomOutFactor: 1,
        animationDuration: 300,
        maxZoom: 6,
        minZoom: 0.5,
        lockDragAxis: false,
        use2d: true,
        zoomStartEventName: 'pz_zoomstart',
        zoomEndEventName: 'pz_zoomend',
        dragStartEventName: 'pz_dragstart',
        dragEndEventName: 'pz_dragend',
        doubleTapEventName: 'pz_doubletap'
      },

      /**
       * Event handler for 'dragstart'
       * @param event
       */
      handleDragStart: function (event) {
        this.el.trigger(this.options.dragStartEventName);
        this.stopAnimation();
        this.lastDragPosition = false;
        this.hasInteraction = true;
        this.handleDrag(event);
      },

      /**
       * Event handler for 'drag'
       * @param event
       */
      handleDrag: function (event) {

        if (this.options.zoomFactor > 1.0) {
          var touch = this.getTouches(event)[0];
          this.drag(touch, this.lastDragPosition);
          this.options.offset = this.sanitizeOffset(this.options.offset);
          this.lastDragPosition = touch;
        }
      },

      handleDragEnd: function () {
        this.el.trigger(this.options.dragEndEventName);
        this.end();
      },

      /**
       * Event handler for 'zoomstart'
       * @param event
       */
      handleZoomStart: function (event) {
        this.el.trigger(this.options.zoomStartEventName);
        this.stopAnimation();
        this.lastScale = 1;
        this.nthZoom = 0;
        this.lastZoomCenter = false;
        this.hasInteraction = true;
      },

      /**
       * Event handler for 'zoom'
       * @param event
       */
      handleZoom: function (event, newScale) {

        // a relative scale factor is used
        var touchCenter = this.getTouchCenter(this.getTouches(event)),
          scale = newScale / this.lastScale;
        this.lastScale = newScale;

        // the first touch events are thrown away since they are not precise
        this.nthZoom += 1;
        if (this.nthZoom > 3) {

          this.scale(scale, touchCenter);
          this.drag(touchCenter, this.lastZoomCenter);
        }
        this.lastZoomCenter = touchCenter;
      },

      handleZoomEnd: function () {
        this.el.trigger(this.options.zoomEndEventName);
        this.end();
      },

      /**
       * Event handler for 'doubletap'
       * @param event
       */
      handleDoubleTap: function (event) {
        var center = this.getTouches(event)[0],
          zoomFactor = this.options.zoomFactor != 2.8 ? 2.8 : this.options.tapZoomFactor,
          startZoomFactor = this.options.zoomFactor,
          updateProgress = (function (progress) {
            this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
          }).bind(this);

        if (this.hasInteraction) {
          return;
        }
        if (startZoomFactor > zoomFactor) {
          center = this.getCurrentZoomCenter();
        }

        this.animate(this.options.animationDuration, updateProgress, this.swing);
        this.el.trigger(this.options.doubleTapEventName);
      },

      /**
       * Max / min values for the offset
       * @param offset
       * @return {Object} the sanitized offset
       */
      sanitizeOffset: function (offset) {
        var maxX = (this.options.zoomFactor - 1) * this.getContainerX(),
          maxY = (this.options.zoomFactor - 1) * this.getContainerY(),
          maxOffsetX = Math.max(maxX, 0),
          maxOffsetY = Math.max(maxY, 0),
          minOffsetX = Math.min(maxX, 0),
          minOffsetY = Math.min(maxY, 0);

        return {
          x: Math.min(Math.max(offset.x, minOffsetX), maxOffsetX),
          y: Math.min(Math.max(offset.y, minOffsetY), maxOffsetY)
        };
      },

      /**
       * Scale to a specific zoom factor (not relative)
       * @param zoomFactor
       * @param center
       */
      scaleTo: function (zoomFactor, center) {
        this.scale(zoomFactor / this.options.zoomFactor, center);
      },

      /**
       * Scales the element from specified center
       * @param scale
       * @param center
       */
      scale: function (scale, center) {
        scale = this.scaleZoomFactor(scale);
        this.addOffset({
          x: (scale - 1) * (center.x + this.options.offset.x),
          y: (scale - 1) * (center.y + this.options.offset.y)
        });
      },

      /**
       * Scales the zoom factor relative to current state
       * @param scale
       * @return the actual scale (can differ because of max min zoom factor)
       */
      scaleZoomFactor: function (scale) {
        var originalZoomFactor = this.options.zoomFactor;
        this.options.zoomFactor *= scale;
        this.options.zoomFactor = Math.min(this.options.maxZoom, Math.max(this.options.zoomFactor, this.options.minZoom));
        return this.options.zoomFactor / originalZoomFactor;
      },

      /**
       * Drags the element
       * @param center
       * @param lastCenter
       */
      drag: function (center, lastCenter) {
        if (lastCenter) {
          if(this.options.lockDragAxis) {
            // lock scroll to position that was changed the most
            if(Math.abs(center.x - lastCenter.x) > Math.abs(center.y - lastCenter.y)) {
              this.addOffset({
                x: -(center.x - lastCenter.x),
                y: 0
              });
            }
            else {
              this.addOffset({
                y: -(center.y - lastCenter.y),
                x: 0
              });
            }
          }
          else {
            this.addOffset({
              y: -(center.y - lastCenter.y),
              x: -(center.x - lastCenter.x)
            });
          }
        }
      },

      /**
       * Calculates the touch center of multiple touches
       * @param touches
       * @return {Object}
       */
      getTouchCenter: function (touches) {
        return this.getVectorAvg(touches);
      },

      /**
       * Calculates the average of multiple vectors (x, y values)
       */
      getVectorAvg: function (vectors) {
        return {
          x: vectors.map(function (v) { return v.x; }).reduce(sum) / vectors.length,
          y: vectors.map(function (v) { return v.y; }).reduce(sum) / vectors.length
        };
      },

      /**
       * Adds an offset
       * @param offset the offset to add
       * @return return true when the offset change was accepted
       */
      addOffset: function (offset) {
        /*
         this.options.offset = {
         x: this.options.offset.x + offset.x,
         y: this.options.offset.y + offset.y
         };
         */

        // console.log(this.options.offset.x);
        // 3->375;2->248
        // console.log(this.options.zoomFactor);
        var x = this.options.offset.x;
        var y = this.options.offset.y;
        var winW = $(window).width();
        var top = parseInt($('.billImg').css('marginTop'));
        var w = parseInt($('.billImg').width());
        var outW = $('.billImgBox').innerWidth();
        var h = parseInt($('.billImg').height());
        var wrapBoxH = $('.imgWrap').height();
        // 往左超出就大于125*z
        // 往右超出就小于375-125*z
        // console.log('x:' + x);
        if(this.options.zoomFactor<3){
          // console.log(this.options.zoomFactor);
          if(w*this.options.zoomFactor<x){
            // x值为125*this.options.zoomFactor表示此时图片左边正好贴在屏幕左侧
            // x大于此值时说明图片已开始从左边缘移除
            // 所以应该在超出时让值固定在此值保证图片左边正好贴在屏幕左侧
            x = w*this.options.zoomFactor;
          }else if(outW*this.options.zoomFactor*(2/3)-winW>x){
            // 第一个375为图片加空白的总宽度
            // 375*this.options.zoomFactor为图片放大后总宽度
            // 375*this.options.zoomFactor*(2/3)得到的是缩放后图片最左边缘距离图片右侧的距离，
            // 即左空白加图片自身宽度，边界线为图片右边线
            // －375是减去屏幕宽度，得到的结果就是当图片右边缘和屏幕右边重合的时候
            // 当大于此值说明图片左边距继续增大，右边缘将消失，图片继续向右移动，所以此时需要固定为图片右边缘和屏幕右边重合的时候的值
            x = outW*this.options.zoomFactor*(2/3)-winW;
          }

          // console.log('y:' + y);
          // console.log('top:' + top);
          // console.log('h:' + h);
          // console.log((top+h)*this.options.zoomFactor-wrapBoxH);
          if(y>this.options.zoomFactor*top){
            y = this.options.zoomFactor*top;
          }else if(y<(top+h)*this.options.zoomFactor-wrapBoxH){
            // console.log(123123);
            y = (top+h)*this.options.zoomFactor-wrapBoxH;
          }
        }else{
          if(w*this.options.zoomFactor>x){
            x = w*this.options.zoomFactor;
          }
          if(outW*this.options.zoomFactor*(2/3)-winW<x){
            x = outW*this.options.zoomFactor*(2/3)-winW;
          }
          if(y>this.options.zoomFactor*top){
            y = this.options.zoomFactor*top;
          }
          if(y<(top+h)*this.options.zoomFactor-wrapBoxH){
            y = (top+h)*this.options.zoomFactor-wrapBoxH;
          }
        }

        this.options.offset = {
          x: x + offset.x,
          y: y + offset.y
        };
      },

      sanitize: function () {
        if (this.options.zoomFactor < this.options.zoomOutFactor) {
          this.zoomOutAnimation();
        } else if (this.isInsaneOffset(this.options.offset)) {
          this.sanitizeOffsetAnimation();
        }
      },

      /**
       * Checks if the offset is ok with the current zoom factor
       * @param offset
       * @return {Boolean}
       */
      isInsaneOffset: function (offset) {
        var sanitizedOffset = this.sanitizeOffset(offset);
        return sanitizedOffset.x !== offset.x ||
          sanitizedOffset.y !== offset.y;
      },

      /**
       * Creates an animation moving to a sane offset
       */
      sanitizeOffsetAnimation: function () {
        var targetOffset = this.sanitizeOffset(this.options.offset),
          startOffset = {
            x: this.options.offset.x,
            y: this.options.offset.y
          },
          updateProgress = (function (progress) {
            this.options.offset.x = startOffset.x + progress * (targetOffset.x - startOffset.x);
            this.options.offset.y = startOffset.y + progress * (targetOffset.y - startOffset.y);
            this.update();
          }).bind(this);

        this.animate(
          this.options.animationDuration,
          updateProgress,
          this.swing
        );
      },

      /**
       * Zooms back to the original position,
       * (no offset and zoom factor 1)
       */
      zoomOutAnimation: function () {
        var startZoomFactor = this.options.zoomFactor,
          zoomFactor = 3,
          center = this.getCurrentZoomCenter(),
          updateProgress = (function (progress) {
            this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
          }).bind(this);

        this.animate(
          this.options.animationDuration,
          updateProgress,
          this.swing
        );
      },

      /**
       * Updates the aspect ratio
       */
      updateAspectRatio: function () {
        this.setContainerY(this.getContainerX() / this.getAspectRatio());
      },

      /**
       * Calculates the initial zoom factor (for the element to fit into the container)
       * @return the initial zoom factor
       */
      getInitialZoomFactor: function () {
        // use .offsetWidth instead of width()
        // because jQuery-width() return the original width but Zepto-width() will calculate width with transform.
        // the same as .height()
        return this.container[0].offsetWidth / this.el[0].offsetWidth;
      },

      /**
       * Calculates the aspect ratio of the element
       * @return the aspect ratio
       */
      getAspectRatio: function () {
        return this.el[0].offsetWidth / this.el[0].offsetHeight;
      },

      /**
       * Calculates the virtual zoom center for the current offset and zoom factor
       * (used for reverse zoom)
       * @return {Object} the current zoom center
       */
      getCurrentZoomCenter: function () {

        // uses following formula to calculate the zoom center x value
        // offset_left / offset_right = zoomcenter_x / (container_x - zoomcenter_x)
        var length = this.container[0].offsetWidth * this.options.zoomFactor,
          offsetLeft  = this.options.offset.x,
          offsetRight = length - offsetLeft -this.container[0].offsetWidth,
          widthOffsetRatio = offsetLeft / offsetRight,
          centerX = widthOffsetRatio * this.container[0].offsetWidth / (widthOffsetRatio + 1),

          // the same for the zoomcenter y
          height = this.container[0].offsetHeight * this.options.zoomFactor,
          offsetTop  = this.options.offset.y,
          offsetBottom = height - offsetTop - this.container[0].offsetHeight,
          heightOffsetRatio = offsetTop / offsetBottom,
          centerY = heightOffsetRatio * this.container[0].offsetHeight / (heightOffsetRatio + 1);

        // prevents division by zero
        if (offsetRight === 0) { centerX = this.container[0].offsetWidth; }
        if (offsetBottom === 0) { centerY = this.container[0].offsetHeight; }

        console.log('缩放后宽度: '+length);
        console.log('原始宽度: '+this.container[0].offsetWidth);
        console.log('缩放比: '+this.options.zoomFactor);
        console.log('左边距: '+offsetLeft);
        console.log('右边距: '+offsetRight);
        console.log('左右边距比: '+widthOffsetRatio);
        console.log('centerX: '+centerX);

        return {
          x: centerX,
          y: centerY
        };
      },

      canDrag: function () {
        return !isCloseTo(this.options.zoomFactor, 3);
      },

      /**
       * Returns the touches of an event relative to the container offset
       * @param event
       * @return array touches
       */
      getTouches: function (event) {
        var position = this.container.offset();
        return Array.prototype.slice.call(event.touches).map(function (touch) {
          return {
            x: touch.pageX - position.left,
            y: touch.pageY - position.top
          };
        });
      },

      /**
       * Animation loop
       * does not support simultaneous animations
       * @param duration
       * @param framefn
       * @param timefn
       * @param callback
       */
      animate: function (duration, framefn, timefn, callback) {
        var startTime = new Date().getTime(),
          renderFrame = (function () {
            if (!this.inAnimation) { return; }
            var frameTime = new Date().getTime() - startTime,
              progress = frameTime / duration;
            if (frameTime >= duration) {
              framefn(1);
              if (callback) {
                callback();
              }
              this.update();
              this.stopAnimation();
              this.update();
            } else {
              if (timefn) {
                progress = timefn(progress);
              }
              framefn(progress);
              this.update();
              requestAnimationFrame(renderFrame);
            }
          }).bind(this);
        this.inAnimation = true;
        requestAnimationFrame(renderFrame);
      },

      /**
       * Stops the animation
       */
      stopAnimation: function () {
        this.inAnimation = false;
      },

      /**
       * Swing timing function for animations
       * @param p
       * @return {Number}
       */
      swing: function (p) {
        return -Math.cos(p * Math.PI) / 2  + 0.5;
      },

      getContainerX: function () {
        return this.container[0].offsetWidth;
      },

      getContainerY: function () {
        return this.container[0].offsetHeight;
      },

      setContainerY: function (y) {
        return this.container.height(y);
      },

      /**
       * Creates the expected html structure
       */
      setupMarkup: function () {
        this.container = $('<div class="pinch-zoom-container"></div>');
        this.el.before(this.container);
        this.container.append(this.el);

        this.container.css({
          'overflow': 'hidden',
          'position': 'relative'
        });

        // Zepto doesn't recognize `webkitTransform..` style
        this.el.css({
          '-webkit-transform-origin': '0% 0%',
          '-moz-transform-origin': '0% 0%',
          '-ms-transform-origin': '0% 0%',
          '-o-transform-origin': '0% 0%',
          'transform-origin': '0% 0%',
          'position': 'absolute'
        });
      },

      end: function () {
        this.hasInteraction = false;
        this.sanitize();
        this.update();
      },

      /**
       * Binds all required event listeners
       */
      bindEvents: function () {
        detectGestures(this.container.get(0), this);
        // Zepto and jQuery both know about `on`
        $(window).on('resize', this.update.bind(this));
        $(this.el).find('img').on('load', this.update.bind(this));
      },

      /**
       * Updates the css values according to the current zoom factor and offset
       */
      update: function () {

        if (this.updatePlaned) {
          return;
        }
        this.updatePlaned = true;

        setTimeout((function () {
          this.updatePlaned = false;
          this.updateAspectRatio();

          var zoomFactor = this.getInitialZoomFactor() * this.options.zoomFactor,
            offsetX = -this.options.offset.x / zoomFactor,
            offsetY = -this.options.offset.y / zoomFactor,
            transform3d =   'scale3d('     + zoomFactor + ', '  + zoomFactor + ',1) ' +
              'translate3d(' + offsetX    + 'px,' + offsetY    + 'px,0px)',
            transform2d =   'scale('       + zoomFactor + ', '  + zoomFactor + ') ' +
              'translate('   + offsetX    + 'px,' + offsetY    + 'px)',
            removeClone = (function () {
              if (this.clone) {
                this.clone.remove();
                delete this.clone;
              }
            }).bind(this);

          // Scale 3d and translate3d are faster (at least on ios)
          // but they also reduce the quality.
          // PinchZoom uses the 3d transformations during interactions
          // after interactions it falls back to 2d transformations
          if (!this.options.use2d || this.hasInteraction || this.inAnimation) {
            this.is3d = true;
            removeClone();
            this.el.css({
              '-webkit-transform':  transform3d,
              '-o-transform':       transform2d,
              '-ms-transform':      transform2d,
              '-moz-transform':     transform2d,
              'transform':        transform3d
            });
          } else {

            // When changing from 3d to 2d transform webkit has some glitches.
            // To avoid this, a copy of the 3d transformed element is displayed in the
            // foreground while the element is converted from 3d to 2d transform
            if (this.is3d) {
              this.clone = this.el.clone();
              this.clone.css('pointer-events', 'none');
              this.clone.appendTo(this.container);
              setTimeout(removeClone, 200);
            }
            this.el.css({
              '-webkit-transform':  transform2d,
              '-o-transform':       transform2d,
              '-ms-transform':      transform2d,
              '-moz-transform':     transform2d,
              'transform':        transform2d
            });
            this.is3d = false;
          }
        }).bind(this), 0);
      },

      /**
       * Enables event handling for gestures
       */
      enable: function() {
        this.enabled = true;
      },

      /**
       * Disables event handling for gestures
       */
      disable: function() {
        this.enabled = false;
      }
    };

    var detectGestures = function (el, target) {
      var interaction = null,
        fingers = 0,
        lastTouchStart = null,
        startTouches = null,

        setInteraction = function (newInteraction, event) {
          if (interaction !== newInteraction) {

            if (interaction && !newInteraction) {
              switch (interaction) {
                case "zoom":
                  target.handleZoomEnd(event);
                  break;
                case 'drag':
                  target.handleDragEnd(event);
                  break;
              }
            }

            switch (newInteraction) {
              case 'zoom':
                target.handleZoomStart(event);
                break;
              case 'drag':
                target.handleDragStart(event);
                break;
            }
          }
          interaction = newInteraction;
        },

        updateInteraction = function (event) {
          if (fingers === 2) {
            setInteraction('zoom');
          } else if (fingers === 1 && target.canDrag()) {
            setInteraction('drag', event);
          } else {
            setInteraction(null, event);
          }
        },

        targetTouches = function (touches) {
          return Array.prototype.slice.call(touches).map(function (touch) {
            return {
              x: touch.pageX,
              y: touch.pageY
            };
          });
        },

        getDistance = function (a, b) {
          var x, y;
          x = a.x - b.x;
          y = a.y - b.y;
          return Math.sqrt(x * x + y * y);
        },

        calculateScale = function (startTouches, endTouches) {
          var startDistance = getDistance(startTouches[0], startTouches[1]),
            endDistance = getDistance(endTouches[0], endTouches[1]);
          return endDistance / startDistance;
        },

        cancelEvent = function (event) {
          event.stopPropagation();
          event.preventDefault();
        },

        detectDoubleTap = function (event) {
          var time = (new Date()).getTime();

          if (fingers > 1) {
            lastTouchStart = null;
          }

          if (time - lastTouchStart < 300) {
            cancelEvent(event);

            target.handleDoubleTap(event);
            switch (interaction) {
              case "zoom":
                target.handleZoomEnd(event);
                break;
              case 'drag':
                target.handleDragEnd(event);
                break;
            }
          }

          if (fingers === 1) {
            lastTouchStart = time;
          }
        },
        firstMove = true;

      el.addEventListener('touchstart', function (event) {
        if(target.enabled) {
          firstMove = true;
          fingers = event.touches.length;
          detectDoubleTap(event);
        }
      });

      el.addEventListener('touchmove', function (event) {
        var y = event.changedTouches[0].pageY;
        // if(y>$('.pinch-zoom-container').offset().top && y<$('.task_rand_score').offset().top){
        //     console.log('in');
        if(target.enabled) {
          if (firstMove) {
            updateInteraction(event);
            if (interaction) {
              cancelEvent(event);
            }
            startTouches = targetTouches(event.touches);
          } else {
            switch (interaction) {
              case 'zoom':
                target.handleZoom(event, calculateScale(startTouches, targetTouches(event.touches)));
                break;
              case 'drag':
                target.handleDrag(event);
                break;
            }
            if (interaction) {
              cancelEvent(event);
              target.update();
            }
          }

          firstMove = false;
        }
      });

      el.addEventListener('touchend', function (event) {
        if(target.enabled) {
          fingers = event.touches.length;
          updateInteraction(event);
        }
      });
    };

    return PinchZoom;
  };

  if (typeof define !== 'undefined' && define.amd) {
    define(['jquery'], function ($) {
      return definePinchZoom($);
    });
  } else {
    window.RTP = window.RTP || {};
    window.RTP.PinchZoom = definePinchZoom(window.$);
  }
}).call(this);


// ready.js
function getDataFail() {
  $("#showMes").fadeOut(500);
  flag = 0;
  $("#failData").css('position','fixed').fadeIn();
  flag = 1;
}
$('#dataFail').off(touchstart).on(touchstart, function () {
  $('#failData').fadeOut(500,function () {
    $(this).css('position','absolute');
  });
  flag = 0;
});

//判断图片是否加载完成
function imgLoaded(img) {
  return img.complete && img.naturalHeight !== 0;
}
function getTokenAndPort() {
  var interface = location.origin;
  return {'tokenStr':tokenStr,'interface':interface};
}
//按下软键盘确认键后收起键盘
$('.showInfo').bind('keydown', function (e) {
  var key = e.which;
  if (key == 13) {
    e.preventDefault();
    document.activeElement.blur();
  }
});
function showGuideText() {
  $('#guideTips').fadeIn().on('click',function () {
    $(this).fadeOut(500);
  });
  var guideTextTimer = setTimeout(function () {
    clearTimeout(guideTextTimer);
    if(!$('#guideTips').is(':hidden')){
      $('#guideTips').fadeOut(500);
    }
  },2000);
}


// taskLoad2.js
pybossa.taskLoaded(function(task, deferred) {
  if ( !$.isEmptyObject(task) ) {
    // alert($("#token").data("token"));
    console.log('运行taskLoaded函数时拿到的任务为: '+task);
    console.log(task);

    $.ajax({
      url: ''+gInterface+"/token/project/"+nowProject+"/projecttutorial",
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization',tokenStr);
      }
    }).done(function (data) {
      data = JSON.parse(data);
      // {"body": {"new_type": false, "image_urls": {"urls": ["123", "456"]}}, "message": "operate successfully", "code": 200}
      if(data.code == '200'){
        if(data.body.new_type){
          var guideTimer = setInterval(function () {
            if(loadImg && getStr){
              // if(loadImg && getStr && lotteryLoad){
              clearInterval(guideTimer);
              showGuideText();
            }
          },50);
        }else{
          console.log('不是第一次做任务，不需要提示任务指引');
        }
      }else{
        console.log('调用projecttutorial接口失败，返回状态码为：'+data.code);
      }
    });

    var img = $('<img id="billImg" class="billImg"/>');
    var imgUrl = task.info.url;
    if(!/^\/token\/img/.test(imgUrl)){
      // getImgFn();
    }else{
      img.load(function() {
      });
      img.attr('src', imgUrl).css('height', 'auto');
      task.info.image = img[0];
      deferred.resolve(task);
    }
  } else {
    console.log('运行taskLoaded函数时候已经没有任务了,自动重新刷新页面获取可用任务');
    var refreshTimer = setInterval(function () {
      if(jobTaskLoaded){
        clearInterval(refreshTimer);
        jobTask.refreshCurrentPage();
      }
    },50);
  }
});


// swipeLR.js
//返回角度
function GetSlideAngle(dx, dy) {
  return Math.atan2(dy, dx) * 180 / Math.PI;
}
//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function GetSlideDirection(startX, startY, endX, endY) {
  var dy = startY - endY;
  var dx = endX - startX;
  var result = 0;
  var angle = GetSlideAngle(dx, dy);
  if (angle >= 45 && angle < 135) {
    result = 1;
  } else if (angle >= -135 && angle < -45) {
    result = 2;
  } else if ((angle >= 150 && angle <= 180) || (angle >= -180 && angle < -150)) {  //向左
    if(Math.abs(dx)>5){
      result = 3;
    }
  } else if (angle >= -60 && angle < 60) {  //向右
    if(Math.abs(dx)>5){
      result = 4;
    }
  }
  console.log('result: '+result);
  return result;
}


// imgHandle.js
// 计算图片最终大小和移动的坐标
function calc(config) {

  // 获取图片原始大小
  var initImgW = config.imgInitW || 0;
  var initImgH = config.imgInitH || 0;

  // 获取图片展示框大小
  var imgWrapW = config.imgWrapW || 0;
  var imgWrapH = config.imgWrapH || 0;

  // 确定水平还是垂直方向占满
  var direct = (imgWrapW / initImgW * initImgH < imgWrapH) ? 'h' : 'v';
  var scale = 1, scaleImgH, scaleImgW,pdt,pdl;

  // 确定缩放比、缩放后的宽高及留白大小
  if(direct == 'h'){
    scale = imgWrapW / initImgW;
    scaleImgW = imgWrapW;
    scaleImgH = initImgH * scale;
    pdt = (imgWrapH - scaleImgH) / 2;
    pdl = 0;
    console.log('水平方面撑满屏幕， 缩放倍数为'+scale+'，缩放后宽度为'+scaleImgW+'，高度为'+scaleImgH+'，上边留白'+pdt+'，左边留白0');
  }else{
    scale = imgWrapH / initImgH;
    scaleImgH = imgWrapH;
    scaleImgW = initImgW * scale;
    pdl = (imgWrapW - scaleImgW) / 2;
    pdt = 0;
    console.log('水平方面撑满屏幕， 缩放倍数为'+scale+'，缩放后宽度为'+scaleImgW+'，高度为'+scaleImgH+'，上边留白0，左边留白'+pdl);
  }

  // 返回显示在屏幕的图片的宽高和左边及上边的留白
  return {
    'fw' : scaleImgW,
    'fh' : scaleImgH,
    'pl' : pdl,
    'pt' : pdt
  };
}
// 定义图片加载后的回调
function imgCallback(img) {
// 获取图片展示区域宽高
  var imgBoxW = $('.billImgBox').width();
  var imgBoxH = $('.billImgBox').height();
  // 获取图片原始宽高
  var imgInitH = img.naturalHeight;
  var imgInitW = img.naturalWidth;

  //计算图片最终显示的大小及留白
  var result = calc({
    'imgInitW' : imgInitW,
    'imgInitH' : imgInitH,
    'imgWrapW' : imgBoxW,
    'imgWrapH' : imgBoxH
  });

  // billImg
  $('.billImg').css({
    'width' : result.fw +'px',
    'height' : result.fh + 'px',
    'marginTop' : result.pt +'px',
    'marginLeft' : result.pl +'px',
    // 'transform':'rotate(90deg)',
    'display' : 'inline-block'
  });
}
// 对图片区域相关处理
function imgHandleFn(task) {
  // 确保图片加载完成及执行的回调
  var imgLoadTimer = setInterval(function () {
    // alert($('.billImg')[0]);
    if(imgLoaded($('.billImg')[0])){
      clearInterval(imgLoadTimer);
      imgCallback($('.billImg')[0]);
      var fontSize = parseInt($('html').css('fontSize'));
      var opt = {zoomFactor:3,offset:{x:3.75*fontSize,y:1.1*fontSize},maxZoom:6,tapZoomFactor:3};
      $('div.pinch-zoom').each(function () {
        new RTP.PinchZoom($(this), opt);
      });
      loadImg = true;
      if(loadImg && getStr){
        // if(loadImg && getStr && lotteryLoad){
        console.log('图片和ajax请求均完成');
        $("#showMes").fadeOut(500);
        $('#next,#indistinct').prop('disabled',false);
        flag = 0;
      }
    }
  },200);
  $('.pinch-zoom').html('').append(task.info.image);
  setTimeout(function () {
    if(imgLoadTimer){
      clearInterval(imgLoadTimer);
    }
  },3000);
}
// 左右滑动阻止默认
var imgStartX,imgStartY;
$('.imgWrap').off(touchstart).on(touchstart,function (e) {
  if(isMobile){
    imgStartX = e.originalEvent.touches[0].pageX;
    imgStartY = e.originalEvent.touches[0].pageY;
  }else{
    imgStartX = e.pageX;
    imgStartY = e.pageY;
  }
});
$('.imgWrap').off('touchend').on('touchend',function (e) {
  if(isMobile){
    var endX = e.originalEvent.changedTouches[0].pageX;
    var endY = e.originalEvent.changedTouches[0].pageY;
  }else{
    var endX = e.pageX;
    var endY = e.pageY;
  }
  var direction = GetSlideDirection(imgStartX, imgStartY, endX, endY);
  switch (direction){
    case 3:
      console.log('imgWrap left');
      e.preventDefault();
      break;
    case 4:
      console.log('imgWrap right');
      e.preventDefault();
      break;
  }
});


// nativeLoad.js
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
      // async: false,
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
      // async: false,
      dataType : 'json'
    })
  ).then(function (userInfo, lotteryInfo){
    var userInfoCode = userInfo[0].code;
    var lotteryInfoCode = lotteryInfo[0].code;
    if(userInfoCode == 200){
      var feedback_reply_count = userInfo[0].body.feedback_reply_count;
      var other_message_count = userInfo[0].body.other_message_count;
      var if_got_yesterday = userInfo[0].body.if_got_yesterday;

// console.log('if_got_yesterday: '+if_got_yesterday);
      if(if_got_yesterday === 'False'){
        console.log('phb addClass');
        $('.phb i').removeClass().addClass('msgRed');
      }else{
        $('.phb i').removeClass();
      }

      if(feedback_reply_count>0){
        console.log('feedback_reply_count>0');
        $('.xxzx').addClass('xxzx2');
        $('.xxzx i').addClass('msgRed msgNum');
        if(feedback_reply_count<10){
          $('.xxzx i').html(feedback_reply_count);
        }else{
          $('.xxzx i').html('9+');
        }
      }else if(other_message_count>0){
        console.log('other_message_count>0');
        $('.xxzx').removeClass('xxzx2');
        $('.xxzx i').removeClass().addClass('msgRed');
      }else{
        console.log('feedback_reply_count,other_message_count都为0');
        $('.xxzx').removeClass('xxzx2');
        $('.xxzx i').removeClass();
      }

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
                  // jobTask.notifyToRelogin();
                }
              },
              error: function () {
                console.log('remaining_chanceError');
                if(error == "timeout"){
                  // getuserremainingchanceAjax.abort();
                  // getuserremainingchanceFun();
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
      // jobTask.notifyToRelogin();
    }
  });
}
function bindJumpNative(projectName) {
//点击任务指引
  $('.taskGuide').on(touchstart,function () {
    console.log('taskGuideBtnclick');
    // jobTask.taskGuide();

    var guideImgArr;
    if(android){
      guideImgArr = {
        'sn': ['/static/h5/snGuide1a.png','/static/h5/snGuide2a.png'],
        'total': ['/static/h5/totalGa.png'],
        'date': ['/static/h5/dateGa.png'],
        'hospital': ['/static/h5/hospitalGa.png']
      };
    }else{
      guideImgArr = {
        'sn': ['/static/h5/snGuide1.png','/static/h5/snGuide2.png'],
        'total': ['/static/h5/totalG.png'],
        'date': ['/static/h5/dateG.png'],
        'hospital': ['/static/h5/hospitalG.png']
      };
    }

    var nowImgArr = guideImgArr[projectName];
    var len = nowImgArr.length;
    var i = 0;
    if(len > 0){
      if($('#rwzyImg')[0].complete){
        console.log('图片complete');
        $('#rwzy').fadeIn();
      }else{
        console.log('图片没有complete');
        $('#rwzyImg').load(function () {
          $('#rwzy').fadeIn();
        });
      }
      $('#rwzyImg').attr('src', nowImgArr[0]);
    }
    $('#read').off(touchstart).on(touchstart,function () {
      i++;
      if(len >= i+1){
        $("#showMes").fadeIn();
        flag = 1;
        $('#rwzyImg').load(function () {
          $("#showMes").fadeOut(500);
          flag = 0;
          $('#rwzy').fadeIn();
        });
        $('#rwzyImg').attr('src', nowImgArr[i]);
      }else{
        $('#rwzy').fadeOut(500);
      }
    });
  });
  $('#toLogin').removeClass().addClass('bgHide').css('position','absolute').fadeIn();
  var nativeTimer = setInterval(function () {
    if(jobTaskLoaded){
      clearInterval(nativeTimer);
//点击查看
      $('.more').off(touchstart).on(touchstart,function () {
        console.log('nextBtnClick');
        jobTask.checkTaskStatistics();
      });
//规则说明
      $('#gzsm').off(touchstart).on(touchstart,function () {
        console.log('nextBtnClick');
        jobTask.taskGuide();
      });
//单击消息中心按钮
      $('.xxzx').off(touchstart).on(touchstart,function () {
        console.log('xxzxTouchstart');
        jobTask.launchMessageCenterPage();
      });
//单击排行榜按钮
      $('.phb').off(touchstart).on(touchstart,function () {
        console.log('phbTouchstart');
        jobTask.launchRankingPage();
      });
    }
  },50);
}


// noToken.js
function noTokenHandle() {
  function swiprOrClick() {
    var swipe = false;
    var $html = $('html');
    $html.on(touchstart+' '+touchmove+' '+touchend, function(event) {
      switch(event.type) {
        case 'touchstart':
          swipe = false;
          break;
        case 'touchmove':
          swipe = true;
          break;
        case 'touchend':
          if( swipe ) {
            console.log('滑动');
            flag = 0;
          } else {
            console.log('点击');
            if($('#toLogin>div').css('display')=='none'){
              $('#toLogin').removeClass().addClass('bgShow').css('position','fixed');
              $('#toLogin>div').fadeIn();
            }
            flag = 1;
          }
          break;
      }
    });
  }
//单击未登录的取消按钮
  $('#cacelBtn').off(touchstart).on(touchstart,function () {
    flag = 0;
    $('#toLogin>div').fadeOut(500,function () {
      $('#toLogin').removeClass().addClass('bgHide').css('position','absolute');
    });

    swiprOrClick();

  });
//单击登录跳转登录页面
  var toLoginTimer = setInterval(function () {
    if(jobTaskLoaded){
      clearInterval(toLoginTimer);
      $('#loginBtn').off(touchstart).on(touchstart,function () {
        flag = 0;
        $('#toLogin>div').fadeOut(500,function () {
          $('#toLogin').removeClass().addClass('bgHide').css('position','absolute');
        });
        console.log('loginBtnTouchstart');
        jobTask.launchLoginPage();
      });
    }
  },50);

  swiprOrClick();
  $('.task_rand_score span').html(0);
  $('.total .num').html(0);
  $('.today_order .num').html(0);
}


//submit.js
function normalSubmit(task,answer,tokenStr,interface,deferred,getDataFail) {
  if (answer["text"]) {
    pybossa.saveTask(task, answer).done(function (data) {
      console.log('saveTask: ' + data);
      console.log(data);
      $('.pinch-zoom-container').css('height', 'auto');
      // deferred.resolve();
      // fsjz(3, 1, deferred);

      if(data.code == 808){
        fsjz(data['body']['k'], data['body']['q'], deferred);
      }else if(data.code == 812){
        // location = location;
        $('#taskTimeout').css('position','fixed').fadeIn();
        flag = 1;
        $('#timeoutBtn').off(touchstart).on(touchstart, function () {
          $('#taskTimeout').fadeOut(500,function () {
            $(this).css('position','absolute');
          });
          flag = 0;
        });
      }else if(data.code == 604){
        console.log('saveTaskCode604');
        jobTask.notifyToRelogin();
      } else {
        // getDataFail();
        deferred.resolve();
      }
    }).fail(function (err) {
      if(err.code == 403){
        $('#taskTimeout').css('position','fixed').fadeIn();
        flag = 1;
        $('#timeoutBtn').off(touchstart).on(touchstart, function () {
          $('#taskTimeout').fadeOut(500,function () {
            $(this).css('position','absolute');
          });
          flag = 0;
        });
      }else{
        getDataFail();
      }
      console.log('saveTask fail');
    });
  }
  else {
    $("#showMes").fadeOut(500);
    flag = 0;
    $('#answerTipBtn').off(touchstart).on(touchstart, function () {
      $('#answerTip').fadeOut(500,function () {
        $(this).css('position','absolute');
      });
      flag = 0;
    });
    $('#answerTip').css('position','fixed').fadeIn();
    flag = 1;
  }
}


//防刷
function fsjz(k, q, deferred) {
  var fsArr = [
    "亲 请认真答题哦！否则系统会认定您存在刷分行为而封号哦！",
    "您在短时间内已经答错两道测试题，如果您再次答错，系统将会判定您存在刷分行为，并进行封号处理。请认真答题，谢谢！",
    "因您在短时间内答错三道测试题，系统认定您存在刷分行为，将会封号24小时。如有疑问，可发送邮件至lijialin908@pingan.com.cn并附上您注册所用手机号。您在今日完成的所有任务将被判定为无效，过往任务已得积分不受影响。",
    "您已经连续答错两道测试题，如果您再次答错，系统将会判定您存在刷分行为，并进行封号处理。请认真答题，谢谢！",
    "因您连续答错三道测试题，系统认定您存在刷分行为，将会永久封号。如有疑问，可发送邮件至lijialin908@pingan.com.cn并附上您注册所用手机号。您在今日完成的所有任务将被判定为无效，过往任务已得积分可以照常兑换。"
  ];
  var fsTitle = [
    "提示",
    "警告",
    "公告"
  ];
  flag = 0;
  if(k==1){
    $('#kqfs h3').html(fsTitle[0]);
    $('#fsText').html(fsArr[0]);
  }else if(k==2){
    if(q==2){
      $('#kqfs h3').html(fsTitle[0]);
      $('#fsText').html(fsArr[3]);
    }else{
      $('#kqfs h3').html(fsTitle[0]);
      $('#fsText').html(fsArr[1]);
    }
  }else if(k==3){
    $('#kqfs h3').html(fsTitle[1]);
    $('#kqfs').css("background", "#aeb3bd");
    $('.kq-btns,#fhGuide').fadeOut();
    $('#fsText').css('marginBottom','0px');
    if(q==3){
      $('#fsText').html(fsArr[4]);
      flag = 1;
    }else{
      $('#fsText').html(fsArr[2]);
    }
  }
  $('#kqfs').css('position','fixed').fadeIn();
  $('#kqfs .kqqr').on(touchstart,function () {
    $('#kqfs').fadeOut(500,function () {
      $(this).css('position','absolute');
    });
    if(k==1 || k==2){
      deferred.resolve();
    }
  });
}
