;
(function ($, window, document, undefined) {

    'use strict';

    var old = $.fn.yzfPagination;

    // PROTOTYPE AND CONSTRUCTOR

    var YZFPagination = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.yzfPagination.defaults, options);
        this.init(this.options);
    };

    YZFPagination.prototype = {

        constructor: YZFPagination,

        init: function (options) {
            this.options = $.extend({}, this.options, options);
            this.currentPages = this.getPages_v_1_1(this.options.startPage);

            if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
                throw new Error('Start page option is incorrect');
            }

            if (this.options.totalPages <= 0) {
                throw new Error('Total pages option cannot be less 1 (one)!');
            }

            if (!$.isNumeric(this.options.visiblePages) && !this.options.visiblePages) {
                this.options.visiblePages = this.options.totalPages;
            }

            if (this.options.onPageClick instanceof Function) {
                this.$element.bind('page', this.options.onPageClick);
            }

            var tagName = (typeof this.$element.prop === 'function') ?
                this.$element.prop('tagName') : this.$element.attr('tagName');

            if (tagName === 'UL') {
                this.$listContainer = this.$element;
            } else {
                this.$listContainer = $('<ul></ul>');
            }

            this.$listContainer.addClass(this.options.paginationClass);

            this.$listContainer.append(this.buildListItems(this.currentPages.numeric));

            if (tagName !== 'UL') {
                this.$element.append(this.$listContainer);
            }

            this.show(this.options.startPage);
        },

        show: function (page) {
            if (page < 1 || page > this.options.totalPages) {
                throw new Error('Page is incorrect.');
            }
            this.render(this.getPages_v_1_1(page));

            this.setupEvents();

            this.$element.trigger('page', page);
        },

        buildListItems: function (pages) {
            var $listItems = $();

            if (this.options.first) {
                $listItems = $listItems.add(this.buildItem('first', 1));
            }

            if (this.options.prev) {
                $listItems = $listItems.add(this.buildItem('prev', 1));
            }

            for (var i = 0; i < pages.length; i++) {
                $listItems = $listItems.add(this.buildItem('page', pages[i]));
            }

            if (this.options.next) {
                $listItems = $listItems.add(this.buildItem('next', 2));
            }

            if (this.options.last) {
                $listItems = $listItems.add(this.buildItem('last', this.options.totalPages));
            }

            return $listItems;
        },

        buildItem: function (type, page) {
            var itemContainer = $('<li></li>'),
                itemContent = $('<a></a>'),
                itemText = null;

            itemContainer.addClass(type);
            itemContainer.attr('data-page', page);

            switch (type) {
                case 'page':
                    itemText = page;
                    break;
                case 'first':
                    itemText = this.options.first;
                    break;
                case 'prev':
                    itemText = this.options.prev;
                    break;
                case 'next':
                    itemText = this.options.next;
                    break;
                case 'last':
                    itemText = this.options.last;
                    break;
                default:
                    break;
            }

            itemContainer.append(itemContent.attr('href', this.href(page)).text(itemText));
            return itemContainer;
        },

        getPages_v_1_1: function (currentPage) {
            var pages = [];

            var half = Math.floor(this.options.visiblePages / 2);
            var start = currentPage - half + 1 - this.options.visiblePages % 2;
            var end = currentPage + half;

            // handle boundary case
            if (start <= 0) {
                start = 1;
                end = this.options.visiblePages;
            }
            if (end > this.options.totalPages) {
                start = this.options.totalPages - this.options.visiblePages + 1;
                end = this.options.totalPages;
            }

            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }

            return {"currentPage": currentPage, "numeric": pages};
        },

        render: function (pages) {
            if (!this.equals(this.currentPages.numeric, pages.numeric)) {
                this.$listContainer.children().remove();
                this.$listContainer.append(this.buildListItems(pages.numeric));
                this.currentPages = pages;
            }

            this.$listContainer.find('.page').removeClass('active');
            this.$listContainer.find('.page').filter('[data-page="' + pages.currentPage + '"]').addClass('active');

            this.$listContainer.find('.first')
                .toggleClass('disabled', pages.currentPage === 1);

            this.$listContainer.find('.last')
                .toggleClass('disabled', pages.currentPage === this.options.totalPages);

            var prev = pages.currentPage - 1;
            this.$listContainer.find('.prev')
                .toggleClass('disabled', pages.currentPage === 1)
                .data('page', prev > 1 ? prev : 1);

            var next = pages.currentPage + 1;
            this.$listContainer.find('.next')
                .toggleClass('disabled', pages.currentPage === this.options.totalPages)
                .data('page', next < this.options.totalPages ? next : this.options.totalPages);
        },

        setupEvents: function () {
            var base = this;
            this.$listContainer.find('li').each(function () {
                var $this = $(this);
                $this.off();
                if ($this.hasClass('disabled') || $this.hasClass('active')) return;
                $this.click(function () {
                    base.show(parseInt($this.data('page'), 10));
                });
            });
        },

        equals: function (oldArray, newArray) {
            var i = 0;
            while ((i < oldArray.length) || (i < newArray.length)) {
                if (oldArray[i] !== newArray[i]) {
                    return false;
                }
                i++;
            }
            return true;
        },

        href: function (c) {
            return this.options.href.replace(this.options.hrefVariable, c);
        }

    };

    // PLUGIN DEFINITION

    $.fn.yzfPagination = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $set = this.each(function () {
            var $this = $(this);
            var data = $this.data('twbs-pagination');
            var options = typeof option === 'object' && option;

            if (!data) $this.data('twbs-pagination', (data = new YZFPagination(this, options) ));
            if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);
        });

        return ( methodReturn === undefined ) ? $set : methodReturn;
    };

    $.fn.yzfPagination.defaults = {
        totalPages: 0,
        startPage: 1,
        visiblePages: 5,
        href: 'javascript:void(0);',
        hrefVariable: '{{number}}',
        first: '首页',
        prev: '上一页',
        next: '下一页',
        last: '尾页',
        paginationClass: 'pagination',
        onPageClick: null
    };

    $.fn.yzfPagination.Constructor = YZFPagination;

    $.fn.yzfPagination.noConflict = function () {
        $.fn.yzfPagination = old;
        return this;
    };

})(jQuery, window, document);