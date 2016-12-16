/*
Scroll Class
Version: 3.1
Developer: Jonathan Chute
Year: 2016
*/
(function( $ ) {
    $.fn.scrollClass = function(options) {
        if($(this)[0] === undefined) return;

        var errStyle = 'font-style: italic; color: #FF7722;';

        var settings = $.extend( {
                'target': ['top'],
                'class': ['scrolled'],
                'showDirections': false
            }, options );

        var mainObj = $(this),
            currPos = {top: $(window).scrollTop(), left: $(window).scrollLeft()},
            prevPos = currPos;

        settings.target = convertToArray(settings.target);
        settings.class  = convertToArray(settings.class);

        // Set Classes
        for(var i = 0; i < settings.target.length; i++) {
            if(settings.class[i] === undefined || settings.class[i] === '') {
                if(i == 0) {
                    settings.class[i] = 'scrolled';
                } else {
                    settings.class[i] = settings.class[0] + '-' + i;
                }
            }
        }

        // Set Targets
        for(var i = 0; i < settings.target.length; i++) {
            // When a jQuery Element is used
            if(settings.target[i] instanceof jQuery) {
                if(settings.target[i].length > 0) {
                    for(var x = 0; x < settings.target[i].length; x++) {
                        if(x == 0) continue;
                        settings.target.splice(i + x, 0, settings.target[i].eq(x).offset().top);
                        settings.class.splice(i + x, 0, settings.class[i] + '-' + x);
                    }
                    settings.target.splice(i, 1, settings.target[i].first().offset().top);
                } else {
                    settings.target[i] = undefined;
                }
            }

            if(settings.target[i] === undefined) {
                console.log('%cWarning: An element is missing from the page. The rule has been ignored.', errStyle);
                settings.target.splice(i, 1);
                settings.class.splice(i, 1);
                i--;
            }
        }


        function checkScroll() {
            currPos = {top: $(window).scrollTop(), left: $(window).scrollLeft()};

            for(var i = 0; i < settings.target.length; i++) {
                if(currPos.top >= convertToPixel(settings.target[i], i)) {
                    mainObj.addClass(settings.class[i]);
                } else {
                    mainObj.removeClass(settings.class[i]);
                }
            }

            if(settings.showDirections && currPos.left == prevPos.left) {
                mainObj.removeClass('no-scroll up-scroll down-scroll');
                if(currPos.top > prevPos.top) {
                    if(prevPos.top > 0) {
                        mainObj.addClass('down-scroll');
                    } else {
                        mainObj.addClass('up-scroll');
                    }
                } else if(currPos.top < prevPos.top){
                    if(prevPos.top < $(document).height() - $(window).height()) {
                        mainObj.addClass('up-scroll');
                    } else {
                        mainObj.addClass('down-scroll');
                    }
                } else {
                    mainObj.addClass('no-scroll');
                }   
            }

            prevPos = currPos;
        }
        
        checkScroll(); $(window).scroll(checkScroll);


        function addSuffix(number) {
            number = number.toString();
            if(number.slice(-1) == 1 && number != 11) number += 'st';
            else if(number.slice(-1) == 2 && number != 12) number += 'nd';
            else if(number.slice(-1) == 3 && number != 13) number += 'rd';
            else number += 'th';
            return number;
        }

        function convertToArray(value) {
            if(value.constructor !== Array) {
                value = [value];
            }
            return value;
        }

        function convertToPixel(value, index) {
            value = value.toString();

            var bodyHeight = $('body').height(),
                bodyWidth = $('body').width(),
                winHeight = $(window).height(),
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
            if(value == 'middle') value = (bodyHeight / 2) - (winHeight / 2);
            if(value == 'bottom') value = bodyHeight - winHeight;
            
            console.log('Document Height: ' + bodyHeight);
            console.log('Window Height: ' + winHeight);

            if(unit == '%') value = value * (bodyHeight / 100);
            if(unit == 'vh') value = value * (winHeight / 100);
            if(unit == 'vw') value = value * (bodyWidth / 100);

            if(isNaN(value)) {
                console.log('%cWarning: "' + value + '" is not a valid value for "target".', errStyle);

                value = -1;
            }

            return parseInt(value);
        }
    };
})( jQuery );
