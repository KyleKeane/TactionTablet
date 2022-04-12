console.log("start app preloader")
const { contextBridge, ipcRenderer } = require("electron");
const { app, getCurrentWindow } = require('@electron/remote');
const path = require('path');
// const { remote } = require('electron');

contextBridge.exposeInMainWorld(
  'electron',
  {
    getCurrentWindow: () => getCurrentWindow(),
    getAppPath: () => app.getAppPath(),
    loadFile: () => loadFile(),
    openDialog: (method, config) => ipcRenderer.invoke('dialog', method, config),
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ["toMain", "setGlobalPort", "getGlobalPort", "openFile"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ["fromMain", "getGlobalPort"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
  }
)


// let currWindow = remote.window.getFocusedWindow();
//
// window.closeCurrentWindow = function(){
//   currWindow.close();
// }
