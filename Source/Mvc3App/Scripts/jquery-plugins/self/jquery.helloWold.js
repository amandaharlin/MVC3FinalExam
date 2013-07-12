//version 1
(function ($) {

    var defaultOptions = {
        duration: 500,
        showText: true,
        text: "Hello Wolrd times 2!"
    };

    function MyConstructor(options) {
        var that = this;

        that.options = {};

        that.init = function (options) {
            that.options = $.extend({}, defaultOptions, options);

            $("#hello").stop().animate({ fontSize: "20px" }, that.options.duration, function () {
                if (that.options.showText) {
                    $(this).text(that.options.text);
                }
            });
        };

        that.init(options);
    }

    var example = new MyConstructor({ duration: 7500 });
    
})(jQuery);

////version 2
//(function ($) {
//    $.fn.extend({
//        animateMenu : function(options) {
//            //Settings list and the default values
//            var defaults = {
//				                animatePadding: 60,
//				                defaultPadding: 10,
//				                evenColor: '#ccc',
//				                oddColor: '#eee'
//				            };
//             
//            var local_options = $.extend(defaults, options);
//            return this.each(function() {
//                //Get all LI in the UL
//                var items = $("li", $(this));
//                   
//                //Change the color according to odd and even rows
//                $("li:even", $(this)).css('background-color', local_options.evenColor);             
//                $("li:odd", $(this)).css('background-color', local_options.oddColor);                     
//                   
//                //Attach mouseover and mouseout event to the LI  
//                items.mouseover(function() {
//                    $(this).animate({paddingLeft: local_options.animatePadding}, 300);
//                     
//                }).mouseout(function() {
//                    $(this).animate({paddingLeft: local_options.defaultPadding}, 300);
//                });
//                 
//            });
//            }
//    });
//})(jQuery);