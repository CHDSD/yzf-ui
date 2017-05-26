
const dropList = (($) => {
	const NAME                = 'droplist';
	const DATA_KEY            = 'yzf.droplist';
	class dropList {
		constructor(element, config) {
			this._element = element;
			this._config = config || {};
		}
		toggle() {
			$('.drop-option').toggle();
		}
		hide(){
			$('.drop-option').hide();
		}
		keydown(e){
			var txt = e.target.innerText;
			$(".drop-data input").val(txt);
			this.hide();
		}
		static _jQueryInterface(config) {
			var args = Array.prototype.slice.call(arguments, 1);
			var returnValue;

			return this.each(function () {
				const $element = $(this).hasClass("drop-list") ? $(this) : $(this).parents(".drop-list");
				const _config = typeof config === 'object' ? config : null;
				let data = $element.data(DATA_KEY);

				if (!data) {
					data = new dropList($element[0], _config);
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

	$(document).on(
		'click',
		'.drop-option li',
		function (e) {
			$(this).droplist('keydown',e);
		}
	);

	$.fn[NAME]             = dropList._jQueryInterface;
	return dropList;
})(jQuery);