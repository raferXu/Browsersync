/**
 * Created by raferxu on 17/7/6.
 */
var outputW = $('#output').width();
var oneTextW;
function setInputVal(task) {
  //发送图片获取识别字符串，并放入input中
  var str = task.info.alg_answer || '';
  $('.showInfo').val(str);
  $('#textLength').html(str);
  var strL = $('#textLength').width();
  console.log('#output元素宽度：'+outputW);
  console.log('答案文字宽度：'+strL);
  console.log('单个文字宽度：'+strL/str.length);
  oneTextW = strL/str.length || 18;
  if(!strL){
    console.log('获取不到答案文字总长度');
    strL=oneTextW;
  }
  var pt = (outputW-strL)/2 + 'px';
  console.log('paddingLeft: '+pt);
  $('.input-wrap')[0].style.paddingLeft = pt;
  keyboardEvent(str);
}
var htmlCurosr = '<span class="input-cursor">|</span>';
var H5board = (function () {
  return {
    initialize: function(options) {

      this.maxLength = options.maxLength || 18;
      this._cursorIndex = 0;
      this._$input = $('.input-input');
      // this._$input2 = $('#input-input');
      this._$fakeInput = $('.input-fake');
      this._$cursor = $('.input-cursor');

      this._$input.on(touchstart, function(e) {
        this._onFocus(e);
      }.bind(this));
      $('body').on(touchstart, function(e) {
        // click other div, hide keyboard
        var $target = $(e.target);
        if ($target.hasClass('input-input') || $target.hasClass('input-fake') ||
          $target.hasClass('input-clear') || $target.hasClass('input-clear-icon')) {
          this._onFocus(e);
        } else {
          this._onBlur();
        }
      }.bind(this));

      this.blur();
      return this;
    },
    setInputPT: function (v) {
      $('#textLength').html(v);
      var pt = (outputW-$('#textLength').width())/2 + 'px';
      $('.input-wrap')[0].style.paddingLeft = pt;
    },
    _showCursor: function(e) {
      var left = this._$input.offset().left;
      var x = e.originalEvent.touches[0].x || e.originalEvent.touches[0].clientX || e.originalEvent.touches[0].pageX;
      console.log(e);
      var val = this._$input.val();
      var cursorIndex = (x - left > 0) ? parseInt((x - left) / oneTextW) : 0;
      cursorIndex = cursorIndex >= val.length ? val.length : cursorIndex;
      console.log('_showCursor cursorIndex: '+cursorIndex);
      this._cursorIndex = cursorIndex;
      this._$fakeInput.html(val.substr(0, cursorIndex) + htmlCurosr);
    },
    focus: function() {
      this._$fakeInput.show();
      $('body').find('input:not(.input-input)').blur();
    },
    _onFocus: function(e) {
      this.focus();
      this._showCursor(e);
      // this.onFocus && this.onFocus();
    },
    _onBlur: function() {
      this.blur();
      // this.onBlur & this.onBlur();
    },
    blur: function() {
      // this._$clear && this._$clear.hide();
      this._$fakeInput.hide();
    },
    put: function(val) {
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
      this.setInputPT(num);
    },
    del: function() {
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
      this.setInputPT(num);
    },
  }
})();

var h5board = H5board.initialize({
  target: $('.input-bar')
});

function keyboardEvent(str) {
  var strArr = [];
  strArr = str.split('');
  $('#answerInput').off(touchstart).on(touchstart, function(e) {
    e.preventDefault();
    $('#keyboardWrap').css('top',$(document).scrollTop()+'px').show();
    // alert($(document).scrollTop());
    $('.keyboard').animate({'bottom': 0},function () {
      $(document).on(touchend, function(e) {
        var delTimer3 = setTimeout(function () {
          clearInterval(delTimer1);
          clearInterval(delTimer2);
          clearInterval(delTimer3);
        },0);
      });
    });
  });
  $('#sureTotalBtn').off(touchstart).on(touchstart, function(e) {
    e.preventDefault();
    $('.keyboard').animate({'bottom': '-4rem'},function () {
      $(document).off(touchend);
      $('#keyboardWrap').hide();
    });
  });
  var delTimer1 = null, delTimer2 = null;
  $('#delTxt').off(touchstart).on(touchstart, function(e) {
    e.preventDefault();
    h5board.del();
  });
  $('#keyboardM').off(touchstart).on(touchstart, '.zi', function(e) {
    e.preventDefault();
    h5board.put($(this).html());
  });
  $('#keyboardWrap').off(touchstart).on(touchstart, function (e) {
    console.log(e.target);
    $(this).hide();
  });
  $('#keyboard').off(touchstart).on(touchstart, function (event) {
    event.stopPropagation();
  });

  $(document).on(touchend, function(e) {
    var delTimer3 = setTimeout(function () {
      clearInterval(delTimer1);
      clearInterval(delTimer2);
      clearInterval(delTimer3);
    },0);
  });

}

jsloadDone = true;
console.log('jsloadDone: '+jsloadDone);