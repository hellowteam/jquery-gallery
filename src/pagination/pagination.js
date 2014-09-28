/**
 * 
 * @author: xiayanfei
 * @date: 2014-9-116
 * @example:
 * var pagi = new Pagination('#id', {
 *     currPage: 1,
 *     totalPage: 99,
 *     goToPage: true
 * });
 * pagi.onSwitch(function(page){
 *     console.log(page);
 * });
 *
 */

;(function (win, $, JQ) {

    "use strict";

    function Pagination(selector, config) {

        var elem;
        if (typeof selector === 'string') {
            elem = $(selector);
        } else if (typeof selector === 'object') {
            elem = selector;
        } else {
            throw new Error('Pagination Container Hooker ('+ selector +') not found!');
        }
        
        this.container = elem;
        this.config = $.extend({}, Pagination.prototype.config, config);

        this._init();
    }

    Pagination.prototype.config = {
        currPage: 1,
        totalPage: 0,
        goToPage: false
    };

    Pagination.prototype._init = function () {
        // 
        var container = this.container;
        var cfg = this.config;
        var pagiHTML = '';

        if (cfg.goToPage) {
            pagiHTML += '<div class="goto-page">';
            pagiHTML +=     '<form>Go to Page ';                    
            pagiHTML +=         '<input type="text" value="" maxlength="6" class="j-page form-control input-sm"> ';
            pagiHTML +=         '<button type="submit" class="btn btn-default btn-sm">Go</button>';
            pagiHTML +=     '</form>';
            pagiHTML += '</div>';
        }

        pagiHTML += '<ul class="pagination"></ul>';

        container.html(pagiHTML);
        this.pageContain = container.find('.pagination');

        // 渲染页码
        this._renderPages();

        // if (cfg.goToPage) {
        //     // 页面跳转
        //     this._goToPage();
        // }
    };

    Pagination.prototype._renderPages = function () {

        var container = this.container,
            inpPage = container.find('.j-page'),
            pageContain = this.pageContain;

        var cfg = this.config;
        var totalPage = cfg.totalPage,
            currPage = cfg.currPage;        

        var L_Start = 1,
            L_End = 2, //L_End = 2
            M_Start = currPage - 2,
            M_End = currPage + 2,
            R_Start = totalPage - 1, //totalPage - 1,
            R_End = totalPage;

        var pagiHTML = '';
        
        //当前第一页
        if (currPage === 1) {
            pagiHTML += '<li class="disabled"><a>&laquo;</a></li>';
        } else {
            pagiHTML += '<li data-page="'+ (currPage - 1) +'"><a>&laquo;</a></li>';
        }

        // 当前页<=第3页，页码从中开始，不显示两边的页码
        if (L_End >= M_Start) {
            L_Start = 0;
            L_End = 0;
            M_Start = 1;
        }
        // 当前页<=倒数第3页
        if (M_End >= R_Start) {
            R_Start = 0;
            R_End = 0;
            M_End = totalPage;
        }

        // 左边页码
        if (L_End > L_Start) {            
            for (var l = L_Start; l <= L_End; l++) {
                if (l === currPage) {
                    pagiHTML += '<li class="active" data-page="'+ l +'"><a>'+ l +'</a></li>';
                } else {
                    pagiHTML += '<li data-page="'+ l +'"><a>'+ l +'</a></li>';
                }
            }
        }

        if (M_Start > L_End + 1) {
            pagiHTML += '<li><span>...</span></li>';
        }

        for (var m = M_Start; m <= M_End; m++) {
            if (m === currPage) {
                pagiHTML += '<li class="active" data-page="'+ m +'"><a>'+ m +'</a></li>';
            } else {
                pagiHTML += '<li data-page="'+ m +'"><a>'+ m +'</a></li>';
            }
        }

        if (R_Start > M_End + 1) {
            pagiHTML += '<li><span>...</span></li>';
        }

        if (R_End > R_Start) {
            //显示右边页码
            for (var r = R_Start; r <= R_End; r++) {
                if(r == currPage){
                    pagiHTML += '<li class="active" data-page="'+ r +'"><a>'+ r +'</a></li>';
                } else {
                    pagiHTML += '<li data-page="'+ r +'"><a>'+ r +'</a></li>';
                }
            }
        }

        //当前最后一页
        if (currPage === totalPage) {
            pagiHTML += '<li class="disabled"><a>&raquo;</a></li>';
        } else {
            pagiHTML += '<li data-page="'+ (currPage + 1) +'"><a>&raquo;</a></li>';
        }

        // 装载页码
        pageContain.html(pagiHTML);
        // 显示当前页
        inpPage.val(currPage);
    };

    Pagination.prototype._goToPage = function (callback) {
        var self = this;
        var cfg = this.config;
        var container = this.container;

        var formGoTo = container.find('.goto-page form'),
            inpPage = formGoTo.find('.j-page');

        formGoTo.on('submit', function (e) {
            e.preventDefault();

            var page = $.trim( inpPage.val() );

            // 输入不合法
            if ( page.length < 1 || !/[0-9]/.test(page) ) {
                inpPage.focus();
                return;
            }

            // 输入页码转换为整型数值
            page = parseInt(page);

            if (page > cfg.totalPage) {
                page = cfg.totalPage;
            } else if (page <= 0) {
                page = 1;
            }

            cfg.currPage = page;
            self._renderPages();
            callback.call(this, page);

        });
    };

    Pagination.prototype.onSwitch = function (callback) {
        // 
        var self = this;
        var cfg = this.config;
        var container = this.container;
        
        // 绑定页面跳转
        if (cfg.goToPage) {
            // 页面跳转
            this._goToPage(callback);
        }

        // 先移除翻页事件
        container.off('click.bind.switch');

        // 绑定翻页事件
        container.on('click.bind.switch', 'li', function (e) {
            e.preventDefault();

            var page = $(this).attr('data-page');

            if (page) {
                page = parseInt(page);

                // 点击当前页码
                if (page === cfg.currPage) {
                    return;
                }

                cfg.currPage = page;
                self._renderPages();
                callback.call(this, page);
            }
        });
    };
    

    JQ.pagination = function (selector, config) {
        return new Pagination(selector, config);
    };
    
})(window, jQuery, window["JQ"] || (window["JQ"] = {}));