/*

 Copyright (c) Manuel Stofer 2013 - rtp.ch - RTP.PinchZoom.js

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */


/*global jQuery, console, define, setTimeout, window*/
(function () {
    'use strict';
    // raferxu
    var btnMove = true;
    var myTran3d;
    var myTran2d;
    var myOffsetX;
    var myOffsetY;
    var myScale;
    var myPaddingL = 0;
    var myPaddingT = 0;
    var myFinalScale = 1;
    var rectDragStartX,rectDragStartY,rectDragWidth,rectDragHeight;

    // 20170103
    var imgPosL = 0;
    var imgPosT = 0;
    var initImgPosL = 0;
    var initImgPosT = 0;

    var thatW = this;
    thatW.data = {'img':{},'rect':[],'comment':[]};
    thatW.subLabMgn = 0;

    thatW.get_data = function () { return thatW.data;};

    var definePinchZoom = function ($) {

        /**
         * Pinch zoom using jQuery
         * @version 0.0.2
         * @author Manuel Stofer <mst@rtp.ch>
         * @param el
         * @param options
         * @constructor
         */
        var PinchZoom = function (el, options) {
                this.el = $(el);
                this.zoomFactor = 1;
                this.lastScale = 1;
                this.offset = {
                    x: 0,
                    y: 0
                };
                this.options = $.extend({}, this.defaults, options);
                this.setupMarkup();
                this.bindEvents();
                this.update();
                // default enable.
                this.enable();

                // raferxu
                this.cut();
            },
            sum = function (a, b) {
                return a + b;
            },
            isCloseTo = function (value, expected) {
                return value > expected - 0.01 && value < expected + 0.01;
                //判断第一个参数value是否在第二个参数expected正负0.01范围内
            };

        PinchZoom.prototype = {

            defaults: {
                tapZoomFactor: 2,
                zoomOutFactor: 1.3,
                animationDuration: 300,
                maxZoom: 4,
                minZoom: 0.5,
                lockDragAxis: false,
                use2d: true,
                zoomStartEventName: 'pz_zoomstart',
                zoomEndEventName: 'pz_zoomend',
                dragStartEventName: 'pz_dragstart',
                dragEndEventName: 'pz_dragend',
                doubleTapEventName: 'pz_doubletap',

                // raferxu
                dragStartPageX: 0,
                dragStartPageY: 0,
                dragEndPageX: 0,
                dragEndPageY: 0,
                dragWidth: 0,
                dragHeight: 0,

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
                myPaddingT = this.getPoint($('.outer')[0]).top;
                myPaddingL = this.getPoint($('.outer')[0]).left;
                this.options.dragStartPageX = (event.touches[0].pageX-myPaddingL-5)/myScale - myOffsetX;
                this.options.dragStartPageY = (event.touches[0].pageY-myPaddingT-5)/myScale - myOffsetY;
                // console.log('handleDragStart dragStartPageX' + this.options.dragStartPageX);
                // console.log('event.touches[0].radiusX/2'+event.touches[0].radiusX/2);
                // console.log('event.touches[0].radiusX:'+event.touches[0].radiusX);
                // console.log('event.touches[0].radiusY:'+event.touches[0].radiusY);
            },

            /**
             * Event handler for 'drag'
             * @param event
             */
            handleDrag: function (event) {

                if (this.zoomFactor > 1.0) {
                    var touch = this.getTouches(event)[0];
                    this.drag(touch, this.lastDragPosition);
                    this.offset = this.sanitizeOffset(this.offset);
                    this.lastDragPosition = touch;
                }
                // raferxu
                if(!btnMove || this.zoomFactor == 1){
                    this.options.dragEndPageX = (event.changedTouches[0].pageX-myPaddingL)/myScale - myOffsetX;
                    this.options.dragEndPageY = (event.changedTouches[0].pageY-myPaddingT)/myScale - myOffsetY;
                    //this.options.dragStartPageX = this.options.dragStartPageX || ((event.touches[0].pageX-myPaddingL-5)/myScale - myOffsetX);
                    //this.options.dragStartPageY = this.options.dragStartPageY || ((event.touches[0].pageY-myPaddingT-5)/myScale - myOffsetY);
                    this.options.dragWidth = this.options.dragEndPageX - this.options.dragStartPageX + 1;
                    this.options.dragHeight = this.options.dragEndPageY - this.options.dragStartPageY + 1;
                    // console.log('myTran3d: ' + myTran3d);
                    // console.log('event.touches[0].pageX: ' + event.touches[0].pageX);
                    // console.log('myPaddingL: ' + myPaddingL);
                    // console.log('myScale: ' + myScale);
                    // console.log('myOffsetX: ' + myOffsetX);
                    // console.log('this.options.dragStartPageX: '+this.options.dragStartPageX);
                    // console.log('this.options.dragWidth: ' + this.options.dragWidth);
                    if(this.options.dragWidth>0) {
                        if(this.options.dragHeight>0){
                            if (this.options.dragStartPageY || this.options.dragStartPageX) {
                                $('.pinch-zoom div.addRect').remove();
                                // $('.pinch-zoom').append("<div class='addRect' style='width:"+this.options.dragWidth+"px;height:"+this.options.dragHeight+"px;border:1px solid #A00;position:absolute;top:"+(this.options.dragStartPageY)+"px;left:"+(this.options.dragStartPageX)+"px'></div>");
                                $('.pinch-zoom').append("<div class='addRect rect' style='width:" + this.options.dragWidth + "px;height:" + this.options.dragHeight + "px;position:absolute;top:" + (this.options.dragStartPageY) + "px;left:" + (this.options.dragStartPageX) + "px'></div>");
                                rectDragStartX = this.options.dragStartPageX;
                                rectDragStartY = this.options.dragStartPageY;
                                rectDragWidth = this.options.dragWidth;
                                rectDragHeight = this.options.dragHeight;
                            }
                        }else{
                            if (this.options.dragStartPageY || this.options.dragStartPageX) {
                                $('.pinch-zoom div.addRect').remove();
                                // $('.pinch-zoom').append("<div class='addRect' style='width:"+this.options.dragWidth+"px;height:"+this.options.dragHeight+"px;border:1px solid #A00;position:absolute;top:"+(this.options.dragStartPageY)+"px;left:"+(this.options.dragStartPageX)+"px'></div>");
                                $('.pinch-zoom').append("<div class='addRect rect' style='width:" + this.options.dragWidth + "px;height:" + Math.abs(this.options.dragHeight) + "px;position:absolute;top:" + (this.options.dragEndPageY) + "px;left:" + (this.options.dragStartPageX) + "px'></div>");
                                rectDragStartX = this.options.dragStartPageX;
                                rectDragStartY = this.options.dragEndPageY;
                                rectDragWidth = this.options.dragWidth;
                                rectDragHeight = Math.abs(this.options.dragHeight);
                            }
                        }
                    }else{
                        if(this.options.dragHeight>0){
                            if (this.options.dragStartPageY || this.options.dragStartPageX) {
                                $('.pinch-zoom div.addRect').remove();
                                // $('.pinch-zoom').append("<div class='addRect' style='width:"+this.options.dragWidth+"px;height:"+this.options.dragHeight+"px;border:1px solid #A00;position:absolute;top:"+(this.options.dragStartPageY)+"px;left:"+(this.options.dragStartPageX)+"px'></div>");
                                $('.pinch-zoom').append("<div class='addRect rect' style='width:" + Math.abs(this.options.dragWidth) + "px;height:" + this.options.dragHeight + "px;position:absolute;top:" + (this.options.dragStartPageY) + "px;left:" + (this.options.dragEndPageX) + "px'></div>");
                                rectDragStartX = this.options.dragEndPageX;
                                rectDragStartY = this.options.dragStartPageY;
                                rectDragWidth = Math.abs(this.options.dragWidth);
                                rectDragHeight = this.options.dragHeight;
                            }
                        }else{
                            if (this.options.dragStartPageY || this.options.dragStartPageX) {
                                $('.pinch-zoom div.addRect').remove();
                                // $('.pinch-zoom').append("<div class='addRect' style='width:"+this.options.dragWidth+"px;height:"+this.options.dragHeight+"px;border:1px solid #A00;position:absolute;top:"+(this.options.dragStartPageY)+"px;left:"+(this.options.dragStartPageX)+"px'></div>");
                                $('.pinch-zoom').append("<div class='addRect rect' style='width:" + Math.abs(this.options.dragWidth) + "px;height:" + Math.abs(this.options.dragHeight) + "px;position:absolute;top:" + (this.options.dragEndPageY) + "px;left:" + (this.options.dragEndPageX) + "px'></div>");
                                rectDragStartX = this.options.dragEndPageX;
                                rectDragStartY = this.options.dragEndPageY;
                                rectDragWidth = Math.abs(this.options.dragWidth);
                                rectDragHeight = Math.abs(this.options.dragHeight);
                            }
                        }
                    }
                }
            },

            //raferxu
            getPoint: function(obj) { //获取某元素以浏览器左上角为原点的坐标
                var t = obj.offsetTop; //获取该元素对应父容器的上边距
                var l = obj.offsetLeft; //对应父容器的上边距
                //判断是否有父容器，如果存在则累加其边距
                while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
                    t += obj.offsetTop; //叠加父容器的上边距
                    l += obj.offsetLeft; //叠加父容器的左边距
                }
                // console.log("top: " + t + " left: " + l);
                return {
                    "top": t,
                    "left": l
                }
            },

            handleDragEnd: function (event) {
                this.el.trigger(this.options.dragEndEventName);
                this.end();
                $('.pinch-zoom div.addRect').removeClass('addRect');
                this.options.dragStartPageY=0;
                this.options.dragStartPageX=0;
                // console.log('handleDragEnd');
                // console.log('rectDragStartX: '+rectDragStartX);
                // console.log('rectDragStartY: '+rectDragStartY);
                // console.log('pinch-zoom.img.width:'+$('.pinch-zoom img').width());
                // console.log('pinch-zoom.img.naturalWidth:'+$('.pinch-zoom img')[0].naturalWidth);
                // console.log('pinch-zoom.img.src:'+$('.pinch-zoom img').attr('src'));
                //console.log('imgInitial.img.width:'+$('.imgInitial img').width());
                //var imgScaleValue = ($('.pinch-zoom img')[0].naturalWidth)/($('.pinch-zoom img').width());
                //console.log('imgScaleValue:'+imgScaleValue);
                if(!btnMove || this.zoomFactor == 1){
                    var imgCurrentWidth = $('.pinch-zoom img').width();
                    var imgCurrentHeight = $('.pinch-zoom img').height();
                    var liHeightA = 90;
                    var liWidthA = 150;
                    var liDivWidth = 0;
                    var liDivHeight = 0;
                    var liDivHeightScale = 1;
                    var liDivWidthScale = 1;
                    var liDivMarginT = 0;
                    var liDivMarginL = 0;

                    //画高瘦60/100<150/90
                    if(rectDragWidth/rectDragHeight < liWidthA/liHeightA){
                        //100/90高度放大倍数
                        liDivHeightScale = rectDragHeight/liHeightA;
                        //90高度撑满外框
                        liDivHeight = liHeightA;
                        //60*(90/100)
                        liDivWidth = rectDragWidth/liDivHeightScale;
                        // console.log('liDivHeight:'+liDivHeight);
                        // console.log('liDivWidth:'+liDivWidth);
                        liDivMarginL = (liWidthA - liDivWidth)/2;
                    }else{
                        //画肥矮200/50>150/90
                        //200/150宽度放大倍数
                        liDivWidthScale = rectDragWidth/liWidthA;
                        //150宽度撑满外框
                        liDivWidth = liWidthA;
                        //50*(150/200)
                        liDivHeight = rectDragHeight/liDivWidthScale;
                        // console.log('liDivHeight:'+liDivHeight);
                        // console.log('liDivWidth:'+liDivWidth);
                        liDivMarginT = (liHeightA - liDivHeight)/2;
                    }
                    //var liHeightScale = rectDragHeight/liHeight;
                    //var liWidth = rectDragWidth/liHeightScale;
                    var cutInitHeight = liDivHeight*imgCurrentHeight/rectDragHeight;
                    var cutInitWidth = cutInitHeight/imgCurrentHeight*imgCurrentWidth;
                    //这里要减去平台系统里给img添加的padding:$('.pinch-zoom img').css('padding')

                    // 20170103
                    imgPosL = $('.pinch-zoom img').position().left;
                    imgPosT = $('.pinch-zoom img').position().top;
                    initImgPosL = initImgPosL || imgPosL;//获取img距离父元素的初始偏移
                    initImgPosT = initImgPosT || imgPosT;
                    var pinchImgPaddingL = parseFloat($('.pinch-zoom img').css('padding-left')) + initImgPosL;
                    var pinchImgPaddingT = parseFloat($('.pinch-zoom img').css('padding-top')) + initImgPosT;

                    console.log('imgCssPaddingL:'+$('.pinch-zoom img').css('padding-top'));
                    console.log('imgPaddingL:'+pinchImgPaddingL);
                    console.log('imgPaddingT:'+pinchImgPaddingT);
                    var cutInitMarginLeft = (rectDragStartX-pinchImgPaddingL) * liDivHeight/rectDragHeight;
                    var cutInitMarginTop = (rectDragStartY-pinchImgPaddingT) * liDivHeight/rectDragHeight;
                    // console.log('rectDragHeight: '+rectDragHeight);
                    // console.log('imgCurrentHeight:'+$('.pinch-zoom img').height());
                    // console.log('liHeightScale:'+liHeightScale);
                    // console.log('cutInitHeight:'+cutInitHeight);
                    // console.log('rectDragWidth: '+rectDragWidth);
                    // console.log('imgCurrentWidth:'+$('.pinch-zoom img').height());
                    // console.log('liHeightScale:'+liHeightScale);
                    // console.log('cutInitHeight:'+cutInitHeight);
                    //$('.subImg').append('<li style="width:'+rectDragWidth+'px;height:'+rectDragHeight+'px;background:#DDD url('+$('.pinch-zoom img').attr("src")+') no-repeat left top"></li>');
                    $('.subImg').css('display','block');
                    //$('.subImg').append('<li style="height:100px;float:left;overflow:hidden;margin:3px;width:'+liWidth+'px"><img src="'+$('.pinch-zoom img').attr('src')+'" style="height:'+cutInitHeight+'px;margin-left:-'+cutInitMarginLeft+'px;margin-top:-'+cutInitMarginTop+'px" /></li>');
                    $('.subImg').append('<li class="bdTra" style="height:'+liHeightA+'px;float:left;overflow:hidden;margin:3px;width:'+liWidthA+'px;background:#DDD;"><div style="margin-top:'+liDivMarginT+'px;margin-left:'+liDivMarginL+'px;height:'+liDivHeight+'px;overflow:hidden;width:'+liDivWidth+'px;background:#AAA"><img src="'+$('.pinch-zoom img').attr('src')+'" style="height:'+cutInitHeight+'px;margin-left:-'+cutInitMarginLeft+'px;margin-top:-'+cutInitMarginTop+'px" /></div></li>');

                    var SmallLiW = parseInt($('.subImg>li').outerWidth())+parseInt($('.subImg>li').css('margin-left'))+parseInt($('.subImg>li').css('margin-right'));
                    var ulW = SmallLiW * $('.subImg>li').size();
                    $('.subImg').width(ulW);
                    // console.log('ulW'+ulW);

                    // ***********图片滑动
                    var isdrag=false;
                    var tx,x,c,arr=[];
                    var pic2=document.getElementById('cutImgUl');
                    pic2.addEventListener('touchstart',function(e){
                        isdrag = true;
                        tx = parseInt(document.getElementById("cutImgUl").style.left+0);
                        x = e.touches[0].pageX;
                        // console.log('touchstartPageX:'+x);
                        return false;
                    });
                    pic2.addEventListener('touchmove',function(e){
                        e.preventDefault();
                        // c=$('#cutImgUl').offset().left/30;
                        // if (isdrag){
                        //     var n = tx + e.touches[0].pageX - x+c;
                        //     console.log('touchmovePageX:'+e.touches[0].pageX);
                        //     console.log('n:'+n);
                        //     var no = ulW - $('html').width();
                        //     console.log('htmlWidth'+$('html').width());
                        //     if(n>-no&&n<0)
                        //     {
                        //         $("#cutImgUl").css("left",n);
                        //         var left=$("#cutImgUl").css("left");
                        //     }
                        //     return false;
                        // }
                        if(isdrag){
                            var n = tx + e.touches[0].pageX - x;
                            var no = ulW + 6 - $('html').width();
                            if(n<0 && n>-no){
                                $("#cutImgUl").css("left",n);
                            }else if(n>0){
                                $("#cutImgUl").css("left",0);
                            }else if(n<-no){
                                $("#cutImgUl").css("left",-no);
                            }
                        }
                    });
                    pic2.addEventListener('touchend',function(){
                        isdrag = false;
                    });
                    // ***********；

                    $('.cutImgLabel .labelComment').hide();
                    $('.cutImgLabel').append('<textarea name="labelArea" class="labelComment" style="width:100%;min-height:35px;border:1px solid #AAA;resize:none;background:#EEE;border-radius:3px;" placeholder="请输入标注"></textarea>');
                    // console.log($('.outer').outerHeight());
                    // console.log($('body').outerHeight());
                    // console.log($('h4.labelTitle').outerHeight());

                    // var subLabMgn = $('body').outerHeight()-$('.outer').outerHeight()-$('h4.labelTitle').outerHeight()-40;
                    thatW.subLabMgn = $('html').outerHeight()-$('.outer').outerHeight()-$('h4.labelTitle').outerHeight()-40;

                    $('#submitLabel').css('position','static');
                    $('#submitLabel').css('width','100vw');
                    // console.log($('.outer').outerHeight());
                    // console.log($('body').outerHeight());
                    // console.log($('h4.labelTitle').outerHeight());
                    if($('.subImg > li').size() == 1){
                        $('#submitLabel').css('margin-top',thatW.subLabMgn);
                    }
                    $('#cutImgUl').on('touchstart','li',function () {
                        var $index = $('#cutImgUl li').index(this);
                        $(this).siblings().removeClass('bdBlue').end().addClass('bdBlue');
                        $('.cutImgLabel .labelComment').hide();
                        $('.cutImgLabel .labelComment:eq('+$index+')').show();
                        //console.log('$index:'+$index);
                    });
                    if($('.subImg > li').size() > 0){
                        $('#submitLabel').removeAttr('disabled').addClass('bgRed');
                        data.img.width = $('.pinch-zoom img').width();
                        data.img.height = $('.pinch-zoom img').height();
                        data.rect.push({'x':rectDragStartX,'y':rectDragStartY,'w':rectDragWidth,'h':rectDragHeight});

                        // var submitData = document.getElementById('submitLabel');
                        // submitData.onclick = (function(tdata){
                        //     //tdata.img.naturalWidth = $('.pinch-zoom img')[0].naturalWidth;
                        //     //tdata.img.naturalHeight = $('.pinch-zoom img')[0].naturalHeight;
                        //     tdata.img.width = $('.pinch-zoom img').width();
                        //     tdata.img.height = $('.pinch-zoom img').height();
                        //     // tdata.rect.x = rectDragStartX;
                        //     // tdata.rect.y = rectDragStartY;
                        //     // tdata.rect.w = rectDragWidth;
                        //     // tdata.rect.h = rectDragHeight;
                        //     tdata.rect.push({'x':rectDragStartX,'y':rectDragStartY,'w':rectDragWidth,'h':rectDragHeight});
                        //     //tdata.comment = '000';
                        //     return function(){
                        //         //console.log(i);
                        //         //thatW.data = {'img':{},'rect':[],'comment':[]};
                        //         $('textarea.labelComment').each(function(i){
                        //             // console.log('.labelComment'+$(this).val());
                        //             tdata.comment[i]=$(this).val();
                        //         });
                        //         // console.log(tdata);
                        //     }
                        // })(data);
                    }
                }
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
            handleDoubleTap: function (event) {//连续双击
                var center = this.getTouches(event)[0],  //当前双击触摸点相对container坐标
                    zoomFactor = this.zoomFactor > 1 ? 1 : this.options.tapZoomFactor,  //当前缩放比
                    startZoomFactor = this.zoomFactor,
                    updateProgress = (function (progress) {
                        this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);

                        // raferxu修复缩放到1时按钮隐藏
                        myFinalScale = (startZoomFactor + progress * (zoomFactor - startZoomFactor));
                        if(myFinalScale == 1){
                            $('.cutMove').hide();
                        }
                    }).bind(this);
                if (this.hasInteraction) {
                    return;
                }
                if (startZoomFactor > zoomFactor) {
                    center = this.getCurrentZoomCenter();
                }

                this.animate(this.options.animationDuration, updateProgress, this.swing);
                this.el.trigger(this.options.doubleTapEventName);

                //raferxu
                // console.log('handleDoubleTap e.touches[0].pageX: '+event.touches[0].pageX);
                // console.log('pinch-zoom.img.width:'+$('.pinch-zoom img').width());
                // console.log('.pinch-zoom:'+$('.pinch-zoom').width());
                // console.log('.pinch-zoom-container:'+$('.pinch-zoom-container').width());
                // console.log('.outer:'+$('.outer').width());
            },

            /*****处理滚动事件开始*****/
            handleMousewheel: function (event) {
                var wheelDelta = event.wheelDelta;
                var center,zoomFactor,startZoomFactor,updateProgress;
                    center = this.getMouseTouches(event);
                    // zoomFactor = this.zoomFactor > 1 ? 1 : this.options.tapZoomFactor,
                console.log(this.zoomFactor);
                console.log(wheelDelta); //前滚为－120
                    if(wheelDelta > 0){
                        if(this.zoomFactor > 1){
                            zoomFactor = (this.zoomFactor * 0.6) < 1 ? 1 : (this.zoomFactor * 0.6);
                        }else{
                            zoomFactor = 1;
                        }
                    }else{
                        if(this.zoomFactor < 4){
                            zoomFactor = (this.zoomFactor * 1.3) > 4 ? 4 : (this.zoomFactor * 1.3);
                        }else {
                            zoomFactor = 4;
                        }
                    }
                    startZoomFactor = this.zoomFactor;
                    updateProgress = (function (progress) {
                        this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);

                        myFinalScale = (startZoomFactor + progress * (zoomFactor - startZoomFactor));
                        if(myFinalScale == 1){
                            $('.cutMove').hide();
                        }else if(myFinalScale > 1){
                            $('.cutMove').show();
                        }
                    }).bind(this);
                if (this.hasInteraction) {
                    return;
                }
                if (startZoomFactor > zoomFactor) {
                    center = this.getCurrentZoomCenter();
                    // console.log('getCurrentZoomCenter: '+center);
                    // console.log(center);
                }
                // console.log('handleMousewheel center:'+center);
                this.animate(this.options.animationDuration, updateProgress, this.swing);
                this.el.trigger(this.options.doubleTapEventName);
            },
            /*****处理滚动事件结束*****/

            /**
             * Max / min values for the offset
             * @param offset
             * @return {Object} the sanitized offset
             */
            sanitizeOffset: function (offset) {//确定传入的offset的范围是不是在0到缩放后container所增减的宽高
                var maxX = (this.zoomFactor - 1) * this.getContainerX(),
                    maxY = (this.zoomFactor - 1) * this.getContainerY(),
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
                this.scale(zoomFactor / this.zoomFactor, center);
            },

            /**
             * Scales the element from specified center
             * @param scale
             * @param center
             */
            scale: function (scale, center) {
                scale = this.scaleZoomFactor(scale);

                /***滚动兼容滚轮开始***/
                // console.log('center: '+center);
                // console.log(center);
                /***滚动兼容滚轮结束***/

                this.addOffset({
                    x: (scale - 1) * (center.x + this.offset.x),
                    y: (scale - 1) * (center.y + this.offset.y)
                });
            },

            /**
             * Scales the zoom factor relative to current state
             * @param scale
             * @return the actual scale (can differ because of max min zoom factor)
             */
            scaleZoomFactor: function (scale) {
                var originalZoomFactor = this.zoomFactor;
                this.zoomFactor *= scale;
                this.zoomFactor = Math.min(this.options.maxZoom, Math.max(this.zoomFactor, this.options.minZoom));
                return this.zoomFactor / originalZoomFactor;
                //zoomFactor没超出最值时返回原参数scale，该函数确定最后实际缩放
            },

            /**
             * Drags the element
             * @param center
             * @param lastCenter
             */
            drag: function (center, lastCenter) {
                if (lastCenter) {
                    //raferxu
                    if(btnMove){
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
                }
            },
            // raferxu
            cut: function () {
                // $('.cutMove').toggle(function () {
                //     btnMove = false;
                //     $(this).val('切换到移动');
                // },function () {
                //     btnMove = true;
                //     $(this).val('切换到截图');
                // });
                $('.cutMove').click(function (e) {
                    //e.preventDefault();
                    if(btnMove){
                        btnMove = false;
                        $(this).val('切换到移动');
                        //$(this).html('切换到移动');
                    }else{
                        btnMove = true;
                        $(this).val('切换到截图');
                        //$(this).html('切换到截图');
                    }
                });

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
                this.offset = {
                    x: this.offset.x + offset.x,
                    y: this.offset.y + offset.y
                };
            },

            sanitize: function () {
                if (this.zoomFactor < this.options.zoomOutFactor) {
                    this.zoomOutAnimation();
                } else if (this.isInsaneOffset(this.offset)) {
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
                var targetOffset = this.sanitizeOffset(this.offset),
                    startOffset = {
                        x: this.offset.x,
                        y: this.offset.y
                    },
                    updateProgress = (function (progress) {
                        this.offset.x = startOffset.x + progress * (targetOffset.x - startOffset.x);
                        this.offset.y = startOffset.y + progress * (targetOffset.y - startOffset.y);
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
                var startZoomFactor = this.zoomFactor,
                    zoomFactor = 1,
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
            updateAspectRatio: function () {//containerX与el[0]的宽高比的比值，保证container[0]和el[0]的宽高比一致
                this.setContainerY(this.getContainerX() / this.getAspectRatio());
            },

            /**
             * Calculates the initial zoom factor (for the element to fit into the container)
             * @return the initial zoom factor
             */
            getInitialZoomFactor: function () {//container[0]的总宽与el[0]总宽之比
                // use .offsetWidth instead of width()
                // because jQuery-width() return the original width but Zepto-width() will calculate width with transform.
                // the same as .height()
                return this.container[0].offsetWidth / this.el[0].offsetWidth;
            },

            /**
             * Calculates the aspect ratio of the element
             * @return the aspect ratio
             */
            getAspectRatio: function () {//el[0]的总宽与总高之比
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
                var length = this.container[0].offsetWidth * this.zoomFactor,
                    offsetLeft  = this.offset.x,
                    offsetRight = length - offsetLeft -this.container[0].offsetWidth,
                    widthOffsetRatio = offsetLeft / offsetRight,
                    centerX = widthOffsetRatio * this.container[0].offsetWidth / (widthOffsetRatio + 1),

                    // the same for the zoomcenter y
                    height = this.container[0].offsetHeight * this.zoomFactor,
                    offsetTop  = this.offset.y,
                    offsetBottom = height - offsetTop - this.container[0].offsetHeight,
                    heightOffsetRatio = offsetTop / offsetBottom,
                    centerY = heightOffsetRatio * this.container[0].offsetHeight / (heightOffsetRatio + 1);

                // prevents division by zero
                if (offsetRight === 0) { centerX = this.container[0].offsetWidth; }
                if (offsetBottom === 0) { centerY = this.container[0].offsetHeight; }

                return {
                    x: centerX,
                    y: centerY
                };
            },

            canDrag: function () {
                return !isCloseTo(this.zoomFactor, 1);
            },

            // raferxu
            showBtn: function () {
                $('.cutMove').show();
            },
            hideBtn: function () {
                $('.cutMove').hide();
            },

            /**
             * Returns the touches of an event relative to the container offset
             * @param event
             * @return array touches
             */
            getTouches: function (event) {//返回当前点相对container容器的坐标
                var position = this.container.offset();
                return Array.prototype.slice.call(event.touches).map(function (touch) {
                    return {
                        x: touch.pageX - position.left,
                        y: touch.pageY - position.top
                    };
                });
            },

            /*****滚动事件鼠标位置开始*****/
            getMouseTouches: function (event) {//返回当前点相对container容器的坐标
                var position = this.container.offset();
                // console.log('getMouseTouches position: '+position);
                // console.log(position);
                // console.log(event.pageX);
                return {
                        x: event.pageX - position.left,
                        y: event.pageY - position.top
                };
            },
            /*****滚动事件鼠标位置结束*****/

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

            getContainerX: function () {//获取container[0]的总宽(width+padding+border)
                return this.container[0].offsetWidth;
            },

            getContainerY: function () {//获取container[0]的总高
                return this.container[0].offsetHeight;
            },

            setContainerY: function (y) {//设置container的高
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

                    var zoomFactor = this.getInitialZoomFactor() * this.zoomFactor,
                        offsetX = -this.offset.x / zoomFactor,
                        offsetY = -this.offset.y / zoomFactor,
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

                    //raferxu
                    myTran2d = transform2d;
                    myTran3d = transform3d;
                    myOffsetX = offsetX;
                    myOffsetY = offsetY;
                    myScale = zoomFactor;

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
                    if (interaction !== newInteraction) {//如果传入的新交互和原交互不同

                        if (interaction && !newInteraction) {//如果有原交互而没有新交互
                            switch (interaction) {//根据原交互类型判断是放大结束还是拖拽结束从而进行相关end处理函数
                                case "zoom":
                                    target.handleZoomEnd(event);
                                    break;
                                case 'drag':
                                    target.handleDragEnd(event);
                                    break;
                            }
                        }

                        switch (newInteraction) {//有新交互看看是放大还是拖拽
                            case 'zoom':
                                target.handleZoomStart(event);
                                break;
                            case 'drag':
                                target.handleDragStart(event);
                                break;
                        }
                    }
                    interaction = newInteraction;//将传入新交互给原交互
                },

                updateInteraction = function (event) {
                    // raferxu
                    if(target.canDrag()){
                        target.showBtn();
                    }else{
                        target.hideBtn();
                    }
                    if (fingers === 2) {//两个手指时放大
                        setInteraction('zoom');
                        // raferxu
                        // } else if (fingers === 1 && target.canDrag()) {
                    } else if (fingers === 1) {//一个手指时拖拽
                        setInteraction('drag', event);
                    } else {
                        setInteraction(null, event);
                    }
                },

                targetTouches = function (touches) {//将touches转成数组并返回数组每一个值里的pageX和pageY属性组成新数组
                    return Array.prototype.slice.call(touches).map(function (touch) {
                        return {
                            x: touch.pageX,
                            y: touch.pageY
                        };
                    });
                },

                getDistance = function (a, b) {//获取a和b两点的距离
                    var x, y;
                    x = a.x - b.x;
                    y = a.y - b.y;
                    return Math.sqrt(x * x + y * y);
                },

                calculateScale = function (startTouches, endTouches) {//返回两指离开时距离和两指开始触摸时距离的比值
                    var startDistance = getDistance(startTouches[0], startTouches[1]),
                        endDistance = getDistance(endTouches[0], endTouches[1]);
                    return endDistance / startDistance;
                },

                cancelEvent = function (event) {//取消事件默认行为和阻止冒泡
                    event.stopPropagation();
                    event.preventDefault();
                },

                detectDoubleTap = function (event) {//检测两次点击
                    var time = (new Date()).getTime();

                    if (fingers > 1) {//多于一个手指将上次接触开始值设为null
                        lastTouchStart = null;//null参与加减计算会转成0
                    }

                    if (time - lastTouchStart < 300) {//两次点击间隔在300毫秒内
                        cancelEvent(event);

                        target.handleDoubleTap(event);//执行
                        switch (interaction) {//匹配interaction确定是双击放大还是按住拖拽
                            case "zoom":
                                target.handleZoomEnd(event);
                                break;
                            case 'drag':
                                target.handleDragEnd(event);
                                break;
                        }
                    }

                    if (fingers === 1) {//一根手指时把lastTouchStart设为当前时间
                        lastTouchStart = time;
                    }
                },
                /******定义滚动事件开始*******/
                detectMousewheel = function(e){
                    target.handleMousewheel(e);
                },
                /******定义滚动事件结束*******/
                firstMove = true;



                el.addEventListener('touchstart', function (event) {
                if(target.enabled) {
                    firstMove = true;
                    fingers = event.touches.length;
                    detectDoubleTap(event);
                }
            });

            el.addEventListener('touchmove', function (event) {
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

            /******给元素添加滚动事件开始*******/
            el.addEventListener("mousewheel", function (e) {
                // cross-browser wheel delta
                // var e = window.event || e; // old IE support
                // var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                // el.style.width = Math.max(50, Math.min(800, el.width + (30 * delta))) + "px";
                // console.log('e.pageX: '+e.pageX);
                if(target.enabled) {
                    detectMousewheel(e);
                    return false;
                }
            });
            /******给元素添加滚动事件结束*******/
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
