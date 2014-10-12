/**
 * 
 * @module: dialog
 * @version: 1.0.0
 * @compatibility: modern browsers and IE>=8
 * @author: xiayanfei
 * @date: 2014-10-01

var dialog1 = JQ.dialog({
    width:,
    title:,    
    content:,
    dialogClass: "",
    closeOnEscape: true,
    buttons: {
        "确定": {
            clazz: 'btn-custom',
            dismiss: false,
            callback: function () {}
        },
        "取消": {
            dismiss: true
        }
    },
    // remote: path, // TODO: content will be loaded one time via jQuery's load method and injected into the .content div
    // effect: fade, // default effect
    backdrop: 'static' | true | false    
});

dialog1.set(config);
dialog1.show();
dialog1.hide();

dialog1.addEvent(eventType, handler); eventType = "show.dialog" || "shown.dialog" || "hide.dialog" || "hidden.dialog";

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

    function Dialog(config) {
        this.isCreated = false;
        this.config = $.extend({}, Dialog.prototype.options, config);
        this._init();
    }

    // Dialog.prototype = $.extend({}, Dialog.prototype, $.fn);

    var fn = Dialog.prototype;

    // Dialog默认配置
    $.extend(fn, {
        options: {
            // title: 'dialog title',
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
            // effect: 'fade', //default
            backdrop: true
        }
    });

    $.extend(fn, {
        _init: function () {
            // 
            var config = this.config;

            // var tmpl =  '<div class="dialog-popup">';
            //     tmpl +=     '<div class="dialog-body">';
            //     tmpl +=         '<div class="dialog-header">';
            //     tmpl +=             '<button type="button" class="close"><span>&times;</span></button>';
            //     tmpl +=             '<h4 class="dialog-title">{{title}}</h4>';
            //     tmpl +=         '</div>';
            //     tmpl +=         '<div class="dialog-content">{{body}}</div>';
            //     tmpl +=         '<div class="dialog-buttons">{{footer}}</div>';
            //     tmpl +=     '</div><!-- .dialog-body -->';
            //     tmpl +=     '<div class="dialog-overlay"></div>';
            //     tmpl += '</div>';
            // this.tmpl = tmpl;
            // this.dialog = $(tmpl);

            this._renderDialog();
            this._bindEvent();
        },

        _createDialog: function () {
            // 
        },

        _renderDialog: function () {
            // 
            var self = this;
            var config = this.config;

            // var dialog = this.dialog;
            // var dialogTitle = dialog.find('.dialog-title'),
            //     dialogBody = dialog.find('.dialog-body'),
            //     dialogFooter = dialog.find('.dialog-footer');
            // dialogTitle.html(config.title);
            // dialogBody.html(config.content);

            self.dialog = $('<div class="dialog-popup"/>')
                    .addClass(config.clazz)
                    .html('<div class="dialog-body"></div>');

            self.dialogBody = self.dialog.find('.dialog-body');
            self.dialogBackdrop = $('<div class="dialog-overlay"/>').appendTo(self.dialog);

            if (config.title !== undefined) {
                self.dialogTitle = $('<div class="dialog-header"/>')
                        .append('<h4 class="dialog-title">'+ config.title +'</h4>')
                        .appendTo(self.dialogBody);
            }

            self.dialogContent = $('<div class="dialog-content"/>')
                    .html(config.content).
                    appendTo(self.dialogBody);
            self.dialogButtons = $('<div class="dialog-buttons"/>').appendTo(self.dialogBody);            

            if (config.buttons.length > 0) {
                $.each(config.buttons, function (i, item) {
                    // item.text;
                    // item.clazz;

                    var props = {
                        type: 'button',
                        text: item.text,
                        class: item.clazz
                    };

                    $('<button/>', props).appendTo(self.dialogButtons);
                });
            }
        },

        _bindEvent: function () {
            // 
            var self = this;
            var config = this.config;
            if (config.backdrop !== undefined) {
                if (config.backdrop === 'static') {

                } else if (config.backdrop === true) {

                    console.log(config)

                    // body.off('click.dismiss.dialog').on('click.dismiss.dialog', '.dialog-overlay', function () {
                    //     console.log(111)
                    //     self.hide();
                    // });

                    self.dialogBackdrop.on('click.dismiss.dialog', function () {
                        console.log(111);
                        self.hide();
                    });

                } else if (config.backdrop === false) {

                }
            }
        },

        set: function (config) {
            this.config = $.extend({}, this.config, config);
            this._renderDialog();

            return this;
        },

        show: function () {            

            // 弹层为隐藏状态，显示弹层；已为显示状态，则不作处理
            if (!body.hasClass('dialog-open')) {

                // 弹层
                if (!this.isCreated) {
                    body.append(this.dialog);
                    // this._createDialog();
                    this.isCreated = true;
                }

                body.addClass('dialog-open');
                this.dialog.fadeIn();
            }

            return this;
        },

        hide: function () {
            if (body.hasClass('dialog-open')) {

                console.log(this.dialog)

                this.dialog.fadeOut();

                body.removeClass('dialog-open');
            }

            return this;
        }
    });

    JQ.dialog = function (config) {
        return new Dialog(config);
    };
    
})(window, jQuery, window["JQ"] || (window["JQ"] = {}));