
const Nava = (($) => {
	const NAME                = 'nava';
	const DATA_KEY            = 'yzf.nava';
	class Nava {
		constructor(element, config) {
			this._element = element;
			this._config = config || {};
		}
		toggle() {
	        $(".nava").removeClass("ac");
	        $(this._element).addClass("ac");
		}
		
		static _jQueryInterface(config) {
			var args = Array.prototype.slice.call(arguments, 1);
			var returnValue;

			return this.each(function () {
				const $element = $(this).hasClass("nava") ? $(this) : $(this).parents(".nava");
				const _config = typeof config === 'object' ? config : null;
				let data = $element.data(DATA_KEY);

				if (!data) {
					data = new Nava($element[0], _config);
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


	$.fn[NAME]             = Nava._jQueryInterface;
	return Nava;
})(jQuery);