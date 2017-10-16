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
var htmlCurosr = '<span class="input-cursor">|</span>';
var H5board = function () {
  return {
    initialize: function initialize(options) {

      this.maxLength = options.maxLength || 18;
      this._cursorIndex = 0;
      this._$input = $('.input-input');
      this._$fakeInput = $('.input-fake');
      this._$cursor = $('.input-cursor');

      this._$input.on(touchstart, function (e) {
        this._onFocus(e);
      }.bind(this));
      $('body').on(touchstart, function (e) {
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
      var x = e.originalEvent.touches[0].x || e.originalEvent.touches[0].clientX || e.originalEvent.touches[0].pageX;
      console.log(e);
      var val = this._$input.val();
      var cursorIndex = x - left > 0 ? parseInt((x - left) / 18) : 0;
      cursorIndex = cursorIndex >= val.length ? val.length : cursorIndex;
      console.log('_showCursor cursorIndex: ' + cursorIndex);
      this._cursorIndex = cursorIndex;
      this._$fakeInput.html(val.substr(0, cursorIndex) + htmlCurosr);
    },
    focus: function focus() {
      this._$fakeInput.show();
      $('body').find('input:not(.input-input)').blur();
    },
    _onFocus: function _onFocus(e) {
      this.focus();
      this._showCursor(e);
      // this.onFocus && this.onFocus();
    },
    _onBlur: function _onBlur() {
      this.blur();
      // this.onBlur & this.onBlur();
    },
    blur: function blur() {
      // this._$clear && this._$clear.hide();
      this._$fakeInput.hide();
    },
    put: function put(val) {
      var num = this._$input.val();
      if (num.length < this.maxLength) {
        var preStr = num.substr(0, this._cursorIndex) + val.toString();
        var endStr = num.substr(this._cursorIndex);
        num = num.replace(/\s*/g, '');
        num = preStr + endStr;
        this._$input.val(num);
        this._$fakeInput.html(preStr + htmlCurosr);
        this._$fakeInput.show();
        this._$clear && this._$clear.show();
        this._cursorIndex++;
        this._onChange && this._onChange(num);
      }
    },
    del: function del() {
      if (this._cursorIndex > 0) {
        var num = this._$input.val();
        var preStr = num.substr(0, this._cursorIndex - 1);
        var endStr = num.substr(this._cursorIndex);
        num = num.replace(/\s*/g, "");
        num = preStr + endStr;
        this._$input.val(num);
        this._$fakeInput.html(preStr + htmlCurosr);
        this._$fakeInput.show();
        this._$clear && this._$clear.show();
        this._cursorIndex--;
        this._onChange && this._onChange(num);
      }
    }
  };
}();

var h5board = H5board.initialize({
  target: $('.input-bar')
});

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
    // if(strArr.length>0){
    //   strArr.pop();
    //   $('.showInfo').val(strArr.join(''));
    //   delTimer1 = setInterval(function () {
    //     console.log('delTimer1');
    //     strArr.pop();
    //     $('.showInfo').val(strArr.join(''));
    //     if(strArr.length>0){
    //       delTimer2 = setInterval(function () {
    //         clearInterval(delTimer1);
    //         strArr.pop();
    //         $('.showInfo').val(strArr.join(''));
    //         console.log('delTimer2');
    //       },200);
    //     }
    //   },500);
    // }
    h5board.del();
  });
  $('#keyboardM').off(touchstart).on(touchstart, '.zi', function (e) {
    e.preventDefault();
    h5board.put($(this).html());
    // strArr.push($(this).html());
    // $('.showInfo').val(strArr.join(''));
  });
  $('#keyboardWrap').off(touchstart).on(touchstart, function (e) {
    console.log(e.target);
    $(this).hide();
  });
  $('#keyboard').off(touchstart).on(touchstart, function (event) {
    event.stopPropagation();
  });

  $(document).on(touchend, function (e) {
    var delTimer3 = setTimeout(function () {
      clearInterval(delTimer1);
      clearInterval(delTimer2);
      clearInterval(delTimer3);
    }, 0);
  });
}

jsloadDone = true;
console.log('jsloadDone: ' + jsloadDone);
//# sourceMappingURL=zb2focus.js.map