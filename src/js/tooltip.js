/**
 * --------------------------------------------------------------------------
 * yzf-ui (v4.0.0-alpha.6): tooltip.js
 * Licensed under MIT (https://github.com/CHDSD/yzf-ui)
 * --------------------------------------------------------------------------
 */

const Tooltip = (($) => {

  const NAME                = 'tooltip';
  const DATA_KEY            = 'yzf.tooltip';

  const AttachmentMap = {
    TOP    : 'top',
    RIGHT  : 'right',
    BOTTOM : 'bottom',
    LEFT   : 'left'
  }

  class Tooltip {

    constructor(element, config) {
      this._element = element;
      this._config = config || {};
      this._tip = null;

      this._setListeners();
    }

    _setListeners() {
      let _this = this;
      $(this._element).on('mouseenter', function(e) {
        console.log('show tip');
        _this._enter(e);
      });
      $(this._element).on('mouseleave', function(e) {
        console.log('hide tip');
        _this._leave(e);
      });
    }

    _enter(e) {
      let $el = $(this._element);
      let text = $el.attr('data-original-title');
      let place = $el.attr('data-placement');
      place = place ? AttachmentMap[place.toUpperCase()] : '';
      place = place ? place : this._calcPlace(text);

      this._show(text, place);
    }

    _leave(e) {
      this._tip && this._tip.remove();

    }

    _show(text, place) {
      this._updateTip(text, place);
    }

    _updateTip(text, place) {
      let htmlStr = '<div class="tooltip-box '+place+'"></div>';
      this._tip = $(htmlStr);
      htmlStr = '<p class="tooltip-text">'+text+'</p>'+
        '<span class="tooltip-arrow '+place+'"></span>';
      this._tip.html(htmlStr);
      this._tip.css(this._getStyle(place));
      $(document.body).append(this._tip);
    }

    _getStyle(place) {
      let $el = $(this._element);
      let offset = $el.offset();
      let cw = $el.outerWidth();
      let ch = $el.outerHeight();
      let top, left;
      offset.top = offset.top - $(document).scrollTop();
      offset.left = offset.left - $(document).scrollLeft();
      top = offset.top + ch / 2;
      left = offset.left + cw / 2;

      switch(place) {
        case 'top':
          top -= ch/2+10;
          break;
        case 'left':
          left -= cw/2+10;
          break;
        case 'right':
          left += cw/2+10;
          break;
        case 'bottom':
          top += ch/2+10;
          break;
        default:
          break;
      }
      console.log(offset, top, left);
      return {
        top: top + 'px',
        left: left + 'px'
      }
    }

    _calcPlace() {
      let $el = $(this._element);
      let offset = $el.offset();
      let wh = $(window).height();
      let ww = $(window).width();
      let posV, posH;
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

    static _jQueryInterface(config) {
      var args = Array.prototype.slice.call(arguments, 1);
      var returnValue;

      return this.each(function () {
        const $element = $(this).attr("data-toggle") == 'tooltip' ? $(this) : $(this).parents('[data-toggle="tooltip"]');
        const _config = typeof config === 'object' ? config : null;
        let data = $element.data(DATA_KEY);

        if (!data) {
          data = new Tooltip($element[0], _config);
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
  $.fn[NAME]             = Tooltip._jQueryInterface
  $.fn[NAME].Constructor = Tooltip
  $.fn[NAME].noConflict  = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return Tooltip._jQueryInterface
  }

  return Tooltip

})(jQuery);