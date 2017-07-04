// pybossa.js library
//
// Copyright (C) 2015 SciFabric LTD.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
var jumpProjectFlag = false;
(function(pybossa, $, undefined) {
    var token="";
    var url = '/';
    var myTaskId;

    //AJAX calls
    function _userProgress(projectname) {
      console.log("_userProgress函数参数projectname: "+projectname);
      console.log(projectname);
        console.log("_userProgress发送ajax的url：url + 'token/project/' + projectname + '/userprogress'");

        return $.ajax({
            url: url + 'token/project/' + projectname + '/userprogress',
            beforeSend: function (request)
            {
                if (token==="") {
                    return;
                } else {
                    request.setRequestHeader("Authorization", token);
                }
            },
            success: function (data) {
                console.log("url + 'token/project/' + projectname + '/userprogress' success");
                console.log(data);
            },
            error: function (err) {
              console.log("url + 'token/project/' + projectname + '/userprogress' error");
              console.log(err);
            },
            cache: false,
            dataType: 'json'
        });
    }

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

    // Private methods
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

    function _getCurrentTaskId(url) {
        console.log("_getCurrentTaskId函数参数url: "+url);
        pathArray = url.split('/');
        if (url.indexOf('/task/')!=-1) {
            var l = pathArray.length;
            var i = 0;
            for (i=0;i<l;i++) {
                if (pathArray[i]=='task') {
                    return pathArray[i+1];
                }
            }
        }
        return false;
    }

    // fallback for user defined action
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
                var taskId = myTaskId;
              (taskId && (previousTask === undefined)) ? console.log('(taskId && (previousTask === undefined))最终值为true，调用了_fetchNewTask') : console.log('(taskId && (previousTask === undefined))最终值为false，调用了_fetchNewTask');
              console.log('taskId: '+taskId);
              console.log('previousTask === undefined: '+ (previousTask === undefined));
              // var xhr = (taskId && (previousTask === undefined)) ? _fetchTask(taskId) : _fetchNewTask(project.id, offset);
                var xhr = (taskId && (previousTask === undefined)) ? _fetchNewTask(project.id, 0) : _fetchNewTask(project.id, 1);
                xhr.done(function(task) {

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
              console.log("loop函数的参数task: "+task);
              console.log(task);
                var nextLoaded = getNextTask(1, task),
                taskSolved = $.Deferred(),
                nextUrl;
                if (task.id) {

                    myTaskId = task.id;

                    if (url != '/') {
                        nextUrl = url + '/project/' + projectname + '/task/' + task.id;
                    }
                    else {
                        nextUrl = '/project/' + projectname + '/task/' + task.id;
                    }
                    console.log(nextUrl);
                    // history.pushState({}, "Title", nextUrl);
                }

                _presentTask(task, taskSolved);
                $.when(nextLoaded, taskSolved).done(loop);
            }
            getNextTask(0, undefined).done(loop);
        });
    }


    // Public methods
    pybossa.newTask = function (projectname) {
        return _getProject(projectname).then(_getNewTask);
    };

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

    pybossa.getCurrentTaskId = function (url) {
      console.log("pybossa.getCurrentTaskId函数参数urle: "+url);
      console.log(url);
        if (url !== undefined) {
            return _getCurrentTaskId(url);
        }
        else {
            return _getCurrentTaskId(window.location.pathname);
        }
    };

    pybossa.userProgress = function (projectname) {
      console.log("pybossa.userProgress函数参数projectname: "+projectname);
      console.log(projectname);
        return _userProgress( projectname );
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

    pybossa.setEndpoint = function (endpoint) {
      console.log("pybossa.setEndpoint函数参数endpoint: "+endpoint);
      console.log(endpoint);

        // Check that the URL has the trailing slash, otherwise add it
        if ( endpoint.charAt(endpoint.length-1) != '/' ) {
            endpoint += '/';
        }
        url = endpoint;
        return url;
    };

    pybossa.setToken = function (token_value) {
      console.log("pybossa.setToken函数参数token_value: "+token_value);
      console.log(token_value);

        token_value = token_value;
    };

} (window.pybossa = window.pybossa || {}, jQuery));
