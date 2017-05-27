
const Calendar = (($) => {
    const NAME                = 'calendar';
    const DATA_KEY            = 'yzf.calendar';
    // 月份名映射
    const MONTH_MAP = {
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
    let {selTime,selTimeStr,startTime,endTime} = '';
    let curTime = new Date();
    let viewTime = new Date();
    let curView = 'month';
    //let showItem = false;
    //let tools;
    class Calendar {
        constructor(element){
            console.log('element',element);
            this._element = element;
        }
        // 获取日历视图
        getView() {
            if (curView === 'month') {
                return this.monthRender();
            } else if (curView === 'year') {
                return this.yearRender();
            } else if (curView === 'decade') {
                return this.decadeRender();
            }
        }
        //日历头部Dom元素
        calendarRender(){
            let items = this.getView();
            let parentsInfo = this.getParentsInfo();
            let calendarHtml =
                '<div class="ipt-box">' +
                '<input type="text" readOnly={true}/>' +
                '</div>' +
                '<div class="item-box">'+
                '<div class="tools">' +
                '<span class="pre-view">'+'&lt;'+'</span>' +
                '<div class="parents-info">'+parentsInfo+'</div>' +
                '<span class="next-view">'+'&gt;'+'</span>' +
                '</div>' +
                items+
                '</div>';
            $(this._element).html(calendarHtml);
            $(this._element).children('.ipt-box').children('input').val(selTimeStr);
        }
        //月视图组件，显示一个月中的天
        monthRender() {
            let {y,m,d} = this.getYmd(viewTime);
            let dayList = [];
            let selYmd = selTime && this.getYmd(selTime);
            let day = 1;
            let cls = '';
            let monthDay = new Date(y, m, day);
            // 当前月份的天
            while (monthDay.getMonth() === m) {
                cls = 'day cur-month';
                if ((startTime && monthDay < startTime) || (endTime && monthDay > endTime)) {
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
                dayList.push('<span class="'+cls+'">'+day+'</span>');
                day += 1;
                monthDay = new Date(y, m, day);
            }
            let lastDate = day - 1;
            // 设置灰色显示的上月的日期
            day = 1;
            cls = '';
            let firstDayOfMonth = new Date(y, m, 1).getDay();
            let preDays = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
            while (preDays > 0) {
                preDays -= 1;
                day -= 1;
                monthDay = new Date(y, m, day);
                cls = 'day pre-month'
                if ((startTime && monthDay < startTime) || (endTime && monthDay > endTime)) {
                    cls += ' disable';
                }
                if (selTime) {
                    if (this.compareTime(monthDay, selTime, 'date')) {
                        cls += ' cur';
                    }
                }
                dayList.unshift('<span class="'+cls+'">'+monthDay.getDate()+'</span>')
            }
            // 设置灰色显示的下月的日期
            day = lastDate;
            cls = '';
            let lastDayOfMonth = new Date(y, m, day).getDay();
            let postDays = lastDayOfMonth === 6 ? 7 : 7 - lastDayOfMonth - 1;
            // 确保每个月显示6行天数
            if ((dayList.length + postDays) / 7 < 6) {
                postDays += 7;
            }
            while (postDays > 0) {
                postDays -= 1;
                day += 1;
                monthDay = new Date(y, m, day);
                cls = 'day post-month'
                if ((startTime && monthDay < startTime) || (endTime && monthDay > endTime)) {
                    cls += ' disable';
                }
                if (selTime) {
                    if (this.compareTime(monthDay, selTime, 'date')) {
                        cls += ' cur';
                    }
                }
                dayList.push('<span class="'+cls+'">'+monthDay.getDate()+'</span>')
            }
            let dayListHead =
                '<span class="day-name">日</span>' +
                '<span class="day-name">一</span>' +
                '<span class="day-name">二</span>' +
                '<span class="day-name">三</span>' +
                '<span class="day-name">四</span>' +
                '<span class="day-name">五</span>' +
                '<span class="day-name">六</span>';

            let daListbody = dayList.join('');
            let dayListHtml = '<div class="days">'+dayListHead+daListbody+'</div>';
            return dayListHtml;
        }
        // 获取年视图，显示月份
        yearRender() {
            let {y,m,d} = this.getYmd(viewTime);
            let mList = [];

            // 开始，结束日期所在的月份，每个显示的月份如果不在开始，结束时间的月份范围内，都要加上disable。
            // 为了方便对比，生成时间时天都设置为每月第一天。
            startTime = startTime && new Date(startTime.getFullYear(), startTime.getMonth(), 1);
            endTime = endTime && new Date(endTime.getFullYear(), endTime.getMonth(), 1);
            let cls, monthDay;
            for (let i = 1; i < 13; i++) {
                monthDay = new Date(y, i-1, 1);
                cls = 'month';
                if ((startTime && monthDay < startTime) || (endTime && monthDay > endTime)) {
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
                mList.push('<span class="'+cls+'">'+MONTH_MAP[i]+'</span>')
            }
            let mListHtml = '<div class="months">'+ mList.join('') + '</div>';
            return mListHtml;
        }
        // 获取十年期视图
        decadeRender() {
            let { y, m, d } = this.getYmd(viewTime);
            var yList = [];

            // 开始，结束日期所在的年份，每个显示的年份如果不在开始，结束时间的年份范围内，都要加上disable。
            // 为了方便对比，生成时间时天都设置为每年第一个月的第一天。
            startTime = startTime && new Date(startTime.getFullYear(), 0, 1);
            endTime = endTime && new Date(endTime.getFullYear(), 0, 1);

            let cls = '';
            let monthDay;
            y = y - y % 10 - 1;
            for (let i = 0; i < 12; i++) {
                cls = 'year';
                if (i == 0) {
                    cls += ' pre-year';
                } else if (i == 11) {
                    cls += ' post-year';
                } else if (new Date(y, 0, 1) > curTime) {
                    cls += ' post-year';
                }
                monthDay = new Date(y, 0, 1);
                if ((startTime && monthDay < startTime) || (endTime && monthDay > endTime)) {
                    cls += ' disable';
                }
                if (selTime) {
                    if (this.compareTime(monthDay, selTime, 'year')) {
                        cls += ' cur';
                    }
                }
                yList.push('<span class="'+cls +'">'+y+'</span>');
                y++;
            }
            let yListHtml = '<div class="years">'+ yList.join('') + '</div>';
            return yListHtml;
        }
        // 上一个日历视图
        preView() {
            let { y, m, d } = this.getYmd(viewTime);
            let nextTime = null;

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
        nextView() {
            let { y, m, d } = this.getYmd(viewTime);
            let nextTime = null;

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
        parentView() {
            let nextView = null;

            if (curView === 'month') {
                nextView = 'year';
            } else if (curView === 'year') {
                nextView = 'decade';
            }
            curView = nextView ? nextView : curView;
            this.calendarRender();
        }
        // 日被点击
        dayClk(e) {
            if(e.target.className.match(/disable/)) {
                return ;
            }
            let { y, m, d } = this.getYmd(viewTime);
            let cls = e.target.className;
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
        monthClk(e) {
            if(e.target.className.match(/disable/)) {
                return ;
            }
            let month = e.target.innerHTML;
            for (let i = 1; i < 13; i++) {
                if (MONTH_MAP[i] === month) {
                    month = i - 1;
                    break;
                }
            }
            if (typeof month === 'number') {
                let y = viewTime.getFullYear();
                let m = viewTime.getMonth();
                let d = viewTime.getDate();
                    viewTime = new Date(y, month, 1);
                    curView = 'month';
            }
            this.calendarRender();
        }

        // 年被点击
        yearClk(e) {
            if(e.target.className.match(/disable/)) {
                return ;
            }
            let { y, m, d } = this.getYmd(viewTime);
            let year = e.target.innerHTML;

            viewTime =  new Date(year, 0, 1);
            curView = 'year';
            this.calendarRender();
        }
        // 显示、隐藏日历框。如果将要显示日历框时，重置viewTime为当前选中时间selTime，或当前时间。
        toggle() {
            $(this._element).children('.item-box').toggle();
        }
        static _jQueryInterface(config) {
            var args = Array.prototype.slice.call(arguments, 1);
            var returnValue;

            return this.each(function () {
                const $element = $(this).hasClass("calendar") ? $(this) : $(this).parents(".calendar");
                const _config = typeof config === 'object' ? config : null;
                let data = $element.data(DATA_KEY);

                if (!data) {
                    data = new Calendar($element[0], _config);
                    $element.data(DATA_KEY, data);
                }

                if (typeof config === 'string') {
                    if (data[config] === undefined) {
                        throw new Error(`No method named "${config}"`);
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
        //获取时间对象的yyyy, mm, dd
        getYmd(date){
            if (!date) {
                return {};
            }

            let y = date.getFullYear();
            let m = date.getMonth();
            let d = date.getDate();
            return {y, m, d};
        }
        // 获取当前视图父级信息的描述
        getParentsInfo() {
            let { y, m, d } = this.getYmd(viewTime);
            let info = '';

            if (curView === 'month') {
                info = MONTH_MAP[m + 1] + y;
            } else if (curView === 'year') {
                info = y;
            } else if (curView === 'decade') {
                info = (y - y%10) + '-' + (y - y%10 + 9);
            }
            return info;
        }
        //时间转换为字符串
        timeToStr(date) {
            let y = date.getFullYear();
            let m = date.getMonth();
            let d = date.getDate();

            m = (m + 101 + '').substring(1);
            d = (d + 100 + '').substring(1);
            return [y, m, d].join('-');
        }
        //对比两个时间对象是否相同
        compareTime(dateA, dateB, level) {
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

    }

    $(document).on(
        'click',
        '.calendar .pre-view',
        function (e) {
            Calendar._jQueryInterface.call($(this), 'preView');
        }
    );

    $(document).on(
        'click',
        '.calendar .next-view',
        function (e) {
            Calendar._jQueryInterface.call($(this), 'nextView');
        }
    );

    $(document).on(
        'click',
        '.calendar .parents-info',
        function (e) {
            Calendar._jQueryInterface.call($(this), 'parentView');
        }
    );

    //$(document).on(
    //    'click',
    //    '.calendar .ipt-box',
    //    function (e) {
    //        Calendar._jQueryInterface.call($(this), 'toggle');
    //    }
    //);

    $(document).on(
        'click',
        '.calendar .months',
        function (e) {
            Calendar._jQueryInterface.call($(this), 'monthClk',e);
        }
    );

    $(document).on(
        'click',
        '.calendar .years',
        function (e) {
            Calendar._jQueryInterface.call($(this), 'yearClk',e);
        }
    );

    $(document).on(
        'click',
        '.calendar .days',
        function (e) {
            Calendar._jQueryInterface.call($(this), 'dayClk',e);
        }
    );

    $.fn[NAME]             = Calendar._jQueryInterface;
    return Calendar;
})(jQuery);