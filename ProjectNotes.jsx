(function ProjectNotes(thisObj) {

  // Globals
  var scriptVersion = '0.7.2'
  var pal;

  function projectNotes_buildUI(thisObj) {
    pal = (thisObj instanceof Panel) ? thisObj : new Window('palette', "ProjectNotes", undefined, {resizeable: true});

    if (pal !== null) {
      // Set up UI elements
      var res = "group { \
        orientation: 'column', \
        alignment: ['fill','fill'], \
        header: Group { \
          spacing: 0, \
          alignment: ['fill','top'], \
          alignChildren: ['right', 'top'], \
          title: StaticText {text:'ProjectNotes', alignment:['fill','center'], size: [150, 30]}, \
          createNewButton: IconButton { text:'Crete New', image:'icons/btn_createNew.png', minimumSize:[30,25], properties: {style: 'toolbutton'} }, \
          saveButton: IconButton {text:'Save as File', image:'icons/btn_saveFile.png', minimumSize:[30,25], properties: {style: 'toolbutton'}}, \
          refreshButton: IconButton {text: 'Refresh', image:'icons/btn_refresh.png', minimumSize:[30,25], properties: {style: 'toolbutton'}}, \
          helpButton: IconButton {text:'i', image:'icons/btn_info.png', minimumSize:[30,25], properties: {style: 'toolbutton'}} \
        }, \
        noteArea: EditText { \
          text:'', \
          properties:{'multiline':true}, \
          alignment:['fill','fill'], \
          minimumSize:[-1,100] \
        }, \
        footer: Group { \
          alignment: ['fill','bottom'], \
          spacing: 2, \
          selectNote: DropDownList { \
            enabled:false, alignment:['fill','bottom'],\
            characters: 40, minimumSize:[-1, 26]}, \
          renameButton: IconButton { text:'Rename', enabled:false, alignment:['right','bottom'], image:'icons/btn_rename.png', minimumSize:[30,25], properties: {style: 'toolbutton'}}, \
          deleteButton: IconButton {text:'Delete', enabled:false, alignment:['right','bottom'], image:'icons/btn_delete.png', minimumSize:[30,25], properties: {style: 'toolbutton'}} \
        } \
      }";
      pal.grp = pal.add(res);

      // Set up layout
      pal.layout.layout(true);
      pal.layout.resize();
      pal.onResizing = pal.onResize = function () {this.layout.resize(); }

      projectNotes_getSaveComp();

      // Check for save comp when clicking in the window
      // Remove eventhandler so it only check the first time
      function onFirstActivate() {
        projectNotes_getSaveComp(true);
        pal.removeEventListener('focus', onFirstActivate);  
      }
      pal.addEventListener('focus', onFirstActivate);

      // Event Handlers
      pal.grp.header.createNewButton.onClick = function () {projectNotes_newNote()}
      pal.grp.header.saveButton.onClick = function () {projectNotes_saveAsFile()}
      pal.grp.header.refreshButton.onClick = function () {projectNotes_getSaveComp(true)}
      pal.grp.header.helpButton.onClick = function () {
        alert("ProjectNotes \n" +
          "Version " + scriptVersion +"\n" +
          "\n" +
          "To be written. \n" +
          "\n" +
          "Have some feedback or a suggestion? \n" +
          "Send an email to projectnotes@runegang.so");
      }

      pal.grp.noteArea.onChanging = function () {pal.saveLayer.property('Source Text').setValue(this.text)};

      pal.grp.footer.selectNote.onChange = function () {projectNotes_changeNote()}
      pal.grp.footer.deleteButton.onClick = function () {projectNotes_deleteNote()}
      pal.grp.footer.renameButton.onClick = function () {projectNotes_renameNote()}

      // Hitting tab shifts the focus by default
      // Remove default event and inserts a tab in the noteArea
      pal.grp.noteArea.addEventListener('keydown', function(event) {
        if (event.keyName == 'Tab') {
          event.preventDefault();
          pal.grp.noteArea.textselection = '\t';
        }
      });
    }
    return pal;
  }


  // Event Handler Functions
  function projectNotes_getSaveComp (createComp) {
    // Set deafult
    if (typeof createComp === 'undefined') createComp = false;

    //createComp true forces the script to create comp in empty projects
    if (app.project.numItems > 0 || createComp == true) {
      // Find the saveComp
      // Loop trough all items and check if it is a comp with the correct name

      var foundSaveComp = false;
      for (i = 1; i <= app.project.numItems; i++) {
        if (app.project.item(i).name == "ProjectNotes" && app.project.item(i) instanceof CompItem) {
          pal.saveComp = app.project.item(i);
          foundSaveComp = true;
          break;
        }
      }
      //  Create Comp if none found
      if (! foundSaveComp ) {
        pal.saveComp = app.project.items.addComp("ProjectNotes", 500,700,1,1,25);
      }


      // Find the saveLayer
      var foundSaveLayer = false;
      if (pal.saveComp.numLayers > 0) {
        // Remove all items in dropdown
        pal.grp.footer.selectNote.removeAll();
        
        // Add all text layers in saveComp to the dropdownlist
        for (i = 1; i <= pal.saveComp.numLayers; i++) {
          if (pal.saveComp.layer(i) instanceof TextLayer) {
            pal.grp.footer.selectNote.add('item', pal.saveComp.layer(i).name);
            foundSaveLayer = true;
          }
        }

        // Set saveLayer to last item of savecomp
        pal.saveLayer = pal.saveComp.layer(pal.saveComp.numLayers);
        pal.grp.noteArea.text = pal.saveLayer.property('Source Text').value;

        // Enable the button that require more than one note
        // Set the dropdownlist to the latest note
        // Change the text field to the correct note
        if (pal.grp.footer.selectNote.items.length > 1) {
          projectNotes_multiNotes(true);
          pal.grp.footer.selectNote.selection = pal.grp.footer.selectNote.length-1;
          projectNotes_changeNote();
        }
      }

      // Create the save layer if none is found
      if (! foundSaveLayer) {
        pal.saveLayer = pal.saveComp.layers.addText();
        pal.saveLayer.name = 'ProjectNotes save';
        pal.grp.footer.selectNote.add('item', pal.saveLayer.name);
      }
    }
  }

  function projectNotes_changeNote() {
    // Get selected note text from comp and update noteArea
    pal.saveLayer = pal.saveComp.layer(pal.grp.footer.selectNote.selection.text);
    pal.grp.noteArea.text = pal.saveLayer.property('Source Text').value;
  }

  function projectNotes_deleteNote () {
    var currentNote = pal.grp.footer.selectNote.selection;
    var confirmation = confirm('Do you want to delete: "'+currentNote.text+'"?', false);

    if (confirmation == true) {

      if (currentNote.index-1 != -1) {
        pal.grp.footer.selectNote.selection = currentNote.index-1;
      }else{
        pal.grp.footer.selectNote.selection = currentNote.index+1;
      }
      projectNotes_changeNote();

      if (pal.grp.footer.selectNote.items.length-1 == 1) {
        projectNotes_multiNotes(false);
        pal.grp.footer.selectNote.selection = 0;
      }
      pal.saveComp.layer(currentNote.text).remove();
      pal.grp.footer.selectNote.remove(currentNote.index);
    }
  }


  function projectNotes_renameNote(oldName, newName) {
    // Set default values
    if (typeof oldName === 'undefined') oldName = pal.grp.footer.selectNote.selection.text;
    if (typeof newName === 'undefined') newName = projectNotes_saveNoteDialog('Rename "'+oldName+'" to');

    // rename in dropdown and comp based on index of layer in comp
    if (newName != false) {
      var noteIndex = pal.saveComp.layer(oldName).index;
      pal.grp.footer.selectNote.items[noteIndex-1].text = newName;
      pal.saveComp.layer(oldName).name = newName;
    }
  }

  function projectNotes_newNote () {
    var selectNote = pal.grp.footer.selectNote;

    var canceled = false;

    // If only one note: change name of the first layer of the save comp.   
    if (selectNote.items.length === 1) {
      var saveAs = projectNotes_saveNoteDialog('Save current Note as:');
      
      if (saveAs != false) {
        projectNotes_renameNote(1, saveAs);
      }else{
        canceled = true;
      }
    }

    if (!canceled) {
      var saveAs = projectNotes_saveNoteDialog('Save new Note as:');

      if (saveAs != false) {
        // Add text comp
        pal.saveLayer = pal.saveComp.layers.addText();
        pal.saveLayer.name = saveAs;
        pal.saveLayer.moveToEnd(); // To get the equal indexes in the comp and dropdown

        // Update selectNote
        selectNote.add('item', saveAs);
        selectNote.selection = selectNote.items.length-1;
        projectNotes_changeNote();

        // Enable buttons that only function if there is multiple notes
        // Runs only when creating the second note
        if (selectNote.items.length == 2) {
          projectNotes_multiNotes(true);
        }
      }
    }
  }

  function projectNotes_saveAsFile() {
    // Check if script is allowed to write to system; Alert if not.
    var securitySetting = app.preferences.getPrefAsLong('Main Pref Section', 'Pref_SCRIPTING_FILE_NETWORK_SECURITY');
    if (securitySetting != 1) {
      alert('You need to check "Allow Scripts to Write Files and Access Network" in your preferences to save your note as a file.');
    }

    else {
      // Open system save dialog
      var saveFile = File.saveDialog();

      if (saveFile != null) {
        // Open file in write mode
        saveFile.open('w');

        // Check if filename ends with .txt. If not: add extension
        // If no extension: add extension.
        fileName = saveFile.name.split('.');
        if (fileName.length == 1 || fileName[fileName.length-1] != 'txt') {
          saveFile.rename(saveFile.name + '.txt');
        }

        // write to file
        saveFile.write(noteArea.text);
        saveFile.close();
      }
    }
  }


  //Extra functions
  function projectNotes_saveNoteDialog (dialogText) {
    // Set default text
    if (typeof dialogText === 'undefined') { dialogText = 'Save new Note as:'; }

    var savePal = new Window('dialog', 'Save Note')     

    var res =
    "group { \
      orientation: 'column', \
      alignment: 'left', \
      alignChildren: 'left', \
      st: StaticText {text:'"+ dialogText +":'}, \
      saveAs: EditText {text:'', characters: 30}, \
      buttons: Group { \
        orientation: 'row', \
        alignment: ['center', 'fill'], \
        cancel: Button {text: 'Cancel', properties: {name: 'Cancel'}}, \
        ok: Button {text: 'OK', enabled: false, properties: {name: 'OK'}} \
      } \
    }";

    savePal.grp = savePal.add(res)

    savePal.grp.saveAs.onChanging = function() {
      // Enable OK button if not empty
      if (this.text.length == 0){
        savePal.grp.buttons.ok.enabled = false;
      }else{
        savePal.grp.buttons.ok.enabled = true;
      }
    }

    savePal.grp.buttons.cancel.onClick = function() {
      // The function will return false to check if the function was canceled
      saveAsText = false;
      savePal.close();
    }

    savePal.grp.buttons.ok.onClick = function() {
      saveAsText = savePal.grp.saveAs.text;

      // Check if a note has the same name as the input name
      var duplicate = false;          
      for (i = 0; i <= pal.grp.footer.selectNote.items.length; i++) {
        if (pal.grp.footer.selectNote.items[i].text === saveAsText) {
          duplicate = true;
          break;
        }
      }

      if (duplicate) {
        alert('There is already a note with that name.');
      }else{
        savePal.close();
      }
    }

    savePal.show();
    return saveAsText;
  }

  function projectNotes_multiNotes (TrueFalse) {
    pal.grp.footer.selectNote.enabled = TrueFalse;
    pal.grp.footer.renameButton.enabled = TrueFalse;
    pal.grp.footer.deleteButton.enabled = TrueFalse;
  }


  // Show panel
  rgpnPal = projectNotes_buildUI(thisObj);

  if (rgpnPal !== null) {

    if ( rgpnPal instanceof Window ) {

      // Show the palette
      rgpnPal.center();
      rgpnPal.show();
    }
    else {
        rgpnPal.layout.layout(true);
    }
  }
})(this);
