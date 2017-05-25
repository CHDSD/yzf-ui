
const Calendar = (($) => {
    const NAME                = 'calendar';
    const DATA_KEY            = 'yzf.calendar';
    let tools;
    class Calendar {
        constructor(element){
            console.log('element',element);
            this._element = element;
        }
        fill() {
            tools = `<div class="tools">
            <span class='prev-view'>&lt;</span>
            <div class="parents-info">{parentsInfo}</div>
            <span class="next">&gt;</span>
            </div>`;
           // tools.innerHTML = "<div className="tools">"+
           // "<span className='prev-view'>&lt;</span>"+
           // "<div className="parents-info">{parentsInfo}</div>"+
           // "<span className="next">&gt;</span>"+
           //" </div>";
            //this._element.innerHTML = "<div className="days"
            //<span className="day-name">日</span>
            //    <span className="day-name">一</span>
            //    <span className="day-name">二</span>
            //    <span className="day-name">三</span>
            //    <span className="day-name">四</span>
            //    <span className="day-name">五</span>
            //    <span className="day-name">六</span>
            //    {dayList}
            //    </div>";
            this._element.innerHTML=tools;
        }
        show() {
            $(this._element).show();
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
    }
    //$(document).ready(function(){
    //    Calendar.fill();
    //});

    //$.fn[NAME]             = Calendar.fill();
    $.fn[NAME]             = Calendar._jQueryInterface
    return Calendar;
})(jQuery);