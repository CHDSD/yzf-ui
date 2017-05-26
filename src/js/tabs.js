/**
 * Created by xiening on 2017/5/19.
 */

const Tabs = (($) => {
    const NAME                = 'tabs';
    const DATA_KEY            = 'yzf.tabs';
    const TRANSITION_DURATION = 150;

    class Tabs{
        constructor(element) {
            this._element = element;
        }

        show() {
            var $this    = $(this._element);
            var $ul      = $this.closest('ul:not(.dropdown-menu)')
            var selector = $this.data('target')

            if (!selector) {
                selector = $this.attr('href')
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
            }

            if ($this.parent('li').hasClass('active')) return

            var $previous = $ul.find('.active:last a')
            var hideEvent = $.Event('hide.bs.tab', {
                relatedTarget: $this[0]
            })
            var showEvent = $.Event('show.bs.tab', {
                relatedTarget: $previous[0]
            })

            $previous.trigger(hideEvent)
            $this.trigger(showEvent)

            if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

            var $target = $(selector)

            this.activate($this.closest('li'), $ul)
            this.activate($target, $target.parent(), function () {
                $previous.trigger({
                    type: 'hidden.bs.tab',
                    relatedTarget: $this[0]
                })
                $this.trigger({
                    type: 'shown.bs.tab',
                    relatedTarget: $previous[0]
                })
            })
        }

        activate(element, container, callback){
                var $active    = container.find('> .active')
                var transition = callback
                    && $.support.transition
                    && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

                function next() {
                    $active
                        .removeClass('active')
                        .find('> .dropdown-menu > .active')
                        .removeClass('active')
                        .end()
                        .find('[data-toggle="tab"]')
                        .attr('aria-expanded', false)

                    element
                        .addClass('active')
                        .find('[data-toggle="tab"]')
                        .attr('aria-expanded', true)

                    if (transition) {
                        element[0].offsetWidth
                        element.addClass('in')
                    } else {
                        element.removeClass('fade')
                    }

                    if (element.parent('.dropdown-menu').length) {
                        element
                            .closest('li.dropdown')
                            .addClass('active')
                            .end()
                            .find('[data-toggle="tab"]')
                            .attr('aria-expanded', true)
                    }

                    callback && callback()
                }

                $active.length && transition ?
                    $active
                        .one('bsTransitionEnd', next)
                        .emulateTransitionEnd(TRANSITION_DURATION) :
                    next()

                $active.removeClass('in')
            }

        static _jQueryInterface(option) {
            return this.each(function () {
                const $element = $(this);
                let data = $element.data(DATA_KEY);

                if (!data) {
                    $element.data(DATA_KEY, (data = new Tabs($element[0])))
                }
                if (typeof option == 'string'){
                    data[option]();
                }
            });
        }

        static _dataApiClickHandler(e) {
            e.preventDefault()

            var target = e.target;
            var action = $(target).attr('data-toggle');
            if (action == 'tab') {
                Tabs._jQueryInterface.call($(this), 'show');
            }
        }

        dispose() {
            $.removeData(this._element, DATA_KEY);
        }
    }
    $(document)
            .on('click.yzf.tabs.data-api', '[data-toggle="tab"]', function (e) {
                Tabs._jQueryInterface.call($(this), 'show');
            })

    $.fn[NAME]             = Tabs._jQueryInterface
    $.fn[NAME].Constructor = Tabs
    $.fn[NAME].noConflict  = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT
        return Tabs._jQueryInterface
    };
    return Tabs
})(jQuery);



