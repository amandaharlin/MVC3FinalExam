////version 1
//(function ($) {
//    $.fn.reverseText = function (params) {
//        // merge default and user parameters
//        params = $.extend({ minlength: 0, maxlength: 99999 }, params);
//        return this.each(function () {
//            var originalText = $(this).text();
//            var newText = '';
//            if (originalText.length >= params.minlength && originalText.length <= params.maxlength) {
//                //reverse the text in originalText and place in newText
//                for (var i = originalText.length - 1; i >= params.minlength; i--) {
//                    newText += originalText.substr(i, 1);
//                }
//                $(this).text(newText);
//            }
//        });
//    };
//})(jQuery);

//version 2
(function ($) {
    
    $.fn.extend({
        reverseText : function (params) {
            // merge default and user parameters
            params = $.extend({ minlength: 0, maxlength: 99999 }, params);
            return this.each(function () {
                var originalText = $(this).text();
                var newText = '';
                if (originalText.length >= params.minlength && originalText.length <= params.maxlength) {
                    //reverse the text in originalText and place in newText
                    for (var i = originalText.length - 1; i >= params.minlength; i--) {
                        newText += originalText.substr(i, 1);
                    }
                    $(this).text(newText);
                }
            });
        }
    });

})(jQuery); 
