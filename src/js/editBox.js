/**
 * --------------------------------------------------------------------------
 * yzf-ui (v4.0.0-alpha.6): editBox.js
 * Licensed under MIT (https://github.com/CHDSD/yzf-ui)
 * --------------------------------------------------------------------------
 */

const EditBox = (($) => {

  const NAME                = 'editBox';
  const DATA_KEY            = 'yzf.editBox';

  class EditBox {

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
      this._config['confirm'] && this._config['confirm'](this._element);
    }

    cancel() {
      this.hide();
      this._config['cancel'] && this._config['cancel'](this._element);
    }

    static _jQueryInterface(config) {
      var args = Array.prototype.slice.call(arguments, 1);
      var returnValue;

      return this.each(function () {
        const $element = $(this).hasClass("edit-box") ? $(this) : $(this).parents(".edit-box");
        const _config = typeof config === 'object' ? config : null;
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new EditBox($element[0], _config);
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
        EditBox._jQueryInterface.call($(this), 'hide');
      } else if (action == 'show') {
        EditBox._jQueryInterface.call($(this), 'show');
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
    '.edit-box .edit-box-close',
    function (e) {
      EditBox._jQueryInterface.call($(this), 'hide');
    }
  );

  $(document).on(
    'click',
    '.edit-box .edit-box-ok',
    function (e) {
      EditBox._jQueryInterface.call($(this), 'ok');
    }
  );

  $(document).on(
    'click',
    '.edit-box .edit-box-cancel',
    function (e) {
      $(this).editBox('cancel');
    }
  );


  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME]             = EditBox._jQueryInterface
  $.fn[NAME].Constructor = EditBox
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return EditBox._jQueryInterface
  }

  return EditBox

})(jQuery);
