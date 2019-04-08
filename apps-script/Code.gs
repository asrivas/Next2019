var url = 'https://<REGION>-<PROJECT>.cloudfunctions.net/startExport';

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Data Export')
      .addItem('Export data now', 'export')
      .addToUi();
}

function export() {
  UrlFetchApp.fetch(url);
}