const { app, BrowserWindow, getCurrentWindow, ipcMain, Menu } = require('electron')
const path = require('path');

require('@electron/remote/main').initialize()
let win;
let routes = {
  'settings': path.join(app.getAppPath(), 'src', 'pages', 'settings', 'settings.html'),
  'homescreen': path.join(app.getAppPath(), 'src', 'pages', 'homescreen', 'homescreen.html'),
  'upload_image': path.join(app.getAppPath(), 'src', 'pages', 'upload_image', 'upload_image.html')
}
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: true,  // <== important
      preload: path.join(app.getAppPath(), 'static', 'app-preloader.js')
    }
  })
  require("@electron/remote/main").enable(win.webContents);
  var python = require('child_process').spawn('python3', ['../BackEnd/app.py']);
  python.stdout.on('data', function (data) {
   console.log("data: ", data.toString('utf8'));
  });
  python.stderr.on('data', (data) => {
   console.log(`stderr: ${data}`); // when error
  });

  win.loadFile('./src/pages/homescreen/homescreen.html')

  // win.webContents.openDevTools();

  menu = require(path.join(app.getAppPath(), "src", "scripts", "makeMenu.js"));
  Menu.setApplicationMenu(menu.makeMenu());
}

ipcMain.on("toMain", (event, args) => {
  win.loadFile(routes[args]);
});

ipcMain.on("setGlobalPort", (event, port) => {
  global.tabletPort = port;
});

ipcMain.on("getGlobalPort", (event, args) => {
  win.webContents.send("getGlobalPort", global.tabletPort);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  // TODO: make sure flask server is also killed
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
