/****************************************************************************************************
 * @name:       LivIconsEvo.defaults.js - the default options for LivIcons (Live Icons) Evolution
 * @version:    2.3.XXX (XXX is a total number of icons)
 * @URL:        https://livicons.com
 * @copyright:  (c) 2013-2016 DeeThemes (http://codecanyon.net/user/DeeThemes)
 * @licenses:   http://codecanyon.net/licenses/regular
                http://codecanyon.net/licenses/extended
*****************************************************************************************************/
;if (typeof jQuery === 'undefined') {
  throw new Error('LivIcons Evolution Script requires jQuery!');
};

function LivIconsEvoDefaults () {

    "use strict";

    var url, sistema; 
        url = window.location.protocol + "//" + window.location.hostname;
        if (window.location.hostname == "localhost") {
            url = url + ":" + window.location.port;
        }

        sistema = "/";
        if (window.location.hostname != "localhost") {
            var str = window.location.pathname.split('/');
            sistema = sistema + str[1] + "/";
        }
        toastr.options = { "preventDuplicates": true }
    
     
    var default_options = {
        pathToFolder: url + sistema + 'LivIconsEvo/svg',
		name: 'bell.svg', //the default icon name

		//visualization options

		style: 'original', //'original', 'solid', filled', 'lines' or ('lines-alt' / 'linesAlt')
		size: '60px', //default size
		
		strokeStyle: 'original', //'original', 'round' or 'square'
		strokeWidth: 'original', //'original' or any value in pixels
		
		tryToSharpen: true, //apply or not micro shifts of SVG shapes to try to make them more sharp (crisp)

		rotate: 'none', //'none' or any value in deg [0 ... 360]
		flipHorizontal: false,
		flipVertical: false,
		
		strokeColor: '#22A7F0', //when style opt is 'filled' or 'lines' or ('lines-alt' / 'linesAlt')
		strokeColorAction: '#b3421b', //when 'style' is 'original', 'filled' or 'lines' and 'colorsOnHover' or 'colorsWhenMorph' is 'custom'
		strokeColorAlt: '#F9B32F', //when style opt is ('lines-alt' / 'linesAlt')
		strokeColorAltAction: '#ab69c6', //when 'style' is ('lines-alt' / 'linesAlt') and 'colorsOnHover' or 'colorsWhenMorph' is 'custom'
		fillColor: '#91e9ff', //when style opt is 'filled'
		fillColorAction: '#ff926b', //when 'style' is 'original' or 'filled' and 'colorsOnHover' or 'colorsWhenMorph' is 'custom'
		solidColor: '#6C7A89', //when style opt is 'solid'
		solidColorAction: '#4C5A69', //when 'style' is 'solid' and 'colorsOnHover' or 'colorsWhenMorph' is 'custom'
		solidColorBg: '#ffffff', //when style opt is 'solid'
		solidColorBgAction: '#ffffff', //when 'style' is 'solid'
		
		colorsOnHover: 'none', //'none', 'lighter', 'darker', 'custom' or 'hue0' ... 'hue360'
		colorsHoverTime: 0.3, //seconds
		
		colorsWhenMorph: 'none', //'none', 'lighter', 'darker', 'custom' or 'hue0' ... 'hue360'
		
		brightness: 0.10, // brightness change when 'lighter' or 'darker' (10% by default)
		saturation: 0.07, // saturation change when 'lighter' or 'darker' (7% by default)
		
		morphState: 'start', //'start' or 'end' (initial state for animating position)
		morphImage: 'none', //'none' or a URL to your image (better to use an image with equal width and height)
		allowMorphImageTransform: false, //if true the inside image will rotate and/or flip with a morph icon together

		strokeWidthFactorOnHover: 'none', //'none' or numeric value. For ex., for increase twice set the option to 2
		strokeWidthOnHoverTime: 0.3, //seconds
		keepStrokeWidthOnResize: false,

		//animation options

		animated: true, //if false, an icon is static
		eventType: 'hover', //'click', 'hover' or 'none'
		eventOn: 'self', //'self', 'parent', 'grandparent' or any ID (#some_id) or class (.some_class)
		
		autoPlay: false, //be careful with true value
		delay: 0, //value in seconds
		duration: 'default', //'default' or value in seconds
		repeat: 'default', //'default', 'loop' or integer number of repeats
		repeatDelay: 'default', //'default' or value in seconds

		drawOnViewport: false,
		viewportShift: 'oneHalf', //'none', ('one-half' / 'oneHalf'), ('one-third' / 'oneThird') or 'full'
		drawDelay: 0, //seconds
		drawTime: 1, //seconds
		drawStagger: 0.1, //seconds
		drawStartPoint: 'middle', //'start', 'middle' or 'end'
		drawColor: 'same', //'same' or any desired color value (HEX)
		drawColorTime: 1, //seconds
		drawReversed: false, //true will reverse the order of shapes drawing
		drawEase: 'Power1.easeOut', //default ease

		eraseDelay: 0, //seconds
		eraseTime: 1, //seconds
		eraseStagger: 0.1, //seconds
		eraseStartPoint: 'middle', //'start', 'middle' or 'end'
		eraseReversed: true, //true will reverse the order of shapes erasing
		eraseEase: 'Power1.easeOut', //default ease

		touchEvents: false, //apply or not special events handlers for touch devices

		//callback functions

		beforeAdd: false,
		afterAdd: false,

		beforeUpdate: false,
		afterUpdate: false,

		beforeRemove: false,
		afterRemove: false,

		beforeDraw: false,
		afterDraw: false,
		duringDraw: false,

		beforeErase: false,
		afterErase: false,
		duringErase: false,

		beforeAnim: false,
		afterAnim: false,
		duringAnim: false
	};

	if (default_options.pathToFolder === '/EDIT THIS OPTION!/') {
		alert('LivIcons Evolution: Please edit "pathToFolder" option in the "LivIconsEvo.defaults.js" file!');
		throw new Error('LivIcons Evolution: Please edit "pathToFolder" option in the "LivIconsEvo.defaults.js" file!');
	};

	return default_options;
};