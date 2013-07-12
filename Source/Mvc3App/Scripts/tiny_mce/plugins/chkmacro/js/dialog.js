tinyMCEPopup.requireLangPack();

var ExampleDialog = {
    init: function () {
        var f = document.forms[0];

        // Get the selected contents as text and place it in the input
        f.someval.value = tinyMCEPopup.editor.selection.getContent({ format: 'text' });
        f.somearg.value = tinyMCEPopup.getWindowArg('fileEditorCallback');
    },

    insert: function () {
        // Insert the contents from the input into the document
        var tmp = JSON.parse(document.forms[0].somearg.value);
        var callbackData = ExampleDialog.buildElement(document.forms[0].somearg.value);
        //tinyMCEPopup.editor.execCommand('mceInsertContent', false, callbackData);
        tinyMCEPopup.editor.execCommand('chkFileCmd', callbackData);
        tinyMCEPopup.close();
    },
    buildElement: function (jsonString) {
        var tmp = JSON.parse(jsonString);
        return tmp;
    }
};

tinyMCEPopup.onInit.add(ExampleDialog.init, ExampleDialog);
