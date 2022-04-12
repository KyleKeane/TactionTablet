console.log("settings")
// const { app, getCurrentWindow } = require('@electron/remote');
// const path = require('path');

function resetTablet(){
  // TODO: send reset gcode to esp
  console.log("reset tablet")
  window.electron.send("toMain", "homescreen");
}

function uploadImage(){
  console.log("upload image");
  window.electron.send("toMain", "upload_image");
}
