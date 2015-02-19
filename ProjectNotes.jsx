/*
ProjectNotes - Create notes for your After Effect projects
http://github.com/runegan/ProjectNotes/
Copyright (C) 2015  Rune Gangsø
http://runegang.so

  ProjectNotes is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  ProjectNotes is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

---
Icons made by Freepik from <http://www.flaticon.com> is licensed
under CC BY 3.0 <http://creativecommons.org/licenses/by/3.0/>
*/

(function ProjectNotes(thisObj) {

  // Globals
  var scriptVersion = "0.9";
  var pal;

  #include "ProjectNotes_icons.jsxinc";

  function projectNotes_buildUI(thisObj) {
    pal = (thisObj instanceof Panel) ? thisObj : new Window('palette', "ProjectNotes", undefined, {resizeable: true});

    if (pal !== null) {
      // Set up UI elements
      pal.grp = pal.add('group');
        pal.grp.orientation = 'column';
        pal.grp.alignment = ['fill', 'fill'];

       // Create Header
        pal.header = pal.grp.add('group');
          pal.header.alignment = ['fill', 'top'];
          pal.header.alignChildren = ['right', 'top'];
          pal.header.spacing = 0;

          // Create buttons
          pal.btn_createNew = pal.header.add('IconButton', [0,0,25,25], ProjectNotes_icons.btn_createNew, {style: 'toolbutton'});
            pal.btn_createNew.helpTip = "Create a new Note";
          pal.btn_save = pal.header.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_saveFile, {style: 'toolbutton'});
            pal.btn_save.helpTip = "Save current note as a file";
          pal.btn_refresh = pal.header.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_refresh, {style: 'toolbutton'});
            pal.btn_refresh.helpTip = "Reload notes";
          pal.btn_info = pal.header.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_info, {style: 'toolbutton'});
            pal.btn_info.helpTip = "Information about the panel";

        // Create noteArea
        pal.noteArea = pal.grp.add('edittext', undefined, undefined, {multiline:true});
          pal.noteArea.alignment = ['fill', 'fill'];
          pal.noteArea.minimumSize = [-1, 100];

        // Create Footer
        pal.footer = pal.grp.add('group');
          pal.footer.alignment = ['fill', 'bottom'];
          pal.footer.alignChildren = ['right', 'bottom'];
          pal.footer.spacing = 2;

          pal.selectNote = pal.footer.add('dropdownlist', undefined);
            pal.selectNote.alignment = ['fill', 'fill'];
            pal.selectNote.enabled = false;

          pal.btn_rename = pal.footer.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_rename, {style: 'toolbutton'});
            pal.btn_rename.helpTip = "Rename the current note";
            pal.btn_rename.enabled = false;
          pal.btn_delete = pal.footer.add('iconbutton', [0,0,25,25], ProjectNotes_icons.btn_delete, {style: 'toolbutton'});
            pal.btn_delete.helpTip = "Delete the current note";
            pal.btn_delete.enabled = false;

      // Set up layout
      pal.layout.layout(true);
      pal.size = [500, 500];
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
      pal.btn_createNew.onClick = function () {projectNotes_newNote()}
      pal.btn_save.onClick = function () {projectNotes_saveAsFile()}
      pal.btn_refresh.onClick = function () {projectNotes_getSaveComp(true)}
      pal.btn_info.onClick = function () {
        alert("ProjectNotes \n" +
          "Version " + scriptVersion +"\n" +
          "Copyright (c) 2015  Rune Gangsø\n" +
          "A panel for writing down notes or todos for the current project. "+
          "The script will create a comp where the notes are stored.\n" +
          "\n" +
          "Features:\n" +
          "- Multiple notes.\n" +
          "- Exporting notes to disk.\n" +
          "- Renaming and deleting notes.\n" +
          "\n" +
          "Have some feedback or a suggestion?\n" +
          "Send an email to projectnotes@runegang.so\n" +
          "or send \n" +
          "\n" +
          "\n" +
          "Legal:\n" +
          "ProjectNotes is free software: you can redistribute it and/or modify " +
          "it under the terms of the GNU General Public License as published by " +
          "the Free Software Foundation, either version 3 of the License, or " +
          "(at your option) any later version.\n" +
          "\n" +
          "ProjectNotes is distributed in the hope that it will be useful, " +
          "but WITHOUT ANY WARRANTY; without even the implied warranty of " +
          "MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the " +
          "GNU General Public License for more details.\n" +
          "\n" +
          "You should have received a copy of the GNU General Public License " +
          "along with this program.  If not, see http://www.gnu.org/licenses/.\n" +
          "\n" +
          "Icons made by Freepik from http://www.flaticon.com is licensed " +
          "under CC BY 3.0 http://creativecommons.org/licenses/by/3.0/");
      }

      pal.noteArea.onChanging = function () {pal.saveLayer.property('Source Text').setValue(this.text)};

      pal.selectNote.onChange = function () {projectNotes_changeNote()}
      pal.btn_delete.onClick = function () {projectNotes_deleteNote()}
      pal.btn_rename.onClick = function () {projectNotes_renameNote()}

      // Hitting tab shifts the focus by default
      // Remove default event and inserts a tab in the noteArea
      pal.noteArea.addEventListener('keydown', function(event) {
        if (event.keyName == 'Tab') {
          event.preventDefault();
          pal.noteArea.textselection = '\t';
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
        pal.selectNote.removeAll();

        // Add all text layers in saveComp to the dropdownlist
        for (i = 1; i <= pal.saveComp.numLayers; i++) {
          if (pal.saveComp.layer(i) instanceof TextLayer) {
            pal.selectNote.add('item', pal.saveComp.layer(i).name);
            foundSaveLayer = true;
          }
        }

        // Set saveLayer to last item of savecomp
        pal.saveLayer = pal.saveComp.layer(pal.saveComp.numLayers);
        pal.noteArea.text = pal.saveLayer.property('Source Text').value;

        // Enable the button that require more than one note
        // Set the dropdownlist to the latest note
        // Change the text field to the correct note
        if (pal.selectNote.items.length > 1) {
          projectNotes_multiNotes(true);
          pal.selectNote.selection = pal.selectNote.length-1;
          projectNotes_changeNote();
        }
      }

      // Create the save layer if none is found
      if (! foundSaveLayer) {
        pal.saveLayer = pal.saveComp.layers.addText();
        pal.saveLayer.name = "ProjectNotes save";
        pal.selectNote.add('item', pal.saveLayer.name);
      }
    }
  }

  function projectNotes_changeNote() {
    // Get selected note text from comp and update noteArea
    pal.saveLayer = pal.saveComp.layer(pal.selectNote.selection.text);
    pal.noteArea.text = pal.saveLayer.property('Source Text').value;
  }

  function projectNotes_deleteNote () {
    var currentNote = pal.selectNote.selection;
    var confirmation = confirm('Do you want to delete: "'+currentNote.text+'"?', false);

    if (confirmation == true) {

      if (currentNote.index-1 != -1) {
        pal.selectNote.selection = currentNote.index-1;
      }else{
        pal.selectNote.selection = currentNote.index+1;
      }
      projectNotes_changeNote();

      if (pal.selectNote.items.length-1 == 1) {
        projectNotes_multiNotes(false);
        pal.selectNote.selection = 0;
      }
      pal.saveComp.layer(currentNote.text).remove();
      pal.selectNote.remove(currentNote.index);
    }
  }


  function projectNotes_renameNote(oldName, newName) {
    // Set default values
    if (typeof oldName === 'undefined') oldName = pal.selectNote.selection.text;
    if (typeof newName === 'undefined') newName = projectNotes_saveNoteDialog('Rename "'+oldName+'" to');

    // rename in dropdown and comp based on index of layer in comp
    if (newName != false) {
      var noteIndex = pal.saveComp.layer(oldName).index;
      pal.selectNote.items[noteIndex-1].text = newName;
      pal.saveComp.layer(oldName).name = newName;
    }
  }

  function projectNotes_newNote () {
    var selectNote = pal.selectNote;

    var canceled = false;

    // If only one note: change name of the first layer of the save comp.
    if (selectNote.items.length === 1) {
      var saveAs = projectNotes_saveNoteDialog("Save current Note as:");

      if (saveAs != false) {
        projectNotes_renameNote(1, saveAs);
      }else{
        canceled = true;
      }
    }

    if (!canceled) {
      var saveAs = projectNotes_saveNoteDialog("Save new Note as:");

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
    if (typeof dialogText === 'undefined') { dialogText = "Save new Note as:"; }

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
      for (i = 0; i <= pal.selectNote.items.length; i++) {
        if (pal.selectNote.items[i].text === saveAsText) {
          duplicate = true;
          break;
        }
      }

      if (duplicate) {
        alert("There is already a note with that name.");
      }else{
        savePal.close();
      }
    }

    savePal.show();
    return saveAsText;
  }

  function projectNotes_multiNotes (TrueFalse) {
    pal.selectNote.enabled = TrueFalse;
    pal.btn_rename.enabled = TrueFalse;
    pal.btn_delete.enabled = TrueFalse;
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
