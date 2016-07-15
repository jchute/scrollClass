(function( $ ) {
    $.fn.scrollClass = function(options) {
        if($(this)[0] === undefined) return;

        var settings = $.extend( {
            'position': 1,
            'className': 'scrolled'
        }, options )

        var mainObj = $(this);

        if(settings.position instanceof jQuery) settings.position = settings.position.first().offset().top;

        checkScroll(); $(window).scroll(checkScroll);

        function checkScroll() {
            if($(window).scrollTop() >= convertToPx(settings.position)) {
                mainObj.addClass(settings.className);
            } else {
                mainObj.removeClass(settings.className);
            }
        }

        function convertToPx(value) {
            value = value.toString();

            var docHeight = $(document).height(),
                winHeight = $(window).height(),
                winWidth = $(window).innerWidth(),
                unit = '';

            if(value.slice(-1) == '%') unit = '%';
            if($.inArray(value.slice(-2), ['px', 'vw', 'vh']) != -1) unit = value.slice(-2);

            if(unit != '') {
                if(unit == '%') value = value.slice(0, -1);
                else value = value.slice(0, -2)
            }

            if(value == 'top') value = 1;
            if(value == 'middle') value = (docHeight / 2) - (winHeight / 2);
            if(value == 'bottom') value = docHeight - winHeight;

            if(unit == '%') value = value * (docHeight / 100);
            if(unit == 'vh') value = value * (winHeight / 100);
            if(unit == 'vw') value = value * (winWidth / 100);

            if(isNaN(value) && $.inArray(value, ['top', 'middle', 'bottom']) == -1) {
                console.log('Warning: Value for "position" is not a valid unit.');
                value = -1;
            }

            return parseInt(value);
        }
    };
})( jQuery );
