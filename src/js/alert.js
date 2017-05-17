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

    constructor(element) {
      this._element = element
    }

    static _jQueryInterface(config) {
      return this.each(function () {
        const $element = $(this)
        let data       = $element.data(DATA_KEY)

        if (!data) {
          data = new Alert(this)
          $element.data(DATA_KEY, data)
        }

      });
    }

    dispose() {
      $.removeData(this._element, DATA_KEY)
      this._element = null
    }

  }


  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  // $(document).on(
  //   Event.CLICK_DATA_API,
  //   Selector.DISMISS,
  //   Alert._handleDismiss(new Alert())
  // )


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
  }

  return Alert

})(jQuery);
