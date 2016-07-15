/*
  Scroll Class
  Version: 1.0
  Developer: Jonathan Chute
  Year: 2016
*/
!function(i){i.fn.scrollClass=function(o){function s(){i(window).scrollTop()>=n(t.position)?e.addClass(t.className):e.removeClass(t.className)}function n(o){o=o.toString();var s=i(document).height(),n=i(window).height(),t=i(window).innerWidth(),e="";return"%"==o.slice(-1)&&(e="%"),-1!=i.inArray(o.slice(-2),["px","vw","vh"])&&(e=o.slice(-2)),""!=e&&(o="%"==e?o.slice(0,-1):o.slice(0,-2)),"top"==o&&(o=1),"middle"==o&&(o=s/2-n/2),"bottom"==o&&(o=s-n),"%"==e&&(o*=s/100),"vh"==e&&(o*=n/100),"vw"==e&&(o*=t/100),isNaN(o)&&-1==i.inArray(o,["top","middle","bottom"])&&(console.log('Warning: Value for "position" is not a valid unit.'),o=-1),parseInt(o)}if(void 0!==i(this)[0]){var t=i.extend({position:1,className:"scrolled"},o),e=i(this);t.position instanceof jQuery&&(t.position=t.position.first().offset().top),s(),i(window).scroll(s)}}}(jQuery);
