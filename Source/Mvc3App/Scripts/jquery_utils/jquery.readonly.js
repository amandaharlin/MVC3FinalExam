(function ($) {
    $.setReadOnly = function (selector, readOnly) {
        var s = $(selector);
        //var jqset = $(s).not(':image');
        var jqset = s;

        if ((typeof (readOnly) == 'undefined') || readOnly)
            return jqset.attr("disabled", true).addClass("readOnly");
        return jqset.removeAttr('disabled').removeClass("readOnly");
    };
})(jQuery);

