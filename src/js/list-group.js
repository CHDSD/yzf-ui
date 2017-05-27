
const Panel = (($) => {
	const NAME                = 'panel';
	const DATA_KEY            = 'yzf.panel';
	class Panel {
		constructor(element, config) {
			this._element = element;
			this._config = config || {};
		}
		toggle() {
			$(".panel").slideToggle();
		}
		
		static _jQueryInterface(config) {
			var args = Array.prototype.slice.call(arguments, 1);
			var returnValue;

			return this.each(function () {
				const $element = $(this).hasClass("panel") ? $(this) : $(this).parents(".panel");
				const _config = typeof config === 'object' ? config : null;
				let data = $element.data(DATA_KEY);

				if (!data) {
					data = new Panel($element[0], _config);
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

	// $(document).on(
	// 	'click',
	// 	'.header',
	// 	function (e) {
	// 		$(this).droplist('keydown',e);
	// 	}
	// );

	$.fn[NAME]             = Panel._jQueryInterface;
	return Panel;
})(jQuery);