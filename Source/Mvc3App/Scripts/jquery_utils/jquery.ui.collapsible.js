(function ($) {

    $.widget("ui.collapsible", {
        options: {
            titleClass: "ui-state-default",
            contentClass: "ui-widget-content",
            collapsed: false
        },

        _create: function () {
            var self = this,
                el = self.element,
                o = self.options,
                title = $('.ui-collapsible-title', el),
                content = $('.ui-collapsible-content', el);

            title.addClass(o.titleClass);
            content.addClass(o.contentClass);

            $('<div id="icon" />').addClass('ui-icon ui-icon-triangle-1-s').css('float', 'right').prependTo(title);

            title.hover(function () { $(this).toggleClass('ui-state-hover'); });
            title.click(function () {
                o.collapsed = !o.collapsed;
                self._renderContent(true);
            });
            self._renderContent(false);
        },

        _renderContent: function(animate) {
            var title = $('.ui-collapsible-title', this.element),
                content = $('.ui-collapsible-content', this.element),
                o = this.options,
                action = (o.collapsed) ? 'hide' : 'show',
                a = 'ui-icon-triangle-1-' + ((o.collapsed) ? 'w' : 's'),
                r = 'ui-icon-triangle-1-' + ((o.collapsed) ? 's' : 'w');

            $('#icon', title).addClass(a).removeClass(r);
            if(animate)
                content[action]('slide', { direction: 'up' }, 250);
            else
                content[action]();
        },

        destroy: function () {
            var el = this.element,
                o = this.options,
                title = $('.ui-collapsible-title', el),
                content = $('.ui-collapsible-content', el);

            title.removeClass(o.titleClass);
            content.removeClass(o.contentClass);

            title.remove('#icon');
            title.unbind('click').unbind('mouseenter').unbind('mouseleave');
        },

        _setOption: function (option, value) {
            var el = this.element,
                o = this.options;

            if ((option == 'titleClass') && (o.titleClass != value)) {
                $('.ui-collapsible-title', el).addClass(value);
            } else if ((option == 'contentClass') && (o.contentClass != value)) {
                $('.ui-collapsible-content', el).addClass(value);
            }
            else if ((option == 'collapsed') && (o.collapsed != value)) {
                o.collapsed = value;
                this._renderContent(false);
            }
            // Call the base class setOption method to update the option
            $.Widget.prototype._setOption.apply(this, arguments);
        }
    });

})(jQuery); 