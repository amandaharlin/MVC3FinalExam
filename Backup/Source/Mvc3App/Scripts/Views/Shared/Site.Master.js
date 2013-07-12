
$(document).ready(function () {
    $('.header:empty').remove();

    $('#main:has(ul#tabs)').tabs({ show: function (event, ui) { $(ui.tab.hash).trigger('tabSelected'); } });

    var outerlayout = $('#outer-layout').layout({
        center__paneSelector: '#inner-layout',
        north__closable: false,
        north__resizable: false,
        north__spacing_open: 0,
        south__closable: false,
        south__resizable: false,
        south__size: 14,
        south__spacing_open: 0,
        west__closable: true,
        west__minSize: 10,
        west__maxSize: 0,
        west__resizable: true,

        east__closable: true,
        east__minSize: 10,
        east__maxSize: 0,
        east__resizable: true,

        center__onresize: function () { innerlayout.resizeAll() }
    });

    var innerlayout = $('#inner-layout').layout({
        east__initHidden: true,
        west__initHidden: true,
        south__initHidden: true,
        north__initHidden: true,
        north__minSize: 10,
        north__maxSize: 0,
        north__resizable: true,
        north__size: 78
    });

    $.setupFeedbackPanel(innerlayout, 'north');

    $('.ui-collapsible').collapsible();
    $('.ui-collapsible.collapsed').collapsible('option', 'collapsed', true);

    $('.button-bar button').each(function (i, e) {
        if ($(e).hasClass('ui-multiselect')) return;
        var img = $('img', e).remove();
        if (img.length > 0)
            $(e).css('background-image', 'url(' + img.attr('src') + ')').css('padding-left', '18px');
        $(e).button();
    });

    setTimeout(function () { $(document).trigger('init.layout'); }, 100);

//    $.setReadOnly($('.enabedOnLock'), true);
//    $.setReadOnly($('.enabedOnLock'), true);
});
