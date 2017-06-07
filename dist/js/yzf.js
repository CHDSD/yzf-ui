/*!
 * yzf-ui v1.0.0 (https://github.com/CHDSD/yzf-ui)
 * Copyright 2011-2017 sss
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('yzf-ui\'s JavaScript requires jQuery. jQuery must be included before yzf-ui\'s JavaScript.')
}

(function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('yzf-ui\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
})(jQuery);

(function () {

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * yzf-ui (v4.0.0-alpha.6): alert.js
 * Licensed under MIT (https://github.com/CHDSD/yzf-ui)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

    var NAME = 'alert';
    var DATA_KEY = 'yzf.alert';

    var Alert = function () {
        function Alert(element, config) {
            _classCallCheck(this, Alert);

            this._element = element;
            this._config = config || {};
        }

        _createClass(Alert, [{
            key: 'show',
            value: function show() {
                $(this._element).show();
            }
        }, {
            key: 'config',
            value: function config(_config2) {
                this._config = $.extend({}, this._config, _config2);
            }
        }, {
            key: 'hide',
            value: function hide() {
                $(this._element).hide();
            }
        }, {
            key: 'ok',
            value: function ok() {
                this.hide();
                this._config['succ'] && this._config['succ']();
            }
        }, {
            key: 'cancel',
            value: function cancel() {
                this.hide();
                this._config['fail'] && this._config['fail']();
            }
        }, {
            key: 'dispose',
            value: function dispose() {
                $.removeData(this._element, DATA_KEY);
                // this._element = null;
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                var args = Array.prototype.slice.call(arguments, 1);
                var returnValue;

                return this.each(function () {
                    var $element = $(this).hasClass("alert") ? $(this) : $(this).parents(".alert");
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new Alert($element[0], _config);
                        $element.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        returnValue = data[config].apply(data, args);
                    }

                    if (returnValue !== undefined) {
                        return returnValue;
                    } else {
                        return this;
                    }
                });
            }
        }, {
            key: '_dataApiClickHandler',
            value: function _dataApiClickHandler(e) {
                var target = e.target;
                var action = $(target).attr('data-action');
                if (action == 'close') {
                    Alert._jQueryInterface.call($(this), 'hide');
                } else if (action == 'show') {
                    Alert._jQueryInterface.call($(this), 'show');
                }
            }
        }]);

        return Alert;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on('click', '.alert .alert-close', function (e) {
        Alert._jQueryInterface.call($(this), 'hide');
    });

    $(document).on('click', '.alert .alert-ok', function (e) {
        Alert._jQueryInterface.call($(this), 'ok');
    });

    $(document).on('click', '.alert .alert-cancel', function (e) {
        $(this).alert('cancel');
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Alert._jQueryInterface;
    };
    return Alert;
}(jQuery);

var Calendar = function ($) {
    var NAME = 'calendar';
    var DATA_KEY = 'yzf.calendar';
    // 月份名映射
    var MONTH_MAP = {
        1: '一月',
        2: '二月',
        3: '三月',
        4: '四月',
        5: '五月',
        6: '六月',
        7: '七月',
        8: '八月',
        9: '九月',
        10: '十月',
        11: '十一月',
        12: '十二月'
    };
    var _ref = '',
        selTime = _ref.selTime,
        selTimeStr = _ref.selTimeStr,
        startTime = _ref.startTime,
        endTime = _ref.endTime;

    var curTime = new Date();
    var viewTime = new Date();
    var curView = 'month';
    var showItem = false;

    var Calendar = function () {
        function Calendar(element) {
            _classCallCheck(this, Calendar);

            this._element = element;
        }
        // 获取日历视图


        _createClass(Calendar, [{
            key: 'getView',
            value: function getView() {
                if (curView === 'month') {
                    return this.monthRender();
                } else if (curView === 'year') {
                    return this.yearRender();
                } else if (curView === 'decade') {
                    return this.decadeRender();
                }
            }
            //日历头部Dom元素

        }, {
            key: 'calendarRender',
            value: function calendarRender() {
                var items = this.getView();
                var parentsInfo = this.getParentsInfo();
                var show = showItem ? 'block' : 'none';
                showItem = true;
                var calendarHtml = '<div class="ipt-box">' + '<input type="text" readOnly={true}/>' + '</div>' + '<div class="item-box">' + '<div class="tools">' + '<span class="pre-view">' + '&lt;' + '</span>' + '<div class="parents-info">' + parentsInfo + '</div>' + '<span class="next-view">' + '&gt;' + '</span>' + '</div>' + items + '</div>';
                $(this._element).html(calendarHtml);
                $(this._element).children('.ipt-box').children('input').val(selTimeStr);
                $(this._element).children('.item-box').css('display', show);
            }
            //月视图组件，显示一个月中的天

        }, {
            key: 'monthRender',
            value: function monthRender() {
                var _getYmd = this.getYmd(viewTime),
                    y = _getYmd.y,
                    m = _getYmd.m,
                    d = _getYmd.d;

                var dayList = [];
                var selYmd = selTime && this.getYmd(selTime);
                var day = 1;
                var cls = '';
                var monthDay = new Date(y, m, day);
                // 当前月份的天
                while (monthDay.getMonth() === m) {
                    cls = 'day cur-month';
                    if (startTime && monthDay < startTime || endTime && monthDay > endTime) {
                        cls += ' disable';
                    }
                    if (monthDay > curTime) {
                        cls += ' post';
                    }
                    if (selYmd) {
                        if (day === selYmd.d && m === selYmd.m && y === selYmd.y) {
                            cls += ' cur';
                        }
                    }
                    dayList.push('<span class="' + cls + '">' + day + '</span>');
                    day += 1;
                    monthDay = new Date(y, m, day);
                }
                var lastDate = day - 1;
                // 设置灰色显示的上月的日期
                day = 1;
                cls = '';
                var firstDayOfMonth = new Date(y, m, 1).getDay();
                var preDays = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
                while (preDays > 0) {
                    preDays -= 1;
                    day -= 1;
                    monthDay = new Date(y, m, day);
                    cls = 'day pre-month';
                    if (startTime && monthDay < startTime || endTime && monthDay > endTime) {
                        cls += ' disable';
                    }
                    if (selTime) {
                        if (this.compareTime(monthDay, selTime, 'date')) {
                            cls += ' cur';
                        }
                    }
                    dayList.unshift('<span class="' + cls + '">' + monthDay.getDate() + '</span>');
                }
                // 设置灰色显示的下月的日期
                day = lastDate;
                cls = '';
                var lastDayOfMonth = new Date(y, m, day).getDay();
                var postDays = lastDayOfMonth === 6 ? 7 : 7 - lastDayOfMonth - 1;
                // 确保每个月显示6行天数
                if ((dayList.length + postDays) / 7 < 6) {
                    postDays += 7;
                }
                while (postDays > 0) {
                    postDays -= 1;
                    day += 1;
                    monthDay = new Date(y, m, day);
                    cls = 'day post-month';
                    if (startTime && monthDay < startTime || endTime && monthDay > endTime) {
                        cls += ' disable';
                    }
                    if (selTime) {
                        if (this.compareTime(monthDay, selTime, 'date')) {
                            cls += ' cur';
                        }
                    }
                    dayList.push('<span class="' + cls + '">' + monthDay.getDate() + '</span>');
                }
                var dayListHead = '<span class="day-name">日</span>' + '<span class="day-name">一</span>' + '<span class="day-name">二</span>' + '<span class="day-name">三</span>' + '<span class="day-name">四</span>' + '<span class="day-name">五</span>' + '<span class="day-name">六</span>';

                var daListbody = dayList.join('');
                var dayListHtml = '<div class="days">' + dayListHead + daListbody + '</div>';
                return dayListHtml;
            }
            // 获取年视图，显示月份

        }, {
            key: 'yearRender',
            value: function yearRender() {
                var _getYmd2 = this.getYmd(viewTime),
                    y = _getYmd2.y,
                    m = _getYmd2.m,
                    d = _getYmd2.d;

                var mList = [];

                // 开始，结束日期所在的月份，每个显示的月份如果不在开始，结束时间的月份范围内，都要加上disable。
                // 为了方便对比，生成时间时天都设置为每月第一天。
                startTime = startTime && new Date(startTime.getFullYear(), startTime.getMonth(), 1);
                endTime = endTime && new Date(endTime.getFullYear(), endTime.getMonth(), 1);
                var cls = void 0,
                    monthDay = void 0;
                for (var i = 1; i < 13; i++) {
                    monthDay = new Date(y, i - 1, 1);
                    cls = 'month';
                    if (startTime && monthDay < startTime || endTime && monthDay > endTime) {
                        cls += ' disable';
                    }
                    if (monthDay > curTime) {
                        cls += ' post-month';
                    }
                    if (selTime) {
                        if (this.compareTime(monthDay, selTime, 'month')) {
                            cls += ' cur';
                        }
                    }
                    mList.push('<span class="' + cls + '">' + MONTH_MAP[i] + '</span>');
                }
                var mListHtml = '<div class="months">' + mList.join('') + '</div>';
                return mListHtml;
            }
            // 获取十年期视图

        }, {
            key: 'decadeRender',
            value: function decadeRender() {
                var _getYmd3 = this.getYmd(viewTime),
                    y = _getYmd3.y,
                    m = _getYmd3.m,
                    d = _getYmd3.d;

                var yList = [];

                // 开始，结束日期所在的年份，每个显示的年份如果不在开始，结束时间的年份范围内，都要加上disable。
                // 为了方便对比，生成时间时天都设置为每年第一个月的第一天。
                startTime = startTime && new Date(startTime.getFullYear(), 0, 1);
                endTime = endTime && new Date(endTime.getFullYear(), 0, 1);

                var cls = '';
                var monthDay = void 0;
                y = y - y % 10 - 1;
                for (var i = 0; i < 12; i++) {
                    cls = 'year';
                    if (i == 0) {
                        cls += ' pre-year';
                    } else if (i == 11) {
                        cls += ' post-year';
                    } else if (new Date(y, 0, 1) > curTime) {
                        cls += ' post-year';
                    }
                    monthDay = new Date(y, 0, 1);
                    if (startTime && monthDay < startTime || endTime && monthDay > endTime) {
                        cls += ' disable';
                    }
                    if (selTime) {
                        if (this.compareTime(monthDay, selTime, 'year')) {
                            cls += ' cur';
                        }
                    }
                    yList.push('<span class="' + cls + '">' + y + '</span>');
                    y++;
                }
                var yListHtml = '<div class="years">' + yList.join('') + '</div>';
                return yListHtml;
            }
            // 上一个日历视图

        }, {
            key: 'preView',
            value: function preView() {
                var _getYmd4 = this.getYmd(viewTime),
                    y = _getYmd4.y,
                    m = _getYmd4.m,
                    d = _getYmd4.d;

                var nextTime = null;

                if (curView === 'month') {
                    nextTime = new Date(y, m - 1, 1);
                } else if (curView === 'year') {
                    nextTime = new Date(y - 1, 0, 1);
                } else if (curView === 'decade') {
                    nextTime = new Date(y - 10, 0, 1);
                }
                viewTime = nextTime;
                this.calendarRender();
            }

            // 下一个日历视图

        }, {
            key: 'nextView',
            value: function nextView() {
                var _getYmd5 = this.getYmd(viewTime),
                    y = _getYmd5.y,
                    m = _getYmd5.m,
                    d = _getYmd5.d;

                var nextTime = null;

                if (curView === 'month') {
                    nextTime = new Date(y, m + 1, 1);
                } else if (curView === 'year') {
                    nextTime = new Date(y + 1, 0, 1);
                } else if (curView === 'decade') {
                    nextTime = new Date(y + 10, 0, 1);
                }
                //nextTime && viewTime = nextTime});
                viewTime = nextTime ? nextTime : viewTime;
                this.calendarRender();
            }
            // 切换到父级的视图

        }, {
            key: 'parentView',
            value: function parentView() {
                var nextView = null;

                if (curView === 'month') {
                    nextView = 'year';
                } else if (curView === 'year') {
                    nextView = 'decade';
                }
                curView = nextView ? nextView : curView;
                this.calendarRender();
            }
            // 日被点击

        }, {
            key: 'dayClk',
            value: function dayClk(e) {
                if (e.target.className.match(/disable/)) {
                    return;
                }

                var _getYmd6 = this.getYmd(viewTime),
                    y = _getYmd6.y,
                    m = _getYmd6.m,
                    d = _getYmd6.d;

                var cls = e.target.className;
                d = e.target.innerHTML;
                if (cls.match(/pre-month/)) {
                    m -= 1;
                } else if (cls.match(/post-month/)) {
                    m += 1;
                }
                selTime = new Date(y, m, e.target.innerHTML);
                selTimeStr = this.timeToStr(selTime);
                //$(this._element).children('.ipt-box').children('input').val(selTimeStr);
                //viewTime = new Date(y, m, d);
                this.calendarRender();
            }

            // 月份被点击

        }, {
            key: 'monthClk',
            value: function monthClk(e) {
                if (e.target.className.match(/disable/)) {
                    return;
                }
                var month = e.target.innerHTML;
                for (var i = 1; i < 13; i++) {
                    if (MONTH_MAP[i] === month) {
                        month = i - 1;
                        break;
                    }
                }
                if (typeof month === 'number') {
                    var y = viewTime.getFullYear();
                    var m = viewTime.getMonth();
                    var d = viewTime.getDate();
                    viewTime = new Date(y, month, 1);
                    curView = 'month';
                }
                this.calendarRender();
            }

            // 年被点击

        }, {
            key: 'yearClk',
            value: function yearClk(e) {
                if (e.target.className.match(/disable/)) {
                    return;
                }

                var _getYmd7 = this.getYmd(viewTime),
                    y = _getYmd7.y,
                    m = _getYmd7.m,
                    d = _getYmd7.d;

                var year = e.target.innerHTML;

                viewTime = new Date(year, 0, 1);
                curView = 'year';
                this.calendarRender();
            }
            // 显示、隐藏日历框。如果将要显示日历框时，重置viewTime为当前选中时间selTime，或当前时间。

        }, {
            key: 'toggle',
            value: function toggle() {
                $(this._element).children('.item-box').toggle();
            }
        }, {
            key: 'getYmd',

            //获取时间对象的yyyy, mm, dd
            value: function getYmd(date) {
                if (!date) {
                    return {};
                }

                var y = date.getFullYear();
                var m = date.getMonth();
                var d = date.getDate();
                return { y: y, m: m, d: d };
            }
            // 获取当前视图父级信息的描述

        }, {
            key: 'getParentsInfo',
            value: function getParentsInfo() {
                var _getYmd8 = this.getYmd(viewTime),
                    y = _getYmd8.y,
                    m = _getYmd8.m,
                    d = _getYmd8.d;

                var info = '';

                if (curView === 'month') {
                    info = MONTH_MAP[m + 1] + y;
                } else if (curView === 'year') {
                    info = y;
                } else if (curView === 'decade') {
                    info = y - y % 10 + '-' + (y - y % 10 + 9);
                }
                return info;
            }
            //时间转换为字符串

        }, {
            key: 'timeToStr',
            value: function timeToStr(date) {
                var y = date.getFullYear();
                var m = date.getMonth();
                var d = date.getDate();

                m = (m + 101 + '').substring(1);
                d = (d + 100 + '').substring(1);
                return [y, m, d].join('-');
            }
            //对比两个时间对象是否相同

        }, {
            key: 'compareTime',
            value: function compareTime(dateA, dateB, level) {
                if (!level) {
                    return dateA.getTime() === dateB.getTime();
                }

                if (dateA.getFullYear() === dateB.getFullYear()) {
                    if (level === 'year') {
                        return true;
                    }
                    if (dateA.getMonth() === dateB.getMonth()) {
                        if (level === 'month') {
                            return true;
                        }
                        if (dateA.getDate() === dateB.getDate()) {
                            if (level === 'date') {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                var args = Array.prototype.slice.call(arguments, 1);
                var returnValue;

                return this.each(function () {
                    var $element = $(this).hasClass("calendar") ? $(this) : $(this).parents(".calendar");
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new Calendar($element[0], _config);
                        $element.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        returnValue = data[config].apply(data, args);
                    }

                    if (returnValue !== undefined) {
                        return returnValue;
                    } else {
                        return this;
                    }
                });
            }
        }]);

        return Calendar;
    }();

    // 阻止点击事件冒泡


    $(document).on('click', '.calendar', function (e) {
        e.stopPropagation();
    });

    //点击其他区域隐藏日历
    $(document).bind('click', function () {
        $('.calendar').children('.item-box').css('display', 'none');
    });

    $(document).on('click', '.calendar .pre-view', function (e) {
        Calendar._jQueryInterface.call($(this), 'preView');
    });

    $(document).on('click', '.calendar .next-view', function (e) {
        Calendar._jQueryInterface.call($(this), 'nextView');
    });

    $(document).on('click', '.calendar .parents-info', function (e) {
        Calendar._jQueryInterface.call($(this), 'parentView');
    });

    $(document).on('click', '.calendar .ipt-box', function (e) {
        Calendar._jQueryInterface.call($(this), 'toggle');
    });

    $(document).on('click', '.calendar .months', function (e) {
        Calendar._jQueryInterface.call($(this), 'monthClk', e);
    });

    $(document).on('click', '.calendar .years', function (e) {
        Calendar._jQueryInterface.call($(this), 'yearClk', e);
    });

    $(document).on('click', '.calendar .days', function (e) {
        Calendar._jQueryInterface.call($(this), 'dayClk', e);
    });

    $.fn[NAME] = Calendar._jQueryInterface;
    return Calendar;
}(jQuery);

var dropList = function ($) {
    var NAME = 'droplist';
    var DATA_KEY = 'yzf.droplist';

    var dropList = function () {
        function dropList(element, config) {
            _classCallCheck(this, dropList);

            console.log('element', element);
            this._element = element;
            this._config = config || {};
        }

        _createClass(dropList, [{
            key: 'toggle',
            value: function toggle() {
                $(this._element).children('.drop-option').toggle();
            }
        }, {
            key: 'hide',
            value: function hide() {
                $(this._element).children('.drop-option').hide();
            }
        }, {
            key: 'keydown',
            value: function keydown(e) {
                var txt = e.target.innerText;
                $(this._element).children(".drop-data").children("input").val(txt);
                this.hide();
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                var args = Array.prototype.slice.call(arguments, 1);
                var returnValue;

                return this.each(function () {
                    var $element = $(this).hasClass("drop-list") ? $(this) : $(this).parents(".drop-list");
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new dropList($element[0], _config);
                        $element.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        returnValue = data[config].apply(data, args);
                    }

                    if (returnValue !== undefined) {
                        return returnValue;
                    } else {
                        return this;
                    }
                });
            }
        }]);

        return dropList;
    }();

    $(document).on('click', '.drop-option li', function (e) {
        $(this).droplist('keydown', e);
    });

    $.fn[NAME] = dropList._jQueryInterface;
    return dropList;
}(jQuery);
/**
 * --------------------------------------------------------------------------
 * yzf-ui (v4.0.0-alpha.6): editBox.js
 * Licensed under MIT (https://github.com/CHDSD/yzf-ui)
 * --------------------------------------------------------------------------
 */

var EditBox = function ($) {

    var NAME = 'editBox';
    var DATA_KEY = 'yzf.editBox';

    var EditBox = function () {
        function EditBox(element, config) {
            _classCallCheck(this, EditBox);

            this._element = element;
            this._config = config || {};
        }

        _createClass(EditBox, [{
            key: 'show',
            value: function show() {
                $(this._element).show();
            }
        }, {
            key: 'config',
            value: function config(_config3) {
                this._config = $.extend({}, this._config, _config3);
            }
        }, {
            key: 'hide',
            value: function hide() {
                $(this._element).hide();
            }
        }, {
            key: 'ok',
            value: function ok() {
                this.hide();
                this._config['confirm'] && this._config['confirm'](this._element);
            }
        }, {
            key: 'cancel',
            value: function cancel() {
                this.hide();
                this._config['cancel'] && this._config['cancel'](this._element);
            }
        }, {
            key: 'dispose',
            value: function dispose() {
                $.removeData(this._element, DATA_KEY);
                // this._element = null;
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                var args = Array.prototype.slice.call(arguments, 1);
                var returnValue;

                return this.each(function () {
                    var $element = $(this).hasClass("edit-box") ? $(this) : $(this).parents(".edit-box");
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new EditBox($element[0], _config);
                        $element.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        returnValue = data[config].apply(data, args);
                    }

                    if (returnValue !== undefined) {
                        return returnValue;
                    } else {
                        return this;
                    }
                });
            }
        }, {
            key: '_dataApiClickHandler',
            value: function _dataApiClickHandler(e) {
                var target = e.target;
                var action = $(target).attr('data-action');
                if (action == 'close') {
                    EditBox._jQueryInterface.call($(this), 'hide');
                } else if (action == 'show') {
                    EditBox._jQueryInterface.call($(this), 'show');
                }
            }
        }]);

        return EditBox;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document).on('click', '.edit-box .edit-box-close', function (e) {
        EditBox._jQueryInterface.call($(this), 'hide');
    });

    $(document).on('click', '.edit-box .edit-box-ok', function (e) {
        EditBox._jQueryInterface.call($(this), 'ok');
    });

    $(document).on('click', '.edit-box .edit-box-cancel', function (e) {
        $(this).editBox('cancel');
    });

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = EditBox._jQueryInterface;
    $.fn[NAME].Constructor = EditBox;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return EditBox._jQueryInterface;
    };

    return EditBox;
}(jQuery);

var Panel = function ($) {
    var NAME = 'panel';
    var DATA_KEY = 'yzf.panel';

    var Panel = function () {
        function Panel(element, config) {
            _classCallCheck(this, Panel);

            this._element = element;
            this._config = config || {};
        }

        _createClass(Panel, [{
            key: 'toggle',
            value: function toggle() {
                $(".panel").slideToggle();
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                var args = Array.prototype.slice.call(arguments, 1);
                var returnValue;

                return this.each(function () {
                    var $element = $(this).hasClass("panel") ? $(this) : $(this).parents(".panel");
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new Panel($element[0], _config);
                        $element.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        returnValue = data[config].apply(data, args);
                    }

                    if (returnValue !== undefined) {
                        return returnValue;
                    } else {
                        return this;
                    }
                });
            }
        }]);

        return Panel;
    }();

    $.fn[NAME] = Panel._jQueryInterface;
    return Panel;
}(jQuery);
var Util = function ($) {
    var transition = false;

    var TransitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
    };

    function getSpecialTransitionEndEvent() {
        return {
            bindType: transition.end,
            delegateType: transition.end,
            handle: function handle(event) {
                if ($(event.target).is(this)) {
                    return event.handleObj.handler.apply(this, arguments);
                }
                return undefined;
            }
        };
    }

    function transitionEndTest() {
        //if (window.QUnit) {
        //    return false;
        //}

        var el = document.createElement('mm');

        for (var name in TransitionEndEvent) {
            if (el.style[name] !== undefined) {
                return {
                    end: TransitionEndEvent[name]
                };
            }
        }

        return false;
    }

    function transitionEndEmulator(duration) {
        var _this2 = this;

        var called = false;

        $(this).one(Util.TRANSITION_END, function () {
            called = true;
        });

        setTimeout(function () {
            if (!called) {
                Util.triggerTransitionEnd(_this2);
            }
        }, duration);

        return this;
    }

    function setTransitionEndSupport() {
        transition = transitionEndTest();
        $.fn.emulateTransitionEnd = transitionEndEmulator;

        if (Util.supportsTransitionEnd()) {
            $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
        }
    }

    var Util = {
        TRANSITION_END: 'mmTransitionEnd',

        triggerTransitionEnd: function triggerTransitionEnd(element) {
            $(element).trigger(transition.end);
        },
        supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(transition);
        }
    };

    setTransitionEndSupport();

    return Util;
}(jQuery);

var Menu = function ($) {

    var NAME = 'menu';
    var DATA_KEY = 'yzf.menu';
    var EVENT_KEY = '.' + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var TRANSITION_DURATION = 350;

    var Default = {
        toggle: true,
        preventDefault: true,
        activeClass: 'active',
        collapseClass: 'collapse',
        collapseInClass: 'in',
        collapsingClass: 'collapsing',
        triggerElement: 'a',
        parentTrigger: 'li',
        subMenu: 'ul'
    };

    var Event = {
        SHOW: 'show' + EVENT_KEY,
        SHOWN: 'shown' + EVENT_KEY,
        HIDE: 'hide' + EVENT_KEY,
        HIDDEN: 'hidden' + EVENT_KEY,
        CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
    };

    var Menu = function () {
        function Menu(element, config) {
            _classCallCheck(this, Menu);

            this._element = element;
            this._config = this._getConfig(config);
            this._transitioning = null;

            this.init();
        }

        _createClass(Menu, [{
            key: 'init',
            value: function init() {
                var self = this;
                $(this._element).find(this._config.parentTrigger + '.' + this._config.activeClass).has(this._config.subMenu).children(this._config.subMenu).attr('aria-expanded', true).addClass(this._config.collapseClass + ' ' + this._config.collapseInClass);

                $(this._element).find(this._config.parentTrigger).not('.' + this._config.activeClass).has(this._config.subMenu).children(this._config.subMenu).attr('aria-expanded', false).addClass(this._config.collapseClass);

                $(this._element).find(this._config.parentTrigger).has(this._config.subMenu).children(this._config.triggerElement).on(Event.CLICK_DATA_API, function (e) {
                    var _this = $(this);
                    var _parent = _this.parent(self._config.parentTrigger);
                    var _siblings = _parent.siblings(self._config.parentTrigger).children(self._config.triggerElement);
                    var _list = _parent.children(self._config.subMenu);
                    if (self._config.preventDefault) {
                        e.preventDefault();
                    }
                    if (_this.attr('aria-disabled') === 'true') {
                        return;
                    }
                    if (_parent.hasClass(self._config.activeClass)) {
                        _this.attr('aria-expanded', false);
                        self._hide(_list);
                    } else {
                        self._show(_list);
                        _this.attr('aria-expanded', true);
                        if (self._config.toggle) {
                            _siblings.attr('aria-expanded', false);
                        }
                    }

                    //if (self._config.onTransitionStart) {
                    //    self._config.onTransitionStart(e);
                    //}
                });
            }
        }, {
            key: '_show',
            value: function _show(element) {
                if (this._transitioning || $(element).hasClass(this._config.collapsingClass)) {
                    return;
                }
                var _this = this;
                var _el = $(element);

                var startEvent = $.Event(Event.SHOW);
                _el.trigger(startEvent);

                if (startEvent.isDefaultPrevented()) {
                    return;
                }

                _el.parent(this._config.parentTrigger).addClass(this._config.activeClass);

                if (this._config.toggle) {
                    this._hide(_el.parent(this._config.parentTrigger).siblings().children(this._config.subMenu + '.' + this._config.collapseInClass).attr('aria-expanded', false));
                }

                _el.removeClass(this._config.collapseClass).addClass(this._config.collapsingClass).height(0);

                this.setTransitioning(true);

                var complete = function complete() {

                    _el.removeClass(_this._config.collapsingClass).addClass(_this._config.collapseClass + ' ' + _this._config.collapseInClass).height('').attr('aria-expanded', true);

                    _this.setTransitioning(false);

                    _el.trigger(Event.SHOWN);
                };

                if (!Util.supportsTransitionEnd()) {
                    complete();
                    return;
                }

                _el.height(_el[0].scrollHeight).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
            }
        }, {
            key: '_hide',
            value: function _hide(element) {

                if (this._transitioning || !$(element).hasClass(this._config.collapseInClass)) {
                    return;
                }
                var _this = this;
                var _el = $(element);

                var startEvent = $.Event(Event.HIDE);
                _el.trigger(startEvent);

                if (startEvent.isDefaultPrevented()) {
                    return;
                }

                _el.parent(this._config.parentTrigger).removeClass(this._config.activeClass);
                _el.height(_el.height())[0].offsetHeight;

                _el.addClass(this._config.collapsingClass).removeClass(this._config.collapseClass).removeClass(this._config.collapseInClass);

                this.setTransitioning(true);

                var complete = function complete() {
                    if (_this._transitioning && _this._config.onTransitionEnd) {
                        _this._config.onTransitionEnd();
                    }

                    _this.setTransitioning(false);
                    _el.trigger(Event.HIDDEN);

                    _el.removeClass(_this._config.collapsingClass).addClass(_this._config.collapseClass).attr('aria-expanded', false);
                };

                if (!Util.supportsTransitionEnd()) {
                    complete();
                    return;
                }

                _el.height() == 0 || _el.css('display') == 'none' ? complete() : _el.height(0).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
            }
        }, {
            key: 'setTransitioning',
            value: function setTransitioning(isTransitioning) {
                this._transitioning = isTransitioning;
            }
        }, {
            key: 'dispose',
            value: function dispose() {
                $.removeData(this._element, DATA_KEY);

                $(this._element).find(this._config.parentTrigger).has(this._config.subMenu).children(this._config.triggerElement).off('click');

                this._transitioning = null;
                this._config = null;
                this._element = null;
            }
        }, {
            key: '_getConfig',
            value: function _getConfig(config) {
                config = $.extend({}, Default, config);
                return config;
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                return this.each(function () {
                    var $this = $(this);
                    var data = $this.data(DATA_KEY);
                    var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

                    if (!data && /dispose/.test(config)) {
                        this.dispose();
                    }

                    if (!data) {
                        data = new Menu(this, _config);
                        $this.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        data[config]();
                    }
                });
            }
        }]);

        return Menu;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Menu._jQueryInterface;
    $.fn[NAME].Constructor = Menu;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Menu._jQueryInterface;
    };
    return Menu;
}(jQuery);

var Modal = function ($) {

    var NAME = 'modal';
    var DATA_KEY = 'yzf.modal';

    var Modal = function () {
        function Modal(element, config) {
            _classCallCheck(this, Modal);

            console.log('element', element, 'config', config);
            this._element = element;
            this._config = config || {};
        }

        _createClass(Modal, [{
            key: 'show',
            value: function show() {
                $(this._element).show();
            }
        }, {
            key: 'config',
            value: function config(_config4) {
                this._config = $.extend({}, this._config, _config4);
            }
        }, {
            key: 'hide',
            value: function hide() {
                $(this._element).hide();
            }
        }, {
            key: 'ok',
            value: function ok() {
                this.hide();
                this._config['confirm'] && this._config['confirm'](this._element);
            }
        }, {
            key: 'cancel',
            value: function cancel() {
                this.hide();
                this._config['cancel'] && this._config['cancel'](this._element);
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                var args = Array.prototype.slice.call(arguments, 1);
                var returnValue;

                return this.each(function () {
                    var $element = $(this).hasClass("modal") ? $(this) : $(this).parents(".modal");
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new Modal($element[0], _config);
                        $element.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        returnValue = data[config].apply(data, args);
                    }

                    if (returnValue !== undefined) {
                        return returnValue;
                    } else {
                        return this;
                    }
                });
            }
        }, {
            key: '_dataApiClickHandler',
            value: function _dataApiClickHandler(e) {
                var target = e.target;
                var action = $(target).attr('data-action');
                if (action == 'close') {
                    Modal._jQueryInterface.call($(this), 'hide');
                } else if (action == 'show') {
                    Modal._jQueryInterface.call($(this), 'show');
                }
            }
        }]);

        return Modal;
    }();

    $(document).on('click', '.modal .modal-close', function (e) {
        Modal._jQueryInterface.call($(this), 'hide');
    });

    $(document).on('click', '.modal .modal-ok', function (e) {
        Modal._jQueryInterface.call($(this), 'ok');
    });

    $(document).on('click', '.modal .modal-cancel', function (e) {
        Modal._jQueryInterface.call($(this), 'cancel');
    });

    $.fn[NAME] = Modal._jQueryInterface;
    return Modal;
}(jQuery);

var Nava = function ($) {
    var NAME = 'nava';
    var DATA_KEY = 'yzf.nava';

    var Nava = function () {
        function Nava(element, config) {
            _classCallCheck(this, Nava);

            this._element = element;
            this._config = config || {};
        }

        _createClass(Nava, [{
            key: 'toggle',
            value: function toggle() {
                $(".nava").removeClass("ac");
                $(this._element).addClass("ac");
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                var args = Array.prototype.slice.call(arguments, 1);
                var returnValue;

                return this.each(function () {
                    var $element = $(this).hasClass("nava") ? $(this) : $(this).parents(".nava");
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new Nava($element[0], _config);
                        $element.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        returnValue = data[config].apply(data, args);
                    }

                    if (returnValue !== undefined) {
                        return returnValue;
                    } else {
                        return this;
                    }
                });
            }
        }]);

        return Nava;
    }();

    $.fn[NAME] = Nava._jQueryInterface;
    return Nava;
}(jQuery);

var Navbara = function ($) {
    var NAME = 'navbara';
    var DATA_KEY = 'yzf.navbara';

    var Navbara = function () {
        function Navbara(element, config) {
            _classCallCheck(this, Navbara);

            this._element = element;
            this._config = config || {};
        }

        _createClass(Navbara, [{
            key: 'toggle',
            value: function toggle() {
                $(".navbara").removeClass("ac");
                $(this._element).addClass("ac");
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                var args = Array.prototype.slice.call(arguments, 1);
                var returnValue;

                return this.each(function () {
                    var $element = $(this).hasClass("navbara") ? $(this) : $(this).parents(".navbara");
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new Navbara($element[0], _config);
                        $element.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        returnValue = data[config].apply(data, args);
                    }

                    if (returnValue !== undefined) {
                        return returnValue;
                    } else {
                        return this;
                    }
                });
            }
        }]);

        return Navbara;
    }();

    $.fn[NAME] = Navbara._jQueryInterface;
    return Navbara;
}(jQuery);
//分页插件
;(function ($) {

    function Page(container, fn, args, style) {
        //存参数
        var container = this.container = container || null;
        if (this.container.constructor != jQuery) {
            throw 'page插件第一个参数错误，请录入jQuery对象';
        }
        this.fn = fn || function () {};
        if (typeof this.fn != "function") {
            throw 'page插件第二个参数错误，请录入函数类型对象';
        }
        //存 args里的属性
        var args = this.args = $.extend({
            pageCount: 10, //总页码,默认10
            current: 1, //当前页码,默认1
            showPrev: true, //是否显示上一页按钮
            showNext: true, //是否显示下一页按钮
            showTurn: true, //是否显示跳转,默认显示
            showSumNum: true, //是否显示总页码
            showNear: 2, //显示当前页码前多少页和后多少页，默认2
            pageSwap: true, //是否同意调剂,默认是。调剂会最大数量显示页码。例如当前页码之前无页码可以显示。则会增加之后的页码。
            align: 'right' //对齐方式。默认右对齐.可选：left,right
        }, args || {});

        var width = this.width = parseInt(this.container.css('width')) || parseInt(this.container.parent().css('width'));
        var height = this.height = 20; //parseInt(this.obj.css('height'));

        var style = this.style = $.extend({
            "fontSize": 12, //字体大小
            "width": width, //页码盒子总宽度
            "height": height, //页码总高度，默认20px
            "pagesMargin": 2, //每个页码或按钮之间的间隔
            "paddL": 0, //左边留白
            "paddR": 0, //右边留白
            "prevNextWidth": 48, //上页下页的宽度
            "pagecountWidth": 48, //共计多少页的宽度
            "trunWidth": 110 //跳转模块宽度
        }, style || {});

        if (!style.pageWidth) style.pageWidth = function () {
            var sumWidth = style.width - (style.prevNextWidth + 2 + style.pagesMargin) * (Number(args.showPrev) + Number(args.showNext)) - (style.pagecountWidth + style.pagesMargin) * Number(args.showSumNum) - (style.trunWidth + style.pagesMargin) * Number(args.showTurn);
            var sumLength = args.showNear * 2 + 5;
            return parseInt(sumWidth / sumLength) - style.pagesMargin;
        }(); //每个页码的宽度。默认按最大摆放量计算

        //设置容器样式
        this.container.css({ 'pading-left': style.paddL + 'px', 'pading-right': style.paddR + 'px', 'content': '', 'display': 'block', 'clear': 'both' });
        //建立自己的容器
        this.container.html('<div></div>');
        this.obj = this.container.children();
        this.obj.css({ 'content': '', 'display': 'block', 'clear': 'both' });
        //初始化
        this.init();
    }

    Page.prototype.init = function () {
        this.fillHtml();
        this.bindEvent();
    };

    //填充DOM
    Page.prototype.fillHtml = function () {
        var args = this.args;
        var obj = this.obj;
        if (args.current > args.pageCount || args.current < 1) return;
        obj.empty();

        //上一页
        if (args.showPrev) {
            if (args.current > 1) {
                obj.append('<a href="javascript:;" class="prevPage"><上一页</a>');
            } else {
                obj.remove('.prevPage');
                obj.append('<span class="disabled"><上一页</span>');
            }
        }
        //中间页码
        if (args.current != 1) {
            obj.append('<a href="javascript:;" class="tcdNumber">' + 1 + '</a>');
        } else {
            obj.append('<span class="current">' + 1 + '</span>');
        }

        if (args.current > args.showNear + 2) {
            obj.append('<span class="hiding">...</span>');
        }

        var start = args.current > args.showNear + 2 ? args.current - args.showNear : 2,
            end = args.current + args.showNear >= args.pageCount ? args.pageCount - 1 : args.current + args.showNear;

        if (args.pageSwap) {
            var dstart = args.current - args.showNear - 2;
            var dend = args.pageCount - 1 - args.current - args.showNear;
            if (dstart < 1 && dend > 1) {
                end += Math.min(dend, Math.abs(dstart - 1));
            } else if (dstart > 1 && dend < 1) {
                start -= Math.min(dstart, Math.abs(dend - 1));
            }
        }

        for (; start <= end; start++) {
            if (start != args.current) {
                obj.append('<a href="javascript:;" class="tcdNumber">' + start + '</a>');
            } else {
                obj.append('<span class="current">' + start + '</span>');
            }
        }

        if (args.current + 1 + args.showNear < args.pageCount) {
            obj.append('<span class="hiding">...</span>');
        }

        if (args.current != args.pageCount && args.pageCount != 1) {
            obj.append('<a href="javascript:;" class="tcdNumber">' + args.pageCount + '</a>');
        } else if (args.current == args.pageCount && args.pageCount != 1) {
            obj.append('<span class="current">' + args.pageCount + '</span>');
        }
        //下一页
        if (args.showNext) {
            if (args.current == args.pageCount || args.pageCount == 1) {
                obj.remove('.nextPage');
                obj.append('<span class="disabled">下一页></span>');
            } else {
                obj.append('<a href="javascript:;" class="nextPage">下一页></a>');
            }
        }

        if (args.showSumNum) {
            obj.append('<span class="pagecount">共' + args.pageCount + '页</span>');
        }
        //跳转页码
        if (args.showTurn) {
            obj.append('<span class="countYe">到第<input type="text" maxlength=' + args.pageCount.toString().length + '>页<a href="javascript:;" class="turndown">确定</a></span>');
        }
        this.setStyle();
        this.fn && this.fn(args.current);
    };
    //添加样式
    Page.prototype.setStyle = function () {};

    //绑定事件
    Page.prototype.bindEvent = function () {
        var obj = this.obj;
        var _this = this;

        obj.off("click");
        obj.on("click", "a.tcdNumber", function () {
            _this.args.current = parseInt($(this).text());
            _this.fillHtml();
        });
        //上一页
        obj.on("click", "a.prevPage", function () {
            _this.args.current = parseInt(obj.children("span.current").text()) - 1;
            _this.fillHtml();
        });
        //下一页
        obj.on("click", "a.nextPage", function () {
            _this.args.current = parseInt(obj.children("span.current").text()) + 1;
            _this.fillHtml();
        });
        //跳转
        obj.on("click", "a.turndown", function () {
            var page = _this.args.current = Number(obj.children("span.countYe").children('input').val());
            if (page > _this.args.pageCount) {
                alert("页码输入有误，请重新输入！");
                return;
            }
            _this.fillHtml();
        });
    };

    //绑定成jQuery插件
    $.fn.createPage = function (fn, args, style) {
        var _this = this;
        new Page(_this, fn, args, style);
        return this;
    };
})(jQuery);

/**
 * Created by xiening on 2017/5/19.
 */

var Tabs = function ($) {
    var NAME = 'tabs';
    var DATA_KEY = 'yzf.tabs';
    var TRANSITION_DURATION = 150;

    var Tabs = function () {
        function Tabs(element) {
            _classCallCheck(this, Tabs);

            this._element = element;
        }

        _createClass(Tabs, [{
            key: 'show',
            value: function show() {
                var $this = $(this._element);
                var $ul = $this.closest('ul:not(.dropdown-menu)');
                var selector = $this.data('target');

                if (!selector) {
                    selector = $this.attr('href');
                    selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
                }

                if ($this.parent('li').hasClass('active')) return;

                var $previous = $ul.find('.active:last a');
                var hideEvent = $.Event('hide.bs.tab', {
                    relatedTarget: $this[0]
                });
                var showEvent = $.Event('show.bs.tab', {
                    relatedTarget: $previous[0]
                });

                $previous.trigger(hideEvent);
                $this.trigger(showEvent);

                if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;

                var $target = $(selector);

                this.activate($this.closest('li'), $ul);
                this.activate($target, $target.parent(), function () {
                    $previous.trigger({
                        type: 'hidden.bs.tab',
                        relatedTarget: $this[0]
                    });
                    $this.trigger({
                        type: 'shown.bs.tab',
                        relatedTarget: $previous[0]
                    });
                });
            }
        }, {
            key: 'activate',
            value: function activate(element, container, callback) {
                var $active = container.find('> .active');
                var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

                function next() {
                    $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);

                    element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

                    if (transition) {
                        element[0].offsetWidth;
                        element.addClass('in');
                    } else {
                        element.removeClass('fade');
                    }

                    if (element.parent('.dropdown-menu').length) {
                        element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
                    }

                    callback && callback();
                }

                $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(TRANSITION_DURATION) : next();

                $active.removeClass('in');
            }
        }, {
            key: 'dispose',
            value: function dispose() {
                $.removeData(this._element, DATA_KEY);
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(option) {
                return this.each(function () {
                    var $element = $(this);
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        $element.data(DATA_KEY, data = new Tabs($element[0]));
                    }
                    if (typeof option == 'string') {
                        data[option]();
                    }
                });
            }
        }, {
            key: '_dataApiClickHandler',
            value: function _dataApiClickHandler(e) {
                e.preventDefault();

                var target = e.target;
                var action = $(target).attr('data-toggle');
                if (action == 'tab') {
                    Tabs._jQueryInterface.call($(this), 'show');
                }
            }
        }]);

        return Tabs;
    }();

    $(document).on('click.yzf.tabs.data-api', '[data-toggle="tab"]', function (e) {
        Tabs._jQueryInterface.call($(this), 'show');
    });

    $.fn[NAME] = Tabs._jQueryInterface;
    $.fn[NAME].Constructor = Tabs;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Tabs._jQueryInterface;
    };
    return Tabs;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * yzf-ui (v4.0.0-alpha.6): tooltip.js
 * Licensed under MIT (https://github.com/CHDSD/yzf-ui)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

    var NAME = 'tooltip';
    var DATA_KEY = 'yzf.tooltip';

    var AttachmentMap = {
        TOP: 'top',
        RIGHT: 'right',
        BOTTOM: 'bottom',
        LEFT: 'left'
    };

    var Tooltip = function () {
        function Tooltip(element, config) {
            _classCallCheck(this, Tooltip);

            this._element = element;
            this._config = config || {};
            this._tip = null;

            this._setListeners();
        }

        _createClass(Tooltip, [{
            key: '_setListeners',
            value: function _setListeners() {
                var _this = this;
                $(this._element).on('mouseenter', function (e) {
                    console.log('show tip');
                    _this._enter(e);
                });
                $(this._element).on('mouseleave', function (e) {
                    console.log('hide tip');
                    _this._leave(e);
                });
            }
        }, {
            key: '_enter',
            value: function _enter(e) {
                var $el = $(this._element);
                var text = $el.attr('data-original-title');
                var place = $el.attr('data-placement');
                place = place ? AttachmentMap[place.toUpperCase()] : '';
                place = place ? place : this._calcPlace(text);

                this._show(text, place);
            }
        }, {
            key: '_leave',
            value: function _leave(e) {
                this._tip && this._tip.remove();
            }
        }, {
            key: '_show',
            value: function _show(text, place) {
                this._updateTip(text, place);
            }
        }, {
            key: '_updateTip',
            value: function _updateTip(text, place) {
                var htmlStr = '<div class="tooltip-box ' + place + '"></div>';
                this._tip = $(htmlStr);
                htmlStr = '<p class="tooltip-text">' + text + '</p>' + '<span class="tooltip-arrow ' + place + '"></span>';
                this._tip.html(htmlStr);
                this._tip.css(this._getStyle(place));
                $(document.body).append(this._tip);
            }
        }, {
            key: '_getStyle',
            value: function _getStyle(place) {
                var $el = $(this._element);
                var offset = $el.offset();
                var cw = $el.outerWidth();
                var ch = $el.outerHeight();
                var top = void 0,
                    left = void 0;
                offset.top = offset.top - $(document).scrollTop();
                offset.left = offset.left - $(document).scrollLeft();
                top = offset.top + ch / 2;
                left = offset.left + cw / 2;

                switch (place) {
                    case 'top':
                        top -= ch / 2 + 10;
                        break;
                    case 'left':
                        left -= cw / 2 + 10;
                        break;
                    case 'right':
                        left += cw / 2 + 10;
                        break;
                    case 'bottom':
                        top += ch / 2 + 10;
                        break;
                    default:
                        break;
                }
                console.log(offset, top, left);
                return {
                    top: top + 'px',
                    left: left + 'px'
                };
            }
        }, {
            key: '_calcPlace',
            value: function _calcPlace() {
                var $el = $(this._element);
                var offset = $el.offset();
                var wh = $(window).height();
                var ww = $(window).width();
                var posV = void 0,
                    posH = void 0;
                offset.top = offset.top - $(document).scrollTop();
                offset.left = offset.left - $(document).scrollLeft();
                if (offset.top < wh / 2) {
                    posV = 'bottom';
                } else {
                    posV = 'top';
                }
                if (offset.left < 100) {
                    posH = 'right';
                } else if (offset.left + 100 > ww) {
                    posH = 'left';
                }
                return posH || posV;
            }
        }, {
            key: 'dispose',
            value: function dispose() {
                $.removeData(this._element, DATA_KEY);
                // this._element = null;
            }
        }], [{
            key: '_jQueryInterface',
            value: function _jQueryInterface(config) {
                var args = Array.prototype.slice.call(arguments, 1);
                var returnValue;

                return this.each(function () {
                    var $element = $(this).attr("data-toggle") == 'tooltip' ? $(this) : $(this).parents('[data-toggle="tooltip"]');
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new Tooltip($element[0], _config);
                        $element.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        returnValue = data[config].apply(data, args);
                    }

                    if (returnValue !== undefined) {
                        return returnValue;
                    } else {
                        return this;
                    }
                });
            }
        }, {
            key: '_dataApiClickHandler',
            value: function _dataApiClickHandler(e) {
                var target = e.target;
                var action = $(target).attr('data-action');
                if (action == 'close') {
                    Alert._jQueryInterface.call($(this), 'hide');
                } else if (action == 'show') {
                    Alert._jQueryInterface.call($(this), 'show');
                }
            }
        }]);

        return Tooltip;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // $(document).on(
    //   'mouseover',
    //   '[data-toggle="tooltip"]',
    //   function (e) {
    //     Tooltip._jQueryInterface.call($(this), 'show');
    //   }
    // );


    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[NAME] = Tooltip._jQueryInterface;
    $.fn[NAME].Constructor = Tooltip;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Tooltip._jQueryInterface;
    };

    return Tooltip;
}(jQuery);
/**
 * Created by xiening on 2017/5/22.
 */

;(function ($, window, document, undefined) {

    'use strict';

    var pluginName = 'treeview';

    var _default = {};

    _default.settings = {
        injectStyle: true,
        levels: 2,
        expandIcon: 'glyphicon glyphicon-plus',
        collapseIcon: 'glyphicon glyphicon-minus',
        emptyIcon: 'glyphicon',
        nodeIcon: '',
        selectedIcon: '',
        checkedIcon: 'glyphicon glyphicon-check',
        uncheckedIcon: 'glyphicon glyphicon-unchecked',

        color: undefined, // '#000000',
        backColor: undefined, // '#FFFFFF',
        borderColor: undefined, // '#dddddd',
        onhoverColor: '#F5F5F5',
        selectedColor: '#FFFFFF',
        selectedBackColor: '#428bca',
        searchResultColor: '#D9534F',
        searchResultBackColor: undefined, //'#FFFFFF',

        enableLinks: false,
        highlightSelected: true,
        highlightSearchResults: true,
        showBorder: true,
        showIcon: true,
        showCheckbox: false,
        showTags: false,
        multiSelect: false,

        // Event handlers
        onNodeChecked: undefined,
        onNodeCollapsed: undefined,
        onNodeDisabled: undefined,
        onNodeEnabled: undefined,
        onNodeExpanded: undefined,
        onNodeSelected: undefined,
        onNodeUnchecked: undefined,
        onNodeUnselected: undefined,
        onSearchComplete: undefined,
        onSearchCleared: undefined
    };

    _default.options = {
        silent: false,
        ignoreChildren: false
    };

    _default.searchOptions = {
        ignoreCase: true,
        exactMatch: false,
        revealResults: true
    };

    var Tree = function Tree(element, options) {

        this.$element = $(element);
        this.elementId = element.id;
        this.styleId = this.elementId + '-style';

        this.init(options);

        return {
            // Options (public access)
            options: this.options,

            // Initialize / destroy methods
            init: $.proxy(this.init, this),
            remove: $.proxy(this.remove, this),

            // Get methods
            getNode: $.proxy(this.getNode, this),
            getParent: $.proxy(this.getParent, this),
            getSiblings: $.proxy(this.getSiblings, this),
            getSelected: $.proxy(this.getSelected, this),
            getUnselected: $.proxy(this.getUnselected, this),
            getExpanded: $.proxy(this.getExpanded, this),
            getCollapsed: $.proxy(this.getCollapsed, this),
            getChecked: $.proxy(this.getChecked, this),
            getUnchecked: $.proxy(this.getUnchecked, this),
            getDisabled: $.proxy(this.getDisabled, this),
            getEnabled: $.proxy(this.getEnabled, this),

            // Select methods
            selectNode: $.proxy(this.selectNode, this),
            unselectNode: $.proxy(this.unselectNode, this),
            toggleNodeSelected: $.proxy(this.toggleNodeSelected, this),

            // Expand / collapse methods
            collapseAll: $.proxy(this.collapseAll, this),
            collapseNode: $.proxy(this.collapseNode, this),
            expandAll: $.proxy(this.expandAll, this),
            expandNode: $.proxy(this.expandNode, this),
            toggleNodeExpanded: $.proxy(this.toggleNodeExpanded, this),
            revealNode: $.proxy(this.revealNode, this),

            // Expand / collapse methods
            checkAll: $.proxy(this.checkAll, this), //选择所有节点
            checkNode: $.proxy(this.checkNode, this), //选择指定的节点
            uncheckAll: $.proxy(this.uncheckAll, this),
            uncheckNode: $.proxy(this.uncheckNode, this),
            toggleNodeChecked: $.proxy(this.toggleNodeChecked, this),

            // Disable / enable methods
            disableAll: $.proxy(this.disableAll, this),
            disableNode: $.proxy(this.disableNode, this),
            enableAll: $.proxy(this.enableAll, this),
            enableNode: $.proxy(this.enableNode, this),
            toggleNodeDisabled: $.proxy(this.toggleNodeDisabled, this),

            // Search methods
            search: $.proxy(this.search, this),
            clearSearch: $.proxy(this.clearSearch, this)
        };
    };

    Tree.prototype.init = function (options) {

        this.tree = [];
        this.nodes = [];

        if (options.data) {
            if (typeof options.data === 'string') {
                options.data = $.parseJSON(options.data);
            }
            this.tree = $.extend(true, [], options.data);
            delete options.data;
        }
        this.options = $.extend({}, _default.settings, options);

        this.destroy();
        this.subscribeEvents();
        this.setInitialStates({ nodes: this.tree }, 0);
        this.render();
    };

    Tree.prototype.remove = function () {
        this.destroy();
        $.removeData(this, pluginName);
        $('#' + this.styleId).remove();
    };

    Tree.prototype.destroy = function () {

        if (!this.initialized) return;

        this.$wrapper.remove();
        this.$wrapper = null;

        // Switch off events
        this.unsubscribeEvents();

        // Reset this.initialized flag
        this.initialized = false;
    };

    Tree.prototype.unsubscribeEvents = function () {

        this.$element.off('click');
        this.$element.off('nodeChecked');
        this.$element.off('nodeCollapsed');
        this.$element.off('nodeDisabled');
        this.$element.off('nodeEnabled');
        this.$element.off('nodeExpanded');
        this.$element.off('nodeSelected');
        this.$element.off('nodeUnchecked');
        this.$element.off('nodeUnselected');
        this.$element.off('searchComplete');
        this.$element.off('searchCleared');
    };

    Tree.prototype.subscribeEvents = function () {

        this.unsubscribeEvents();

        this.$element.on('click', $.proxy(this.clickHandler, this));

        if (typeof this.options.onNodeChecked === 'function') {
            this.$element.on('nodeChecked', this.options.onNodeChecked);
        }

        if (typeof this.options.onNodeCollapsed === 'function') {
            this.$element.on('nodeCollapsed', this.options.onNodeCollapsed);
        }

        if (typeof this.options.onNodeDisabled === 'function') {
            this.$element.on('nodeDisabled', this.options.onNodeDisabled);
        }

        if (typeof this.options.onNodeEnabled === 'function') {
            this.$element.on('nodeEnabled', this.options.onNodeEnabled);
        }

        if (typeof this.options.onNodeExpanded === 'function') {
            this.$element.on('nodeExpanded', this.options.onNodeExpanded);
        }

        if (typeof this.options.onNodeSelected === 'function') {
            this.$element.on('nodeSelected', this.options.onNodeSelected);
        }

        if (typeof this.options.onNodeUnchecked === 'function') {
            this.$element.on('nodeUnchecked', this.options.onNodeUnchecked);
        }

        if (typeof this.options.onNodeUnselected === 'function') {
            this.$element.on('nodeUnselected', this.options.onNodeUnselected);
        }

        if (typeof this.options.onSearchComplete === 'function') {
            this.$element.on('searchComplete', this.options.onSearchComplete);
        }

        if (typeof this.options.onSearchCleared === 'function') {
            this.$element.on('searchCleared', this.options.onSearchCleared);
        }
    };

    /*
     Recurse the tree structure and ensure all nodes have
     valid initial states.  User defined states will be preserved.
     For performance we also take this opportunity to
     index nodes in a flattened structure
     */
    Tree.prototype.setInitialStates = function (node, level) {

        if (!node.nodes) return;
        level += 1;

        var parent = node;
        var _this = this;
        $.each(node.nodes, function checkStates(index, node) {

            // nodeId : unique, incremental identifier
            node.nodeId = _this.nodes.length;

            // parentId : transversing up the tree
            node.parentId = parent.nodeId;

            // if not provided set selectable default value
            if (!node.hasOwnProperty('selectable')) {
                node.selectable = true;
            }

            // where provided we should preserve states
            node.state = node.state || {};

            // set checked state; unless set always false
            if (!node.state.hasOwnProperty('checked')) {
                node.state.checked = false;
            }

            // set enabled state; unless set always false
            if (!node.state.hasOwnProperty('disabled')) {
                node.state.disabled = false;
            }

            // set expanded state; if not provided based on levels
            if (!node.state.hasOwnProperty('expanded')) {
                if (!node.state.disabled && level < _this.options.levels && node.nodes && node.nodes.length > 0) {
                    node.state.expanded = true;
                } else {
                    node.state.expanded = false;
                }
            }

            // set selected state; unless set always false
            if (!node.state.hasOwnProperty('selected')) {
                node.state.selected = false;
            }

            // index nodes in a flattened structure for use later
            _this.nodes.push(node);

            // recurse child nodes and transverse the tree
            if (node.nodes) {
                _this.setInitialStates(node, level);
            }
        });
    };

    Tree.prototype.clickHandler = function (event) {

        if (!this.options.enableLinks) event.preventDefault();

        var target = $(event.target);
        var node = this.findNode(target);
        if (!node || node.state.disabled) return;

        var classList = target.attr('class') ? target.attr('class').split(' ') : [];
        if (classList.indexOf('expand-icon') !== -1) {

            this.toggleExpandedState(node, _default.options);
            this.render();
        } else if (classList.indexOf('check-icon') !== -1) {

            this.toggleCheckedState(node, _default.options);
            this.render();
        } else {

            if (node.selectable) {
                this.toggleSelectedState(node, _default.options);
            } else {
                this.toggleExpandedState(node, _default.options);
            }

            this.render();
        }
    };

    // Looks up the DOM for the closest parent list item to retrieve the
    // data attribute nodeid, which is used to lookup the node in the flattened structure.
    Tree.prototype.findNode = function (target) {

        var nodeId = target.closest('li.list-group-item').attr('data-nodeid');
        var node = this.nodes[nodeId];

        if (!node) {
            console.log('Error: node does not exist');
        }
        return node;
    };

    Tree.prototype.toggleExpandedState = function (node, options) {
        if (!node) return;
        this.setExpandedState(node, !node.state.expanded, options);
    };

    Tree.prototype.setExpandedState = function (node, state, options) {

        if (state === node.state.expanded) return;

        if (state && node.nodes) {

            // Expand a node
            node.state.expanded = true;
            if (!options.silent) {
                this.$element.trigger('nodeExpanded', $.extend(true, {}, node));
            }
        } else if (!state) {

            // Collapse a node
            node.state.expanded = false;
            if (!options.silent) {
                this.$element.trigger('nodeCollapsed', $.extend(true, {}, node));
            }

            // Collapse child nodes
            if (node.nodes && !options.ignoreChildren) {
                $.each(node.nodes, $.proxy(function (index, node) {
                    this.setExpandedState(node, false, options);
                }, this));
            }
        }
    };

    Tree.prototype.toggleSelectedState = function (node, options) {
        if (!node) return;
        this.setSelectedState(node, !node.state.selected, options);
    };

    Tree.prototype.setSelectedState = function (node, state, options) {

        if (state === node.state.selected) return;

        if (state) {

            // If multiSelect false, unselect previously selected
            if (!this.options.multiSelect) {
                $.each(this.findNodes('true', 'g', 'state.selected'), $.proxy(function (index, node) {
                    this.setSelectedState(node, false, options);
                }, this));
            }

            // Continue selecting node
            node.state.selected = true;
            if (!options.silent) {
                this.$element.trigger('nodeSelected', $.extend(true, {}, node));
            }
        } else {

            // Unselect node
            node.state.selected = false;
            if (!options.silent) {
                this.$element.trigger('nodeUnselected', $.extend(true, {}, node));
            }
        }
    };

    Tree.prototype.toggleCheckedState = function (node, options) {
        if (!node) return;
        this.setCheckedState(node, !node.state.checked, options);
    };

    Tree.prototype.setCheckedState = function (node, state, options) {

        if (state === node.state.checked) return;

        if (state) {

            // Check node
            node.state.checked = true;

            if (!options.silent) {
                this.$element.trigger('nodeChecked', $.extend(true, {}, node));
            }
        } else {

            // Uncheck node
            node.state.checked = false;
            if (!options.silent) {
                this.$element.trigger('nodeUnchecked', $.extend(true, {}, node));
            }
        }
    };

    Tree.prototype.setDisabledState = function (node, state, options) {

        if (state === node.state.disabled) return;

        if (state) {

            // Disable node
            node.state.disabled = true;

            // Disable all other states
            this.setExpandedState(node, false, options);
            this.setSelectedState(node, false, options);
            this.setCheckedState(node, false, options);

            if (!options.silent) {
                this.$element.trigger('nodeDisabled', $.extend(true, {}, node));
            }
        } else {

            // Enabled node
            node.state.disabled = false;
            if (!options.silent) {
                this.$element.trigger('nodeEnabled', $.extend(true, {}, node));
            }
        }
    };

    Tree.prototype.render = function () {

        if (!this.initialized) {

            // Setup first time only components
            this.$element.addClass(pluginName);
            this.$wrapper = $(this.template.list);

            this.injectStyle();

            this.initialized = true;
        }

        this.$element.empty().append(this.$wrapper.empty());

        // Build tree
        this.buildTree(this.tree, 0);
    };

    // Starting from the root node, and recursing down the
    // structure we build the tree one node at a time
    Tree.prototype.buildTree = function (nodes, level) {

        if (!nodes) return;
        level += 1;

        var _this = this;
        $.each(nodes, function addNodes(id, node) {

            var treeItem = $(_this.template.item).addClass('node-' + _this.elementId).addClass(node.state.checked ? 'node-checked' : '').addClass(node.state.disabled ? 'node-disabled' : '').addClass(node.state.selected ? 'node-selected' : '').addClass(node.searchResult ? 'search-result' : '').attr('data-nodeid', node.nodeId).attr('style', _this.buildStyleOverride(node));

            // Add indent/spacer to mimic tree structure
            for (var i = 0; i < level - 1; i++) {
                treeItem.append(_this.template.indent);
            }

            // Add expand, collapse or empty spacer icons
            var classList = [];
            if (node.nodes) {
                classList.push('expand-icon');
                if (node.state.expanded) {
                    classList.push(_this.options.collapseIcon);
                } else {
                    classList.push(_this.options.expandIcon);
                }
            } else {
                classList.push(_this.options.emptyIcon);
            }

            treeItem.append($(_this.template.icon).addClass(classList.join(' ')));

            // Add node icon
            if (_this.options.showIcon) {

                var classList = ['node-icon'];

                classList.push(node.icon || _this.options.nodeIcon);
                if (node.state.selected) {
                    classList.pop();
                    classList.push(node.selectedIcon || _this.options.selectedIcon || node.icon || _this.options.nodeIcon);
                }

                treeItem.append($(_this.template.icon).addClass(classList.join(' ')));
            }

            // Add check / unchecked icon
            if (_this.options.showCheckbox) {

                var classList = ['check-icon'];
                if (node.state.checked) {
                    classList.push(_this.options.checkedIcon);
                } else {
                    classList.push(_this.options.uncheckedIcon);
                }

                treeItem.append($(_this.template.icon).addClass(classList.join(' ')));
            }

            // Add text
            if (_this.options.enableLinks) {
                // Add hyperlink
                treeItem.append($(_this.template.link).attr('href', node.href).append(node.text));
            } else {
                // otherwise just text
                treeItem.append(node.text);
            }

            // Add tags as badges
            if (_this.options.showTags && node.tags) {
                $.each(node.tags, function addTag(id, tag) {
                    treeItem.append($(_this.template.badge).append(tag));
                });
            }

            // Add item to the tree
            _this.$wrapper.append(treeItem);

            // Recursively add child ndoes
            if (node.nodes && node.state.expanded && !node.state.disabled) {
                return _this.buildTree(node.nodes, level);
            }
        });
    };

    // Define any node level style override for
    // 1. selectedNode
    // 2. node|data assigned color overrides
    Tree.prototype.buildStyleOverride = function (node) {

        if (node.state.disabled) return '';

        var color = node.color;
        var backColor = node.backColor;

        if (this.options.highlightSelected && node.state.selected) {
            if (this.options.selectedColor) {
                color = this.options.selectedColor;
            }
            if (this.options.selectedBackColor) {
                backColor = this.options.selectedBackColor;
            }
        }

        if (this.options.highlightSearchResults && node.searchResult && !node.state.disabled) {
            if (this.options.searchResultColor) {
                color = this.options.searchResultColor;
            }
            if (this.options.searchResultBackColor) {
                backColor = this.options.searchResultBackColor;
            }
        }

        return 'color:' + color + ';background-color:' + backColor + ';';
    };

    // Add inline style into head
    Tree.prototype.injectStyle = function () {

        if (this.options.injectStyle && !document.getElementById(this.styleId)) {
            $('<style type="text/css" id="' + this.styleId + '"> ' + this.buildStyle() + ' </style>').appendTo('head');
        }
    };

    // Construct trees style based on user options
    Tree.prototype.buildStyle = function () {

        var style = '.node-' + this.elementId + '{';

        if (this.options.color) {
            style += 'color:' + this.options.color + ';';
        }

        if (this.options.backColor) {
            style += 'background-color:' + this.options.backColor + ';';
        }

        if (!this.options.showBorder) {
            style += 'border:none;';
        } else if (this.options.borderColor) {
            style += 'border:1px solid ' + this.options.borderColor + ';';
        }
        style += '}';

        if (this.options.onhoverColor) {
            style += '.node-' + this.elementId + ':not(.node-disabled):hover{' + 'background-color:' + this.options.onhoverColor + ';' + '}';
        }

        return this.css + style;
    };

    Tree.prototype.template = {
        list: '<ul class="list-group"></ul>',
        item: '<li class="list-group-item"></li>',
        indent: '<span class="indent"></span>',
        icon: '<span class="icon"></span>',
        link: '<a href="#" style="color:inherit;"></a>',
        badge: '<span class="badge"></span>'
    };

    Tree.prototype.css = '.treeview .list-group-item{cursor:pointer}.treeview span.indent{margin-left:10px;margin-right:10px}.treeview span.icon{width:12px;margin-right:5px}.treeview .node-disabled{color:silver;cursor:not-allowed}';

    /**
     Returns a single node object that matches the given node id.
     @param {Number} nodeId - A node's unique identifier
     @return {Object} node - Matching node
     */
    Tree.prototype.getNode = function (nodeId) {
        return this.nodes[nodeId];
    };

    /**
     Returns the parent node of a given node, if valid otherwise returns undefined.
     @param {Object|Number} identifier - A valid node or node id
     @returns {Object} node - The parent node
     */
    Tree.prototype.getParent = function (identifier) {
        var node = this.identifyNode(identifier);
        return this.nodes[node.parentId];
    };

    /**
     Returns an array of sibling nodes for a given node, if valid otherwise returns undefined.
     @param {Object|Number} identifier - A valid node or node id
     @returns {Array} nodes - Sibling nodes
     */
    Tree.prototype.getSiblings = function (identifier) {
        var node = this.identifyNode(identifier);
        var parent = this.getParent(node);
        var nodes = parent ? parent.nodes : this.tree;
        return nodes.filter(function (obj) {
            return obj.nodeId !== node.nodeId;
        });
    };

    /**
     Returns an array of selected nodes.
     @returns {Array} nodes - Selected nodes
     */
    Tree.prototype.getSelected = function () {
        return this.findNodes('true', 'g', 'state.selected');
    };

    /**
     Returns an array of unselected nodes.
     @returns {Array} nodes - Unselected nodes
     */
    Tree.prototype.getUnselected = function () {
        return this.findNodes('false', 'g', 'state.selected');
    };

    /**
     Returns an array of expanded nodes.
     @returns {Array} nodes - Expanded nodes
     */
    Tree.prototype.getExpanded = function () {
        return this.findNodes('true', 'g', 'state.expanded');
    };

    /**
     Returns an array of collapsed nodes.
     @returns {Array} nodes - Collapsed nodes
     */
    Tree.prototype.getCollapsed = function () {
        return this.findNodes('false', 'g', 'state.expanded');
    };

    /**
     Returns an array of checked nodes.
     @returns {Array} nodes - Checked nodes
     */
    Tree.prototype.getChecked = function () {
        return this.findNodes('true', 'g', 'state.checked');
    };

    /**
     Returns an array of unchecked nodes.
     @returns {Array} nodes - Unchecked nodes
     */
    Tree.prototype.getUnchecked = function () {
        return this.findNodes('false', 'g', 'state.checked');
    };

    /**
     Returns an array of disabled nodes.
     @returns {Array} nodes - Disabled nodes
     */
    Tree.prototype.getDisabled = function () {
        return this.findNodes('true', 'g', 'state.disabled');
    };

    /**
     Returns an array of enabled nodes.
     @returns {Array} nodes - Enabled nodes
     */
    Tree.prototype.getEnabled = function () {
        return this.findNodes('false', 'g', 'state.disabled');
    };

    /**
     Set a node state to selected
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.selectNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setSelectedState(node, true, options);
        }, this));

        this.render();
    };

    /**
     Set a node state to unselected
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.unselectNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setSelectedState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Toggles a node selected state; selecting if unselected, unselecting if selected.
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.toggleNodeSelected = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.toggleSelectedState(node, options);
        }, this));

        this.render();
    };

    /**
     Collapse all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.collapseAll = function (options) {
        var identifiers = this.findNodes('true', 'g', 'state.expanded');
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setExpandedState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Collapse a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.collapseNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setExpandedState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Expand all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.expandAll = function (options) {
        options = $.extend({}, _default.options, options);

        if (options && options.levels) {
            this.expandLevels(this.tree, options.levels, options);
        } else {
            var identifiers = this.findNodes('false', 'g', 'state.expanded');
            this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
                this.setExpandedState(node, true, options);
            }, this));
        }

        this.render();
    };

    /**
     Expand a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.expandNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setExpandedState(node, true, options);
            if (node.nodes && options && options.levels) {
                this.expandLevels(node.nodes, options.levels - 1, options);
            }
        }, this));

        this.render();
    };

    Tree.prototype.expandLevels = function (nodes, level, options) {
        options = $.extend({}, _default.options, options);

        $.each(nodes, $.proxy(function (index, node) {
            this.setExpandedState(node, level > 0 ? true : false, options);
            if (node.nodes) {
                this.expandLevels(node.nodes, level - 1, options);
            }
        }, this));
    };

    /**
     Reveals a given tree node, expanding the tree from node to root.
     @param {Object|Number|Array} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.revealNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            var parentNode = this.getParent(node);
            while (parentNode) {
                this.setExpandedState(parentNode, true, options);
                parentNode = this.getParent(parentNode);
            };
        }, this));

        this.render();
    };

    /**
     Toggles a nodes expanded state; collapsing if expanded, expanding if collapsed.
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.toggleNodeExpanded = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.toggleExpandedState(node, options);
        }, this));

        this.render();
    };

    /**
     Check all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.checkAll = function (options) {
        var identifiers = this.findNodes('false', 'g', 'state.checked');
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setCheckedState(node, true, options);
        }, this));

        this.render();
    };

    /**
     Check a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.checkNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setCheckedState(node, true, options);
        }, this));

        this.render();
    };

    /**
     Uncheck all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.uncheckAll = function (options) {
        var identifiers = this.findNodes('true', 'g', 'state.checked');
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setCheckedState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Uncheck a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.uncheckNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setCheckedState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Toggles a nodes checked state; checking if unchecked, unchecking if checked.
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.toggleNodeChecked = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.toggleCheckedState(node, options);
        }, this));

        this.render();
    };

    /**
     Disable all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.disableAll = function (options) {
        var identifiers = this.findNodes('false', 'g', 'state.disabled');
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setDisabledState(node, true, options);
        }, this));

        this.render();
    };

    /**
     Disable a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.disableNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setDisabledState(node, true, options);
        }, this));

        this.render();
    };

    /**
     Enable all tree nodes
     @param {optional Object} options
     */
    Tree.prototype.enableAll = function (options) {
        var identifiers = this.findNodes('true', 'g', 'state.disabled');
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setDisabledState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Enable a given tree node
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.enableNode = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setDisabledState(node, false, options);
        }, this));

        this.render();
    };

    /**
     Toggles a nodes disabled state; disabling is enabled, enabling if disabled.
     @param {Object|Number} identifiers - A valid node, node id or array of node identifiers
     @param {optional Object} options
     */
    Tree.prototype.toggleNodeDisabled = function (identifiers, options) {
        this.forEachIdentifier(identifiers, options, $.proxy(function (node, options) {
            this.setDisabledState(node, !node.state.disabled, options);
        }, this));

        this.render();
    };

    /**
     Common code for processing multiple identifiers
     */
    Tree.prototype.forEachIdentifier = function (identifiers, options, callback) {

        options = $.extend({}, _default.options, options);

        if (!(identifiers instanceof Array)) {
            identifiers = [identifiers];
        }

        $.each(identifiers, $.proxy(function (index, identifier) {
            callback(this.identifyNode(identifier), options);
        }, this));
    };

    /*
     Identifies a node from either a node id or object
     */
    Tree.prototype.identifyNode = function (identifier) {
        return typeof identifier === 'number' ? this.nodes[identifier] : identifier;
    };

    /**
     Searches the tree for nodes (text) that match given criteria
     @param {String} pattern - A given string to match against
     @param {optional Object} options - Search criteria options
     @return {Array} nodes - Matching nodes
     */
    Tree.prototype.search = function (pattern, options) {
        options = $.extend({}, _default.searchOptions, options);

        this.clearSearch({ render: false });

        var results = [];
        if (pattern && pattern.length > 0) {

            if (options.exactMatch) {
                pattern = '^' + pattern + '$';
            }

            var modifier = 'g';
            if (options.ignoreCase) {
                modifier += 'i';
            }

            results = this.findNodes(pattern, modifier);

            // Add searchResult property to all matching nodes
            // This will be used to apply custom styles
            // and when identifying result to be cleared
            $.each(results, function (index, node) {
                node.searchResult = true;
            });
        }

        // If revealResults, then render is triggered from revealNode
        // otherwise we just call render.
        if (options.revealResults) {
            this.revealNode(results);
        } else {
            this.render();
        }

        this.$element.trigger('searchComplete', $.extend(true, {}, results));

        return results;
    };

    /**
     Clears previous search results
     */
    Tree.prototype.clearSearch = function (options) {

        options = $.extend({}, { render: true }, options);

        var results = $.each(this.findNodes('true', 'g', 'searchResult'), function (index, node) {
            node.searchResult = false;
        });

        if (options.render) {
            this.render();
        }

        this.$element.trigger('searchCleared', $.extend(true, {}, results));
    };

    /**
     Find nodes that match a given criteria
     @param {String} pattern - A given string to match against
     @param {optional String} modifier - Valid RegEx modifiers
     @param {optional String} attribute - Attribute to compare pattern against
     @return {Array} nodes - Nodes that match your criteria
     */
    Tree.prototype.findNodes = function (pattern, modifier, attribute) {

        modifier = modifier || 'g';
        attribute = attribute || 'text';

        var _this = this;
        return $.grep(this.nodes, function (node) {
            var val = _this.getNodeValue(node, attribute);
            if (typeof val === 'string') {
                return val.match(new RegExp(pattern, modifier));
            }
        });
    };

    /**
     Recursive find for retrieving nested attributes values
     All values are return as strings, unless invalid
     @param {Object} obj - Typically a node, could be any object
     @param {String} attr - Identifies an object property using dot notation
     @return {String} value - Matching attributes string representation
     */
    Tree.prototype.getNodeValue = function (obj, attr) {
        var index = attr.indexOf('.');
        if (index > 0) {
            var _obj = obj[attr.substring(0, index)];
            var _attr = attr.substring(index + 1, attr.length);
            return this.getNodeValue(_obj, _attr);
        } else {
            if (obj.hasOwnProperty(attr)) {
                return obj[attr].toString();
            } else {
                return undefined;
            }
        }
    };

    var logError = function logError(message) {
        if (window.console) {
            window.console.error(message);
        }
    };

    // Prevent against multiple instantiations,
    // handle updates and method calls
    $.fn[pluginName] = function (options, args) {

        var result;

        this.each(function () {
            var _this = $.data(this, pluginName);
            if (typeof options === 'string') {
                if (!_this) {
                    logError('Not initialized, can not call method : ' + options);
                } else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
                    logError('No such method : ' + options);
                } else {
                    if (!(args instanceof Array)) {
                        args = [args];
                    }
                    result = _this[options].apply(_this, args);
                }
            } else if (typeof options === 'boolean') {
                result = _this;
            } else {
                $.data(this, pluginName, new Tree(this, $.extend(true, {}, options)));
            }
        });

        return result || this;
    };
})(jQuery, window, document);

})()