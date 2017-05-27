
const Navbara = (($) => {
	const NAME                = 'navbara';
	const DATA_KEY            = 'yzf.navbara';
	class Navbara {
		constructor(element, config) {
			this._element = element;
			this._config = config || {};
		}
		toggle() {
	        $(".navbara").removeClass("ac");
	        $(this._element).addClass("ac");
		}
		
		static _jQueryInterface(config) {
			var args = Array.prototype.slice.call(arguments, 1);
			var returnValue;

			return this.each(function () {
				const $element = $(this).hasClass("navbara") ? $(this) : $(this).parents(".navbara");
				const _config = typeof config === 'object' ? config : null;
				let data = $element.data(DATA_KEY);

				if (!data) {
					data = new Navbara($element[0], _config);
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


	$.fn[NAME]             = Navbara._jQueryInterface;
	return Navbara;
})(jQuery);