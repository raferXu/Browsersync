'use strict';

/**
 * Created by raferxu on 17/7/6.
 */
function setInputVal(task) {
  //发送图片获取识别字符串，并放入input中
  var str = task.info.alg_answer || '';
  $('.showInfo').val(str);
  keyboardEvent(str);
}
var h5board = function () {
  return {
    initialize: function initialize(options) {

      this.maxLength = options.maxLength || 18;
      this._cursorIndex = 0;
      this._$input = $('.input-input');
      this._$fakeInput = $('.input-fake');
      this._$cursor = $('.input-cursor');

      this._$input.on('click', function (e) {
        this._onFocus(e);
      }.bind(this));
      $('body').on('click', function (e) {
        // click other div, hide keyboard
        var $target = $(e.target);
        if ($target.hasClass('input-input') || $target.hasClass('input-fake') || $target.hasClass('input-clear') || $target.hasClass('input-clear-icon')) {
          this._onFocus(e);
        } else {
          this._onBlur();
        }
      }.bind(this));

      this.blur();
      return this;
    },
    _showCursor: function _showCursor(e) {
      var left = this._$input.offset().left;
      var x = e.x || e.clientX || e.pageX;
      var val = this._$input.val();
      var cursorIndex = x - left > 0 ? parseInt((x - left) / 18) : 0;
      cursorIndex = cursorIndex >= val.length ? val.length : cursorIndex;
      this._cursorIndex = cursorIndex;
      this._$fakeInput.html(val.substr(0, cursorIndex) + htmlCurosr);
    }
  };
}();

function keyboardEvent(str) {
  var strArr = [];
  strArr = str.split('');
  $('#answerInput').off(touchstart).on(touchstart, function (e) {
    e.preventDefault();
    $('#keyboardWrap').css('top', $(document).scrollTop() + 'px').show();
    // alert($(document).scrollTop());
    $('.keyboard').animate({ 'bottom': 0 }, function () {
      $(document).on(touchend, function (e) {
        var delTimer3 = setTimeout(function () {
          clearInterval(delTimer1);
          clearInterval(delTimer2);
          clearInterval(delTimer3);
        }, 0);
      });
    });
  });
  $('#sureTotalBtn').off(touchstart).on(touchstart, function (e) {
    e.preventDefault();
    $('.keyboard').animate({ 'bottom': '-4rem' }, function () {
      $(document).off(touchend);
      $('#keyboardWrap').hide();
    });
  });
  var delTimer1 = null,
      delTimer2 = null;
  $('#delTxt').off(touchstart).on(touchstart, function (e) {
    e.preventDefault();
    if (strArr.length > 0) {
      strArr.pop();
      $('.showInfo').val(strArr.join(''));
      delTimer1 = setInterval(function () {
        console.log('delTimer1');
        strArr.pop();
        $('.showInfo').val(strArr.join(''));
        if (strArr.length > 0) {
          delTimer2 = setInterval(function () {
            clearInterval(delTimer1);
            strArr.pop();
            $('.showInfo').val(strArr.join(''));
            console.log('delTimer2');
          }, 200);
        }
      }, 500);
    }
  });
  $('#keyboardM').off(touchstart).on(touchstart, '.zi', function (e) {
    e.preventDefault();
    strArr.push($(this).html());
    $('.showInfo').val(strArr.join(''));
  });
  $('#keyboardWrap').off(touchstart).on(touchstart, function () {
    $(this).hide();
  });
  $('#keyboard').off(touchstart).on(touchstart, function (event) {
    event.stopPropagation();
  });
}

jsloadDone = true;
console.log('jsloadDone: ' + jsloadDone);
//# sourceMappingURL=zb2自定义光标.js.map