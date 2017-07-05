//简化版完成
var jumpProjectFlag = false;
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
                if(!data['id']){
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
        return $.ajax({
            type: 'POST',
            url: url + 'token/taskrun',
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
                var def = $.Deferred();
                var taskId = myTaskId.id;  //第一次为空,loop中的getNextTask执行后才有值
                var xhr = _fetchNewTask(project.id, offset);
                // _fetchNewTask返回的是xhr对象,成功后返回的数据是一个含id、project_id、url等的对象
                xhr.done(function(task) {
                  // alert('task.id: '+task.id);  //920   920      950   972
                  // alert(previousTask);         //undefined  object   undefined  object
                    if (previousTask && task.id === previousTask.id) {
                      def.resolve(task);
                      /*
                    // alert(222);  没有登陆会先弹出111，再弹出222
                    //   也就是匿名登录状态下_fetchNewTask返回的都是当前任务，跟offset无关
                        var secondTry = _fetchNewTask(project.id, offset)
                        .done(function(secondTask){
                          // alert('secondTask.id: '+secondTask.id);  //920
                            _resolveNextTaskLoaded(secondTask, def);
                        });
                        */
                    }
                    else {
                      // alert(111);    登录后会弹出两次111
                      _resolveNextTaskLoaded(task, def);
                    }
                });
                return def.promise();  //返回的是_resolveNextTaskLoaded第二参数deferred的状态
            }
            function loop(task) {
              // getNextTask返回的是_resolveNextTaskLoaded第二参数deferred的状态
              // nextLoaded是_resolveNextTaskLoaded的状态,即由taskLoaded里的第二参数deferred状态决定
                var nextLoaded = getNextTask(1, task),
                taskSolved = $.Deferred();
                if(task.id) myTaskId.id = task.id;

                // 这里_presentTask已经被赋值为了pybossa.presentTask的参数函数,所以实质是调用了参数函数
                // 即运行presentTask的参数函数
                // presentTask里的saveTask函数运行后才会触发taskSolved完成状态
                _presentTask(task, taskSolved);

                // 第二次及以后只有taskLoaded和presentTask的第二参数deferred状态改变成功后才会loop
                // loop参数是从nextLoaded那里得到的
                $.when(nextLoaded, taskSolved).done(loop);
            }
          //第一次触发loop是当taskLoaded里的deferred状态成功后,即出现deferred.resolve()即可触发
            getNextTask(0, undefined).done(loop);
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
        token = $("#token").data("token");
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
