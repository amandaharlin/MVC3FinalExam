////version 1
//(function ($) {
//    $.fn.makeTextRed = function() {
//        return this.each(function() {
//            $(this).css('color', 'red');
//        });
//    };
//})(jQuery);

//version 2
(function ($) {
    $.fn.extend({
        makeTextRed: function(){
            return this.each(function(){
                $(this).css('color', 'red');
            });
        }
    });
})(jQuery);