/*
  Scroll Class
  Version: 2.0
  Developer: Jonathan Chute
  Year: 2016
*/
(function( $ ) {
    $.fn.scrollClass = function(options) {
        if($(this)[0] === undefined) return;

        var settings = $.extend( {
                'target': ['top'],
                'className': ['scrolled'],
                'addDirections': false
            }, options ),
            mainObj = $(this),
            currPos = {top: $(window).scrollTop(), left: $(window).scrollLeft()},
            prevPos = currPos;
        
        settings.target = convertToArray(settings.target);
        settings.className = convertToArray(settings.className);
        
        for(var i = 0; i < settings.target.length; i++) {
            if(settings.target[i] instanceof jQuery)
                settings.target[i] = settings.target[i].first().offset().top;

            settings.target[i] = convertToPx(settings.target[i], i);

            if(typeof settings.className[i] === 'undefined' || settings.className[i] == '') {
                if(i == 0)
                    settings.className[i] = 'scrolled';
                else
                    settings.className[i] = settings.className[0] + '-' + i;
            }
        }

        checkScroll(); $(window).scroll(checkScroll);

        function checkScroll() {
            currPos = {top: $(window).scrollTop(), left: $(window).scrollLeft()};

            for(var i = 0; i < settings.target.length; i++) {
                if(currPos.top >= settings.target[i]) {
                    mainObj.addClass(settings.className[i]);
                } else {
                    mainObj.removeClass(settings.className[i]);
                }
            }

            if(settings.addDirections && currPos.left == prevPos.left) {
                mainObj.removeClass('no-scroll up-scroll down-scroll');
                if(currPos.top > prevPos.top) {
                    if(prevPos.top > 0)
                        mainObj.addClass('down-scroll');
                    else
                        mainObj.addClass('up-scroll');
                } else if(currPos.top < prevPos.top){
                    if(prevPos.top < $(document).height() - $(window).height())
                        mainObj.addClass('up-scroll');
                    else
                        mainObj.addClass('down-scroll');
                } else {
                    mainObj.addClass('no-scroll');
                }   
            }

            prevPos = currPos;
        }
        
        function convertToArray(value) {
            if(value.constructor !== Array)
                value = [value];
            return value;
        }

        function convertToPx(value, index) {
            value = value.toString();

            var docHeight = $(document).height(),
                winHeight = $(window).height(),
                winWidth = $(window).innerWidth(),
                unit = '';

            if(value.slice(-1) == '%') {
                unit = '%';
                value = value.slice(0, -1);
            }
            if($.inArray(value.slice(-2), ['px', 'vw', 'vh']) != -1) {
                unit = value.slice(-2);
                value = value.slice(0, -2)
            }

            if(value == 'top') value = 1;
            if(value == 'middle') value = (docHeight / 2) - (winHeight / 2);
            if(value == 'bottom') value = docHeight - winHeight;

            if(unit == '%') value = value * (docHeight / 100);
            if(unit == 'vh') value = value * (winHeight / 100);
            if(unit == 'vw') value = value * (winWidth / 100);

            if(isNaN(value)) {
                var num = index + 1;
                num = num.toString();
                if(num.slice(-1) == 1 && num != 11) num += 'st';
                else if(num.slice(-1) == 2 && num != 12) num += 'nd';
                else if(num.slice(-1) == 3 && num != 13) num += 'rd';
                else num += 'th';
                console.log('Warning: The ' + num + ' value for "target" is not valid.');

                value = -1;
            }

            return parseInt(value);
        }
    };
})( jQuery );
