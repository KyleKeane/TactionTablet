console.log("start app preloader")
const { contextBridge, ipcRenderer } = require("electron");
const { app, getCurrentWindow } = require('@electron/remote');
const path = require('path');
// const { remote } = require('electron');

contextBridge.exposeInMainWorld(
  'electron',
  {
    getCurrentWindow: () => getCurrentWindow(),
    // joinPath: (args1, args2, args3, args4, args5) => path.join(args1, args2, args3, args4, args5),
    getAppPath: () => app.getAppPath(),
    loadFile: () => loadFile(),
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ["toMain", "setGlobalPort", "getGlobalPort"];
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
