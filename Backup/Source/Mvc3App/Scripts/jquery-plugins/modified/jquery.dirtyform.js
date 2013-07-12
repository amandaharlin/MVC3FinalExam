// Copyright 2009 Asa Wilson
// Available under both the GPL and MIT licenses, see license files for more details.

if (typeof jQuery == 'undefined') throw('jQuery could not be found.');

(function($) {
    $.extend({
        DirtyForm: {
            changedClass: 'changed',
            addClassOn: new Function,

            input_defaultValue: function(input) {
                if(input.is(':text,textarea')) {
                    result = input.attr('defaultValue');
                    if(result === undefined) result = '';
                    return result;
                }
                else if(input.is('select')) {
                    return input.data('defaultSelected');
                }
                else if(input.is(':radio,:checkbox')) {
                    result = input.attr('defaultChecked');
                    if(result === undefined) result = false;
                    return result;
                }                
                return null;
            },

            input_value: function(input) {
                if(input.is(':radio,:checkbox')) {
                    return typeof(input.attr('checked')) == 'undefined' ? false : input.attr('checked');
                } else {
                    return input.val();
                }
            },

            input_checker: function(event) {
                var npt = $(event.target),
                    initial = $.DirtyForm.input_defaultValue(npt),
                    current = $.DirtyForm.input_value(npt),
                    settings = event.data.settings

                if(initial != current) {
                    npt.add(settings.addClassOn.apply(npt))
                        .addClass(settings.changedClass);
                } else {
                    npt.add(settings.addClassOn.apply(npt))
                        .removeClass(settings.changedClass)
                }
            },

            reset_default: function(input) {
                var v = $.DirtyForm.input_value(input);
                if(input.is(':text,textarea')) {
                    input.attr('defaultValue', v);
                }
                else if(input.is('select')) {
                    input.data('defaultSelected', v);
                }
                else if(input.is(':radio,:checkbox')) {
                    input.attr('defaultChecked', v);
                }
                input.removeClass($.DirtyForm.changedClass);
            }
        }
    });

    $.fn.clear_dirty_check = function(){
            var defaults = {
                changedClass  : $.DirtyForm.changedClass,
                addClassOn    : $.DirtyForm.addClassOn
            };
            return this.each( function()
            { 
                // TODO: getInputs has a side-effect of resetting the default values for selects, should we flag method not to?
                var inputs = $._getInputs($(this));

                // unbind all DirtyForms specific events. 
                inputs.unbind("blur.dirty_form keyup.dirty_form");
                $('.' + $.DirtyForm.changedClass, $(this)).removeClass($.DirtyForm.changedClass);
            } 
        );
    };

    // will flag a form as dirty if something is changed on the form.
    $.fn.register_dirty = function(){
        var defaults = {
            changedClass  : $.DirtyForm.changedClass,
            addClassOn    : $.DirtyForm.addClassOn
        };

        var settings = $.extend(defaults, arguments.length != 0 ? arguments[0] : {});

        return this.each(function() {
            var form = $(this);

            var inputs = $._getInputs(form);
            // unbind all DirtyForms specific events. They will be readded later.
            inputs.unbind("blur.dirty_form keyup.dirty_form");
            
            //Remove any classes signaling a change has occurred
            $('.' + $.DirtyForm.changedClass, inputs).removeClass($.DirtyForm.changedClass);
            
            //Finally rebind all elements to change events.
            inputs.each(function() {
                $(this).bind("blur.dirty_form keyup.dirty_form, click.dirty_form", {settings: settings}, $.DirtyForm.input_checker);
            });

            $(window).bind('beforeunload', function () {
                if (form.are_dirty()) {
                    return 'You have changed form data without saving. All of your changes will be lost.\n\nAre you sure you want to continue?';
                }
            });
        });
    };

    $._getInputs = function(form) {
        return $.merge(
            $('select', form).each(function() { $.DirtyForm.reset_default($(this)); }),
            $.merge(
                form.find(':text'),
                $.merge(
                    form.find('textarea'), 
                    $.merge(form.find(':radio'), form.find(':checkbox'))
                )
            )
        );
    };

    // this is meant for selecting links that will warn about proceeding if there are any dirty forms on the page
    $.fn.dirty_stopper = function() {
        var defaults = {
            dialog : {
                title: "Warning: Unsaved Changes!",
                height: 300,
                width: 500,
                modal: true,
                resizeable: false,
                autoResize: false,
                overlay: {backgroundColor: "black", opacity: 0.5}
            },
            message : '<br/><p>You have changed form data without saving. All of your changes will be lost.</p><p>Are you sure you want to continue?</p>'
        };

        var settings = $.extend(true, defaults, arguments.length != 0 ? arguments[0] : {});

        return this.each(function() {
            var stopper = $(this);

            var scope = (settings.container) ? $(settings.container) : $(document);

            var tabs = stopper.parents('.ui-tabs-nav')
            if (tabs.length > 0) {
                tabs.find('a').unbind('.dirty_form');

                tabs.bind('tabsselect.dirty_form', function(event, ui) {
                    if(scope.are_dirty()) {
                        event.preventDefault();
                        var div = $("<div id='dirty_stopper_dialog'/>").appendTo(document.body).append(settings.message),
                            href = $(this).attr('href');
                        div.dialog($.extend(settings.dialog, {
                            buttons: {
                                Cancel: function() { $(this).dialog('destroy').remove(); },
                                Continue: function() {
                                    var selected_id = $(ui.tab).parent().siblings('.ui-tabs-selected').find('a').attr('href');
                                    // reset the form in the selected tab and make sure it cleans up after itself
                                    $('.dirtyform', selected_id).clean_form();

                                    // select the tab now that the old tab is clean
                                    tabs.tabs('select', $(ui.tab).attr('href'));

                                    // close the dialog with fire
                                    $(this).dialog('destroy').remove()
                                }
                            }
                        })).dialog("moveToTop");
                        return false;
                    }
                });
            } else {
                stopper.unbind('.dirty_form');
                stopper.bind('click.dirty_form', function(event) {
                    if(scope.are_dirty()) {
                        event.preventDefault();
                        var div = $("<div id='dirty_stopper_dialog'/>").appendTo(document.body).append(settings.message),
                            href = $(this).attr('href');
                        div.dialog($.extend(settings.dialog, { buttons: {
                            Cancel:function() { $(this).dialog('destroy').remove(); if(settings.oncancel) settings.oncancel(); },
                            Continue:function() { 
                                scope.find('.' + $.DirtyForm.changedClass).removeClass($.DirtyForm.changedClass);
                                if(settings.oncontinue) {
                                    $(this).dialog('destroy').remove();
                                    settings.oncontinue(stopper); 
                                } else {
                                    window.location = href;
                                }
                            }
                        }})).dialog("moveToTop");
                    } else {
                        if(settings.oncontinue) settings.oncontinue(stopper);
                    }
                });
            }
        });
    }

    // not chainable
    // returns false if any of input control has "changed" class on the page and checking is not suppressed
    $.fn.are_dirty = function () {
        return (this.find('.' + $.DirtyForm.changedClass + ':first').size() > 0);
    };

})(jQuery);
