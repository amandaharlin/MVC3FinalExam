(function () {
    // Load plugin specific language pack
    //tinymce.PluginManager.requireLangPack('example');
    tinymce.create('tinymce.plugins.CHKMacroPlugin', {
        init: function (ed, url) {
            var self = this;
            self.editor = ed;
            self.url = url;
            function isChkFileNode(node) {
                return node && node.nodeName === 'span' && ed.dom.hasClass(node, 'macroFile');
            };

            ed.addCommand('chkFileCmd', function (fileList) {
                var v = "";
                $.each(fileList.files, function (index, value) {
                    v += "<span class=\'macroFile\'>[file:" + value.id + ":" + value.url + "]</span>&nbsp;<br/>";
                });
                $('#content').tinymce().execCommand('mceInsertContent', false, v); return false;
            });

            // Register commands
            ed.addCommand('chkFileDlgCmd', function () {
                var data, fileNode;
                fileNode = ed.selection.getNode();
                if (isChkFileNode(fileNode)) {
                    //if you need to verify the node
                }

                ed.windowManager.open({
                    file: url + '/dialog.htm',
                    width: 430 + parseInt(ed.getLang('media.delta_width', 0)),
                    height: 500 + parseInt(ed.getLang('media.delta_height', 0)),
                    inline: 1
                }, {
                    plugin_url: url,
                    data: data,
                    fileEditorCallback: self.editor.settings.chk_fileEditorCallback
                });
            });

            // Register buttons
            ed.addButton('chkfile', { title: 'GPlat File', cmd: 'chkFileDlgCmd', image: url + '/img/file.png' });

            ed.onNodeChange.add(function (ed, cm, n) {
                // does the current node carry class="macro"?
                while (n !== ed.getBody()
                    && (!n.className || !n.className.match(/macro/))
                ) {
                    n = n.parentNode; // no, try ancestor instead
                }

                // have we found something?
                if (n.className && n.className.match(/macro/)) {
                    // yes, try selecting it
                    try {
                        ed.selection.select(n);
                        ed.controlManager.get('myMacros').select(n.innerHTML);
                    } catch (e) { };
                }

                while (n !== ed.getBody()
                    && (!n.className || !n.className.match(/macroFile/))
                ) {
                    n = n.parentNode; // no, try ancestor instead
                }

                if (n.className && n.className.match(/macroFile/)) {
                    // yes, try selecting it
                    try {
                        cm.setActive('chkfile', n.className == 'macroFile');
                    } catch (e) { };
                }
                else {
                    ed.controlManager.get('chkfile').setActive(false);
                }
            });
            
        },
        createControl: function (n, cm) {
            switch (n) {
                case 'myMacros':
                    var mlb = cm.createListBox('myMacros', {
                        title: 'GPlat Macros',
                        onselect: function (v) {
                            $('#content').tinymce().execCommand('mceInsertContent', false, '<span class=\'macro\' style=\'background-color:#e3e3e3;\'>' + v + '</span>&nbsp;&nbsp;'); return false;
                        }
                    });
                    if (cm.editor.settings.chk_supported_macros && cm.editor.settings.chk_supported_macros != null) {
                        $.each(cm.editor.settings.chk_supported_macros.tags, function (index, value) {
                            mlb.add(value.tag, value.value);
                        });
                        // Add some values to the list box 
                        //mlb.add('[:WellName]', '[:WellName]');
                        //mlb.add('[:GPlatID]', '[:GPlatID]');
                        //mlb.add('[:ScottGastonPhone]', '[:ScottGastonPhone]');
                    }
                    // Return the new listbox instance 
                    return mlb;
            }
            return null;
        },
        /** 
        * Returns information about the plugin as a name/value array. 
        * The current keys are longname, author, authorurl, infourl and version. 
        * 
        * @return {Object} Name/value array containing information about the plugin. 
        */
        getInfo: function () {
            return {
                longname: 'Chesapeake Energy Corporation macro plugin',
                author: 'Darren Ford',
                authorurl: '',
                infourl: '',
                version: "1.0"
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('chkmacro', tinymce.plugins.CHKMacroPlugin);
})();