var Input = (function() {
  var htmlInput = '\
    <section class="input-container" onselectstart="return false;">\
      <div class="input-bar">\
          <input style="background:#dcdcdc;border:1px solid #dcdcdc;text-align:left" id="answerInput" type="text" class="input-input showInfo tc bsb" readonly="readonly">\
          <div class="input-fake"><span class="input-cursor">|</span></div>\
      </div>\
    </section>';
  var htmlCurosr = '<span class="input-cursor">|</span>';
  return {
    initialize: function(options) {
      this.$root = options.root;
      this.$target = options.target;
      this.$target.html(htmlInput);

      this.maxLength = options.maxLength || 18;
      this._cursorIndex = 0;
      this._$input = $('.input-input');
      this._$fakeInput = $('.input-fake');
      this._$clear = $('.input-clear');
      this._$cursor = $('.input-cursor');

      this._$input.on('click', function(e) {
        this._onFocus(e);
      }.bind(this));
      this._$clear.on('click', function(e) {
        this._onClear();
      }.bind(this));
      this.$root.on('click', function(e) {
        // click other div, hide keyboard
        var $target = $(e.target);
        if ($target.hasClass('input-input') || $target.hasClass('input-fake') ||
          $target.hasClass('input-clear') || $target.hasClass('input-clear-icon')) {
          this._onFocus(e);  //目标是以上元素时获取焦点
        } else {
          this._onBlur();
        }
      }.bind(this));

      this.blur();
      return this;
    },
    put: function(val) {  //插入字符
      var num = this._$input.val();  //获取input值
      if (num.length < this.maxLength) {  //长度在限制范围内
        var preStr = num.substr(0, this._cursorIndex) + val.toString();  //截取光标索引之前的字符和传入参数进行拼接
        var endStr = num.substr(this._cursorIndex);  //截取光标之后的字符串
        num = num.replace(/\s*/g, '');  //去除空格
        num = preStr + endStr;  //拼接加入参数后的字符串
        this._$input.val(num);  //重设输入框的值
        this._$fakeInput.html(preStr + htmlCurosr);  //将光标索引之前的字符和传入参数和"|"进行拼接，放入伪造input
        this._$fakeInput.show();  //显示伪造input
        this._$clear && this._$clear.show();  //执行_$clear.show函数(存在的话)
        this._cursorIndex++;  //光标索引加1
        this._onChange && this._onChange(num);  //执行_onChange(存在的话)
      }
    },
    del: function() {
      if (this._cursorIndex > 0) {  //光标索引大于0
        var num = this._$input.val();  //获取输入框的值
        var preStr = num.substr(0, this._cursorIndex - 1);  //截取索引位置前一个字符之前的所有字符
        var endStr = num.substr(this._cursorIndex);  //截取索引之后的所有字符
        num = num.replace(/\s*/g, "");  //去除空格或换行
        num = preStr + endStr;  //重新拼接除了索引前一个字符之外的其他字符
        this._$input.val(num);  //重置输入框的值
        this._$fakeInput.html(preStr + htmlCurosr);  //重置伪造input的值
        this._$fakeInput.show();  //显示伪造input
        this._$clear && this._$clear.show();  //执行_$clear.show(存在的话)
        this._cursorIndex--;  //光标索引减1
        this._onChange && this._onChange(num);  //执行_onChange(存在的话)
      }
    },
    _showCursor: function(e) {  //确定伪造input值
      var left = this._$input.offset().left;  //输入框离文档左边距离
      var x = e.x || e.clientX || e.pageX;  //点击位置离文档左边距离
      var val = this._$input.val();  //
      var cursorIndex = (x - left > 0) ? parseInt((x - left) / 36) : 0;  //每个字宽度设为8，计算点击的大概位置索引
      cursorIndex = cursorIndex >= val.length ? val.length : cursorIndex;  //确定最后的自定义焦点位置
      this._cursorIndex = cursorIndex;  //
      this._$fakeInput.html(val.substr(0, cursorIndex) + htmlCurosr);  //截取点击位置之前的字符串与自定义焦点'|'拼接组成伪造字符串
    },
    clear: function() {  //清空input,将伪造input的值设为"|",重置光标索引为0
      this._$input.val('');
      this._$fakeInput.html(htmlCurosr);
      this._cursorIndex = 0;
    },
    focus: function() {  //执行_$clear.show(存在的话),隐藏伪造input,所有其他input失去焦点
      this._$clear && this._$clear.show();
      this._$fakeInput.show();
      // blur other input
      this.$root.find('input:not(.input-input)').blur();
    },
    blur: function() {  //执行_$clear.hide(存在的话),隐藏伪造input
      this._$clear && this._$clear.hide();
      this._$fakeInput.hide();
    },
    value: function() {  //获取输入框的值
      return this._$input.val();
    },
    _onChange: function(num) {  //执行onChange(存在的话)
      this.onChange && this.onChange(num);
    },
    _onClear: function() {  //清除input内容并执行_onChange(存在的话)
      console.log('clear');
      this.clear();
      this._onChange && this._onChange('');
    },
    _onFocus: function(e) {  //获取焦点,显示光标,并执行focus(存在的话)
      this.focus();
      this._showCursor(e);
      this.onFocus && this.onFocus();
    },
    _onBlur: function() {  //失去焦点并执行onBlur函数(存在的话)
      this.blur();
      this.onBlur & this.onBlur();
    },
    offset: function() {  //输入框相对文档位置
      return this._$input.offset();
    },
    height: function() {  //输入框高度
      return this._$input.height();
    }
  }
}());