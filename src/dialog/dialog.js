/**
 * 
 * @module: dialog
 * @version: 1.0.0
 * @compatibility: modern browsers and IE>=8
 * @author: xiayanfei
 * @date: 2014-10-01
 *
 */

;(function (win, $, JQ) {

    "use strict";

    var body = $(win.document.body);

    var isEmptyObject = function (obj) {
            var isPlainObject = $.isPlainObject(obj);
            if (!isPlainObject) return false;

            return $.isEmptyObject(obj);
        };

    var keyMap = {
            "ESCAPE": 27
        };

    function Dialog(config) {
        this.isCreated = false;
        this.config = $.extend({}, Dialog.prototype.options, config);
        this._init();
    }

    var fn = Dialog.prototype;

    // Dialog默认配置
    $.extend(fn, {
        options: {
            // title: 'dialog title',//不设置默认标题
            content: 'Hello World!',
            buttons: [
                {
                    text: '确定'
                },
                {
                    text: '取消',
                    dismiss: true
                }
            ],
            // effect: 'fade', //默认效果为fade
            escape: true,
            backdrop: true
        }
    });

    $.extend(fn, {
        _init: function () {
            var config = this.config;
            this._createDialog();
        },

        _createDialog: function () {
            // 
            var self = this;
            var config = this.config;

            self.dialog = $('<div class="dialog-popup" tabindex="0" />')
                    .addClass(config.clazz)
                    .html('<div class="dialog-body"></div>');

            self.dialogBody = self.dialog.find('.dialog-body');
            self.dialogHeader = $('<div class="dialog-header"/>').appendTo(self.dialogBody);
            self.dialogBackdrop = $('<div class="dialog-overlay"/>').appendTo(self.dialog);

            self.dialogClose = $('<button type="button" data-dismiss="true" class="close">&times;</button>')
                    .appendTo(self.dialogHeader);

            if (config.title !== undefined) {
                self.dialogTitle = $('<h4 class="dialog-title">'+ config.title +'</h4>')
                        .appendTo(self.dialogHeader);
            }

            self.dialogContent = $('<div class="dialog-content"/>').appendTo(self.dialogBody);

            self.dialogButtons = $('<div class="dialog-buttons"/>').appendTo(self.dialogBody);
            
        },

        _renderDialog: function () {
            // 
            var self = this;
            var config = this.config;
            var dialog = this.dialog;

            if (config.clazz !== undefined) {
                dialog[0].className = 'dialog-popup ' + config.clazz;
            }

            if (config.width !== undefined && $.isNumeric(config.width)) {
                this.dialogBody.css('width', config.width);
            }

            if (config.backdrop !== undefined) {
                if (config.backdrop === 'static') {
                    this.dialogBackdrop.removeAttr('data-dismiss').off('click.dismiss.dialog');

                } else if (config.backdrop === true) {
                    this.dialogBackdrop.attr('data-dismiss', 'true');

                } else if (config.backdrop === false) {
                    this.dialogBackdrop.remove();
                }
            }

            if (config.title !== undefined) {
                self.dialogTitle.html(config.title);
            }

            self.dialogContent.html(config.content);

            if (config.buttons.length > 0) {
                // 先清空之前设置的按钮
                self.dialogButtons.html('');
                // 按配置项渲染按钮
                $.each(config.buttons, function (i, item) {
                    var clazz = item.clazz !== undefined ? 'btn ' + item.clazz : 'btn';
                    var props = {
                            "type": "button",
                            "text": item.text,
                            "class": clazz,
                            "data-dismiss": item.dismiss
                        };

                    // 若指定事件，给按钮绑定该事件
                    if (item.click !== undefined && $.isFunction(item.click)) {
                        var click = item.click;
                        props["click"] = function () {
                            click.apply(this, arguments);
                        };
                    }

                    $('<button/>', props).appendTo(self.dialogButtons);
                });
            }
        },

        _bindEvent: function (e) {
            // 
            var self = this;
            var config = this.config;

            this.dialog.on('click.dismiss.dialog', function (e) {
                var target = $(e.target);

                if (target.attr('data-dismiss') !== undefined) {
                    self.close();
                }
            });

            // onEscape
            if (config.escape) {
                this.dialog.on('keyup.dismiss.dialog', function (e) {
                    console.log(e.keyCode);
                    if (e.keyCode === keyMap.ESCAPE) {
                        self.close();
                    }
                });
            } else {
                this.dialog.off('keyup.dismiss.dialog');
            }
        },

        onClose: function (fn) {
            if (fn !== undefined && $.isFunction(fn)) {
                // fn.apply(this, arguments);
                this.handlerOnClose = fn;
            }
        },

        onOpen: function (fn) {
            if (fn !== undefined && $.isFunction(fn)) {
                // fn.apply(this, arguments);
                this.handlerOnOpen = fn;
            }
        },

        set: function (config) {
            this.config = $.extend({}, this.config, config);
            this._renderDialog();
            this.dialog.focus();

            return this;
        },

        open: function () {
            var self = this;
            var config = this.config;

            // 弹层为隐藏状态，显示弹层；已为显示状态，则不作处理
            if (!body.hasClass('dialog-open')) {

                // 弹层
                if (!this.isCreated) {
                    this.isCreated = true;
                    // 渲染弹框内容
                    this._renderDialog();
                    // 页面中插入弹框
                    this.dialog.appendTo(body);
                    // 绑定事件
                    this._bindEvent();
                }

                body.addClass('dialog-open');
                this.dialog.fadeIn('normal', function () {
                    // config.onOpen;
                    if (config.onOpen !== undefined && $.isFunction(config.onOpen)) {
                        config.onOpen.apply(this, arguments);
                    }

                    if (self.handlerOnOpen !== undefined) {
                        self.handlerOnOpen.apply(this, arguments);
                    }
                }).focus();
            }

            return this;
        },

        close: function () {
            var self = this;
            var config = this.config;

            if (body.hasClass('dialog-open')) {
                this.dialog.fadeOut('normal', function () {
                    // config.onClose;
                    if (config.onClose !== undefined && $.isFunction(config.onClose)) {
                        config.onClose.apply(this, arguments);
                    }

                    if (self.handlerOnClose !== undefined) {
                        self.handlerOnClose.apply(this, arguments);
                    }
                });
                body.removeClass('dialog-open');
            }

            return this;
        },

        // TODO:
        // destroy: function () {}

    });

    JQ.dialog = function (config) {
        return new Dialog(config);
    };
    
})(window, jQuery, window["JQ"] || (window["JQ"] = {}));