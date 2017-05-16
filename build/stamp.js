const pkg = {
	"version": "1.0.0", 
	"homepage": "https://github.com/CHDSD/yzf-ui", 
	"author": "sss"
};
const year = new Date().getFullYear()

const stampTop =
`/*!
 * yzf-ui v${pkg.version} (${pkg.homepage})
 * Copyright 2011-${year} ${pkg.author}
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('yzf-ui\\'s JavaScript requires jQuery. jQuery must be included before yzf-ui\\'s JavaScript.')
}

(function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('yzf-ui\\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
})(jQuery);

(function () {

`;

const stampEnd = 
`

})()`;


module.exports = {
	stampTop: stampTop,
	stampEnd: stampEnd
};