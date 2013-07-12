(function ($) {

    $._layout = null;
    $._feedbackPane = 'north';
    $._progressIndicator = null;

    $.setupFeedbackPanel = function (layout, panel) {
        $._layout = layout;
        $._feedbackPane = panel;
    };

    $.showProgress = function (message, modal) {
        if ($._progressIndicator == null) {
            $._progressIndicator = $("<div/>")
                .appendTo('body')
                .dialog({
                    autoOpen: false,
                    dialogClass: 'progress',
                    draggable: false,
                    height: 'auto',
                    minHeight: 20,
                    resizable: false,
                    width: 350
                })
                .append('<img src="/Content/Images/progress-indicator.gif" alt=""/><span class="progress-message"/>');
        }

        var m = ((typeof modal === 'undefined') || modal);
        var t = ((typeof message === 'undefined') || (message == null) || (message.length == 0))
            ? 'Waiting on response from server...' : message;

        $('.progress-message', $._progressIndicator).text(t);

        $._progressIndicator
            .dialog('option', 'modal', m)
            .dialog('option', 'position', m ? 'center' : ['right', 'bottom'])
            .dialog('open');
    };

    $.hideProgress = function () {
        $._progressIndicator.dialog('close');
    };

    $.clearFeedBack = function (hide) {
        if ((typeof hide === 'undefined') || hide) $.hideFeedBack();
        $._getMessageList().empty();
    };

    $.hideFeedBack = function () {
        if ($._layout == null) return;
        return $._layout.hide($._feedbackPane);
    };

    $.showFeedBack = function (r, clear) {
        if ($._layout == null) return;
        var l = $._getMessageList();

        if (typeof r === "undefined") {
            $._layout.show($._feedbackPane);
        } else if ($._isValidResponse(r)) {
            l = $._getMessageList();

            if (!(r instanceof Array))
                r = [r];

            if ((typeof (clear) != 'undefined') && !clear) {
                $('li', l).each(function (i, el) {
                    var e = $(el);
                    var status = (e.hasClass('ui-state-error'))
                        ? 'error'
                        : (e.hasClass('ui-state-warning')) ? 'warning' : 'success';
                    r.push({ "status": status, "message": e.text() });
                });
            }
            l.empty();

            if (r.length > 1) {
                r.sort(function (a, b) {
                    var x = (a.status == "error" || a.status == -1) ? -1 : (a.status == "warning" || a.status == 1) ? 0 : 1;
                    var y = (b.status == "error" || b.status == -1) ? -1 : (b.status == "warning" || b.status == 1) ? 0 : 1;
                    return x - y;
                });
            }

            for (var i = 0; i < r.length; i++) {
                var status = r[i].status;
                if (status == -1) status = 'error'; else if (status == 0) status = 'success'; else if (status == 1) status = 'warning';
                l.append('<li class="ui-state-' + status + ' ui-corner-all">' + r[i].message + '</li>');
            }

            $._layout.show($._feedbackPane);

            setTimeout(function () {
                l.find('li.ui-state-success').fadeOut('slow', function () {
                    if ((l.find('li').length == 0) && $('#validationErrors').is(':hidden'))
                        $.hideFeedBack();
                }).remove();
            }, 15000);
        }
        return l;
    };

    $.showFeedBackItem = function (s, m, c) {
        return $.showFeedBack({ "status": s, "message": m }, c);
    };

    $.showExceptionFeedBack = function (response, status, clear) {
        if (typeof (status) === "undefined")
            status = "error";

        try {
            var err = $.parseJSON(response.responseText);
            $.showFeedBackItem(status, err.Message, clear);
        } catch (ex) {
            $.showFeedBackItem(status, response.responseText, clear);
        }
    };

    $._getMessageList = function () {
        return $('#feedback', ($._layout) ? $._layout.panes[$._feedbackPane] : null);
    };

    $._isValidResponse = function (r) {
        if (!(r instanceof Array)) r = [r];
        for (var i = 0; i < r.length; i++)
            if ((typeof r[i].status === 'undefined') || (typeof r[i].message === 'undefined'))
                return false;

        return (r.length > 0);
    };

    // NOTE: Overriding the default behavior of the jQuery ajax method. Note that this override just adds extension
    //       options for controls aspects of user feedback.  

    $._jqueryajax = $.ajax;
    $.ajax = function (options) {
        ///<summary>Perform an asynchronous HTTP (Ajax) request.</summary>
        ///<param>options -- includes all options from core jQuery.ajax() method as well as the following:
        ///  showProgressIndicator -- if true, the progress indicator displays during the ajax call. Defaults to true
        ///  useModalProgress -- if true, the progress indicator appears as a modal dialog. Defaults to true
        ///  handleResponse -- if true, the response will be handled. Defaults to true
        ///</param>
        ///<returns>XMLHttpRequest</returns>

        if ((typeof options === "undefined") || (options == null)) {
            options = {};
        }


        if ((typeof options.showProgressIndicator === "undefined") || options.showProgressIndicator) {
            if (options.beforeSend) var b = options.beforeSend;
            options.beforeSend = function (x) {
                $.showProgress(options.message, options.useModalProgress);
                if (b) b(x);
            };

            if (options.complete) var c = options.complete;
            options.complete = function (x, s) {
                $.hideProgress();
                if (c) c(x, s);
            };
        }

        if ((typeof options.handleResponse === "undefined") || options.handleResponse) {
            if (options.success) var s = options.success;
            options.success = function (d, t, x) {
                $.showFeedBack((typeof d.feedback === "undefined") ? [] : d.feedback);
                if (s) s(d, t, x);
            }

            if (options.error) var e = options.error;
            options.error = function (x, s, et) {
                $.showExceptionFeedBack(x);
                if (e) e(x, s, et);
            };
        }

        return $._jqueryajax(options);
    };

    $.fn.addTooltip = function (text) {
        if ($.browser.msie) {
            var version = parseFloat($.browser.version);
            if (version < 8.0)
                return this._addQtip(text);
        }
        return this._addTitle(text);
    };

    $.fn._addQtip = function (text) {
        return this.each(function () {
            var e = $(this);
            var tt = e.parent('.tt');

            if (typeof text === 'undefined' || text.length == 0) {
                text = e.attr('title');
                e.removeAttr('title');
            }

            if (tt.length == 0) {
                if (text && text.length > 0) {
                    tt = $("<div class='tt'/>").insertBefore(e).append(e);
                }
            } else {
                tt.qtip('destroy');
            }

            // NOTE: would prefer to just update the text, but cannot get QTip api updateContent calls to work.
            if (text && text.length > 0) {
                tt.qtip({ content: text });
            }
        });
    };

    $.fn._addTitle = function (text) {
        return this.each(function () {
            var e = $(this);
            e.attr('title', text);
        });
    };

    $.launchEmail = function (recipients, subject, body) {
        var mailto_link = 'mailto:' + recipients + '?';

        if (subject != null && subject.length > 0)
            mailto_link += 'subject=' + subject + '&';

        if (body != null && body.length > 0)
            mailto_link += 'body=' + body;

        window.open(mailto_link, 'emailWindow');
    };

})(jQuery);

