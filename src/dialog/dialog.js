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
        this.isShown = false;
        this.config = $.extend({}, Dialog.prototype.options, config);
        this._init();
    }

    Dialog.prototype.options = {
        title: 'Title',
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
        backdrop: true,
        effect: 'fade'
    };

    Dialog.prototype._init = function () {
        // 
        var config = this.config;

        var tmpl =  '<div class="dialog-popup">';
            tmpl +=     '<div class="dialog-content">';
            tmpl +=         '<div class="dialog-header">';
            tmpl +=             '<button type="button" class="close"><span>close &times;</span></button>';
            tmpl +=             '<h4 class="dialog-title">Title</h4>';
            tmpl +=         '</div>';
            tmpl +=         '<div class="dialog-body"></div>';
            tmpl +=         '<div class="dialog-footer"></div>';
            tmpl +=     '</div><!-- .dialog-content -->';
            tmpl +=     '<div class="dialog-overlay"></div>';
            tmpl += '</div>';

        this.dialog = $(tmpl);
        this._renderDialog();
        this._bindEvent();
    };

    Dialog.prototype._renderDialog = function () {
        // 
        var config = this.config;
        var dialog = $(this.dialog);

        var dialogTitle = dialog.find('.dialog-title'),
            dialogBody = dialog.find('.dialog-body'),
            dialogFooter = dialog.find('.dialog-footer');

        // if (config.title !== undefined && typeof config.title === 'string') {
        //     tmpl += '<h4 class="dialog-title">'+ config.title +'</h4>';
        // }
    };

    Dialog.prototype._bindEvent = function () {
        // 
        var config = this.config;
        if (config.backdrop !== undefined) {
            if (config.backdrop === 'static') {

            } else if (config.backdrop === true) {

            } else {

            }
        }
    };


    Dialog.prototype.set = function (config) {
        this.config = $.extend({}, this.config, config);
        this._renderDialog();
        return this;
    };
    Dialog.prototype.show = function () {
        // 弹层为隐藏状态，显示弹层；已为显示状态，则不作处理
        if (!body.hasClass('dialog-open')) {

            // console.log(body)

            body.append(this.dialog);
            this.dialog.fadeIn();
            body.addClass('dialog-open');
        }
        return this;
    };
    Dialog.prototype.hide = function () {
        if (body.hasClass('dialog-open')) {
            this.dialog.fadeOut();
            body.removeClass('dialog-open');
        }
        return this;
    };
    

    JQ.dialog = function (config) {
        return new Dialog(config);
    };
    
})(window, jQuery, window["JQ"] || (window["JQ"] = {}));