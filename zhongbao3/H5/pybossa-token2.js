var jumpProjectFlag = false;
(function(pybossa, $, undefined) {
    var token="";
    var url = '/';  //默认为／开头的请求url
    var myTaskId = {'id':''};
    function _fetchProject(projectname) {
      console.log("_fetchProject函数参数projectname: "+projectname);
      console.log(projectname);
      console.log("_fetchProject发送ajax的url: url + 'token/project'");
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

      console.log("_fetchNewTask发送ajax的url: url + 'token/project/' + projectId + '/newtask'");

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
    function _fetchTask(taskId) {
      console.log("_fetchTask函数参数taskId: "+taskId);
      console.log(taskId);
      console.log("_fetchTask发送ajax的url: url + 'token/task/' + taskId");

      return $.ajax({
            url: url + 'token/task/' + taskId,
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            success: function (data) {
                console.log("url + 'token/task/' + taskId success");
                console.log(data);
            },
            error: function(err){
                console.log("url + 'token/task/' + taskId error");
                console.log(err);
                if(err.status == 401){
                    console.log("url + 'token/task/' + taskId接口返回401");
                    jobTask.notifyToRelogin();
                }
            },
            cache: false,
            dataType: 'json'
        });
    }
    function _saveTaskRun(taskrun) {
        console.log("_saveTaskRun函数参数taskrun: "+taskrun);
        console.log(taskrun);
        console.log("_saveTaskRun发送ajax的url： url + 'token/taskrun'");
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
    function _getProject(projectname){
      console.log("_getProject函数参数projectname: "+projectname);
      console.log(projectname);
      return _fetchProject(projectname)
        .then(function(data) {return data[0];});
    }
    function _getNewTask(project) {
      console.log("_getNewTask函数参数project: "+project);
      console.log(project);
      return _fetchNewTask(project.id)
        .then(_addProjectDescription.bind(undefined, project));
    }
    function _addProjectDescription(project, task) {
      console.log("_addProjectDescription函数第一参数project: "+project+", 第二参数task："+task);
      console.log(project);
      console.log(task);
      return { question: project.description, task: task};
    }
    function _addAnswerToTask(task, answer) {
      console.log("_addAnswerToTask函数第一参数task: "+task+", 第二参数answer："+answer);
      console.log(task);
      console.log(answer);
      task.answer = answer;
        return task;
    }
    function _createTaskRun(answer, task) {
      console.log("_createTaskRun函数第一参数answer: "+answer+", 第二参数task："+task);
      console.log(answer);
      console.log(task);
      task = _addAnswerToTask(task, answer);
        var taskrun = {
            'project_id': task.project_id,
            'task_id': task.id,
            'info': task.answer
        };
        taskrun = JSON.stringify(taskrun);
        return _saveTaskRun(taskrun).then(function(data) {return data;});
    }
    var _taskLoaded = function(task, deferred) {
      console.log("_taskLoaded函数第一参数task: "+task+", 第二参数deferred："+deferred);
      console.log(task);
      console.log(deferred);
      deferred.resolve(task);
    };
    var _presentTask = function(task, deferred) {
      console.log("_presentTask函数第一参数task: "+task+", 第二参数deferred："+deferred);
      console.log(task);
      console.log(deferred);
        deferred.resolve(task);
    };
    function _setUserTaskLoaded (userFunc) {
      console.log("_setUserTaskLoaded函数参数userFunc: "+userFunc);
      console.log(userFunc);
      _taskLoaded = userFunc;
    }
    function _setUserPresentTask (userFunc) {
      console.log("_setUserPresentTask函数参数userFunc: "+userFunc);
      console.log(userFunc);
      _presentTask = userFunc;
    }
    function _resolveNextTaskLoaded(task, deferred) {
      console.log("_resolveNextTaskLoaded函数第一参数task: "+task+", 第二参数deferred："+deferred);
      console.log(task);
      console.log(deferred);
        var udef = $.Deferred();
        _taskLoaded(task, udef);
        udef.done(function(task) {
            deferred.resolve(task);
        });
    }
    function _run (projectname, _window) {
      console.log("_run函数第一参数projectname: "+projectname+", 第二参数_window："+_window);
      console.log(projectname);
      console.log(_window);
      _window = _window || window;
        _fetchProject(projectname).done(function(project) {
            project = project[0];
            function getNextTask(offset, previousTask) {
              console.log("getNextTask函数第一参数offset: "+offset+", 第二参数previousTask："+previousTask);
              console.log(offset);
              console.log(previousTask);
                offset = offset || 0;
                var def = $.Deferred();
                // var taskId = _getCurrentTaskId(_window.location.pathname);
                var taskId = myTaskId.id;
              (taskId && (previousTask === undefined)) ? console.log('(taskId && (previousTask === undefined))最终值为true，调用了_fetchNewTask') : console.log('(taskId && (previousTask === undefined))最终值为false，调用了_fetchNewTask');
              console.log('taskId: '+taskId);
              console.log('previousTask === undefined: '+ (previousTask === undefined));
              // var xhr = (taskId && (previousTask === undefined)) ? _fetchTask(taskId) : _fetchNewTask(project.id, offset);
                var xhr = (taskId && (previousTask === undefined)) ? _fetchNewTask(project.id, 0) : _fetchNewTask(project.id, offset);
                xhr.done(function(task) {
                  console.log('previousTask: '+previousTask);
                  console.log(previousTask);
                  console.log('done后的参数task: '+task);
                  console.log(task);
                  console.log('task.id: '+task.id);
                  // console.log('previousTask.id: '+previousTask.id);
                    if (previousTask && task.id === previousTask.id) {
                        console.log('previousTask && task.id === previousTask.id 的最终值为true，先调用了_fetchNewTask后才去调用_resolveNextTaskLoaded');
                        var secondTry = _fetchNewTask(project.id, offset)
                        .done(function(secondTask){
                            _resolveNextTaskLoaded(secondTask, def);
                        });
                    }
                    else {
                      console.log('previousTask && task.id === previousTask.id 的最终值为false，直接调用_resolveNextTaskLoaded');
                      _resolveNextTaskLoaded(task, def);
                    }
                });
                return def.promise();
            }

            function loop(task) {
              // alert('loop');
              console.log("loop函数的参数task: "+task);
              console.log(task);
                var nextLoaded = getNextTask(1, task),
                taskSolved = $.Deferred(),
                nextUrl;
                if(task.id) myTaskId.id = task.id;
                console.log('myTaskId.id被赋值了，为：'+task.id);
                // if (task.id) {
                //
                //     myTaskId = task.id;
                //
                //     if (url != '/') {
                //         nextUrl = url + '/project/' + projectname + '/task/' + task.id;
                //     }
                //     else {
                //         nextUrl = '/project/' + projectname + '/task/' + task.id;
                //     }
                //     console.log(nextUrl);
                //     // history.pushState({}, "Title", nextUrl);
                // }

                _presentTask(task, taskSolved);  //saveTask函数运行后才会触发taskSolved完成状态
                $.when(nextLoaded, taskSolved).done(loop);
            }
            getNextTask(0, undefined).done(loop);
        });
    }
    pybossa.saveTask = function (taskId, answer) {
      console.log("pybossa.saveTask函数第一参数taskId: "+taskId+", 第二参数answer："+answer);
      console.log(taskId);
      console.log(answer);

        if (typeof(taskId) === "number") {
            console.log("taskId为number,所以调用了_fetchTask后才去调用_createTaskRun");
            return _fetchTask(taskId).then(_createTaskRun.bind(undefined, answer));
        }
        if (typeof(taskId) === "object") {
          console.log("taskId为object,所以直接调用_createTaskRun");

          var task = taskId;
          return _createTaskRun(answer, task);
        }
    };
    pybossa.run = function (projectname, _window) {
      console.log("pybossa.run函数第一参数projectname: "+projectname+", 第二参数_window："+_window);
      console.log(projectname);
      console.log(_window);

        token = $("#token").data("token");
        console.log("token: "+token);
        return _run(projectname, _window);
    };
    pybossa.taskLoaded = function (userFunc) {
      console.log("pybossa.taskLoaded函数参数userFunc: "+userFunc);
      console.log(userFunc);
        return _setUserTaskLoaded( userFunc );
    };
    pybossa.presentTask = function (userFunc) {
      console.log("pybossa.presentTask函数参数userFunc: "+userFunc);
      console.log(userFunc);
      return _setUserPresentTask( userFunc );
    };
} (window.pybossa = window.pybossa || {}, jQuery));
