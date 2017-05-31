/**
 * --------------------------------------------------------------------------
 * yzf-ui (v4.0.0-alpha.6): alert.js
 * Licensed under MIT (https://github.com/CHDSD/yzf-ui)
 * --------------------------------------------------------------------------
 */

const Alert = (($) => {

  const NAME                = 'alert';
  const DATA_KEY            = 'yzf.alert';

  class Alert {

    constructor(element, config) {
      this._element = element;
      this._config = config || {};
    }

    show() {
      $(this._element).show();
    }

    config(config) {
      this._config = $.extend({}, this._config, config);
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
        const $element = $(this).hasClass("alert") ? $(this) : $(this).parents(".alert");
        const _config = typeof config === 'object' ? config : null;
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert($element[0], _config);
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
        Alert._jQueryInterface.call($(this), 'hide');
      } else if (action == 'show') {
        Alert._jQueryInterface.call($(this), 'show');
      }
    }

    dispose() {
      $.removeData(this._element, DATA_KEY);
      // this._element = null;
    }

  }


  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(
    'click',
    '.alert .alert-close',
    function (e) {
      Alert._jQueryInterface.call($(this), 'hide');
    }
  );

  $(document).on(
    'click',
    '.alert .alert-ok',
    function (e) {
      Alert._jQueryInterface.call($(this), 'ok');
    }
  );

  $(document).on(
    'click',
    '.alert .alert-cancel',
    function (e) {
      $(this).alert('cancel');
    }
  );


  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = Alert._jQueryInterface
  $.fn[NAME].Constructor = Alert
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Alert._jQueryInterface
  };
  return Alert

})(jQuery);
