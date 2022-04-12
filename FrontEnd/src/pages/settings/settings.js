console.log("settings")

function resetTablet(){
  // TODO: send reset gcode to ESP
  console.log("reset tablet")
  window.electron.send("toMain", "homescreen");
}

function uploadImage(){
  console.log("upload image");
  window.electron.send("toMain", "upload_image");
}
