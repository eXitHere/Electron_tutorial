const {app, BrowserWindow} = require('electron');
const ipc = require('electron').ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('./index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if(BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

ipc.on('synchronous-message', (event, arg) => {
    console.log("message in main.js", arg);
    event.returnValue = "pong";
})