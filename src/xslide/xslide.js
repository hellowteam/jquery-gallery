/**
 * 
 * @module: xslide
 * @version: 1.0.0
 * @compatibility: modern browsers and IE >= __
 * @author: xiayanfei
 * @date: 2014-11-04
 *
 */

;(function (win, $, JQ) {

    "use strict";

    var body = $(win.document.body);

    function XSlide($elem, config) {
        this.slide = $elem;
        this.config = config;
        this._init();
    }

    $.extend(XSlide.prototype, {
        _init: function () {
            var self = this;
            var slide = this.slide;
            var sldWrap = slide.find('.xslide-wrap');
            var sldTrack = slide.find('.xslide-track');
            var sldItems = sldTrack.find('.item');
            var itemMR = parseInt( $(sldItems[0]).css('margin-right') );
            var itemWidth = $(sldItems[0]).width();
            var wrapWidth = sldWrap.width();

            // 一组的个数
            var groupLength = (wrapWidth + itemMR) / (itemWidth + itemMR);

            // 
            this.cellWidth = itemWidth + itemMR;
            this.groupWidth = groupLength * itemWidth + groupLength * itemMR;
            this.trackWidth = sldItems.length * itemMR + sldItems.length * itemWidth;

            // 设置宽度
            sldTrack.css('width', this.trackWidth);

            // 是否显示左右翻页按钮
            if (this.config.pageCtrl === true) {
                if (sldItems.length > groupLength) {
                    $('<a class="btn-prev">&lt;</a><a class="btn-next">&gt;</a>').appendTo(sldWrap);
                }
            }

            // 是否显示指示器
            if (this.config.pageNav === true) {

            }

            // 定时滚动
            this.slideTimer = setInterval(function () {
                self._play(self.config.stepBy);
            }, self.config.interval);

            this._bind();
        },

        _bind: function () {
            var self = this;
            var btnNext = this.slide.find('.btn-next'),
                btnPrev = this.slide.find('.btn-prev');

            btnNext.on('click', function () {
                console.log('next')
            });

            btnPrev.on('click', function () {
                console.log('prev')
            });

            // next:
            // this.play(stepBy);

            // prev:
            // this.play(stepBy);

            // hover暂停滚动
            if (this.config.pauseOnHover === true) {
                // 
                this.slide.on('mouseenter', function () {
                    // 
                    console.log('slideTimer', self.slideTimer)
                    clearInterval(self.slideTimer);

                }).on('mouseleave', function () {
                    // 
                    self.slideTimer = setInterval(function () {
                        self._play(self.config.stepBy);
                    }, self.config.interval);
                });
            }
        },

        _play: function (stepBy) {
            var self = this;
            var sldTrack = this.slide.find('.xslide-track');
            var sldDistance = 0;
            var sldContent;

            console.log('this.slide', this)

            // 一次移动n格 or 换一组
            if (stepBy === 'group') {
                sldDistance = self.groupWidth;
                // 查找到第一组ul
                sldContent = sldTrack.find('ul:first');
            } else if ($.isNumeric(stepBy)) {
                sldDistance = stepBy * this.cellWidth;
                // 查找到前stepBy个li
                sldContent = sldTrack.find('li:lt('+ stepBy +')');
            }

            console.log('sldDistance', sldDistance)

            sldTrack.animate({left: -sldDistance}, 500, '', function () {

                // 每滚一次，把滚去的部分追加到最后，实现无缝循环
                if (stepBy === 'group') {
                    sldTrack.append(sldContent);
                } else if ($.isNumeric(stepBy)) {
                    sldTrack.find('ul').append(sldContent);
                }

                // 
                sldTrack.css('left', 0);

                // 还剩最后一组
                // if (self.groupWidth - parseInt(sldTrack.css('left')) >= self.trackWidth) {
                //     clearInterval(self.slideTimer);
                // }
            });
        }

        // TODO:
        // destroy: function () {}

    });

    // JQ.xslide = function (selector, config) {
    //     return new XSlide(selector, config);
    // };

    // 默认配置
    $.extend(XSlide.prototype, {
        options: {
            loop: false,
            autoPlay: true,
            interval: 4000,         // ms
            stepBy: 1,              // [Integrated | 'group']点击翻页，移动n格 or 换一组
            pauseOnHover: true,     // 鼠标悬停暂停，在[autoPlay:true]时有效
            pageCtrl: true,         // 显示左右翻页按钮
            pageNav: false          // 显示当前指示器
        }
    });

    $.fn.xslide = function (config) {
        return this.each(function (i, elem) {
            var options = $.extend({}, XSlide.prototype.options, config);
            new XSlide($(elem), options);
        });
    }

})(window, jQuery, window["JQ"] || (window["JQ"] = {}));