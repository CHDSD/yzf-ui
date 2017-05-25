
const Modal = (($) => {

    const NAME                = 'modal';
    const DATA_KEY            = 'yzf.modal';

    class Modal {

        constructor(element, config) {
            console.log('element', element, 'config', config);
            this._element = element;
            this._config = config || {};
        }

        show() {
            $(this._element).show();
        }

        config(config) {
            this._config = $.extends({}, this._config, config);
        }

        hide() {
            $(this._element).hide();
        }

        ok() {
            this.hide();
            this._config['succ'] && this._config['succ']();
        }

        cancel() {
            this.hide();
            this._config['fail'] && this._config['fail']();
        }

        static _jQueryInterface(config) {
            var args = Array.prototype.slice.call(arguments, 1);
            var returnValue;

            return this.each(function () {
                const $element = $(this).hasClass("modal") ? $(this) : $(this).parents(".modal");
                const _config = typeof config === 'object' ? config : null;
                let data = $element.data(DATA_KEY);

                if (!data) {
                    data = new Modal($element[0], _config);
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

        static _dataApiClickHandler(e) {
            var target = e.target;
            var action = $(target).attr('data-action');
            if (action == 'close') {
                Modal._jQueryInterface.call($(this), 'hide');
            } else if (action == 'show') {
                Modal._jQueryInterface.call($(this), 'show');
            }
        }
    }

    $(document).on(
        'click',
        '.modal .modal-close',
        function (e) {
            Modal._jQueryInterface.call($(this), 'hide');
        }
    );

    $(document).on(
        'click',
        '.modal .modal-ok',
        function (e) {
            Modal._jQueryInterface.call($(this), 'ok');
        }
    );

    $(document).on(
        'click',
        '.modal .modal-cancel',
        function (e) {
            Modal._jQueryInterface.call($(this), 'cancel');
        }
    );

    $.fn[NAME]             = Modal._jQueryInterface
    return Modal

})(jQuery);
