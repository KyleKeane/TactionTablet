console.log("upload image")

function uploadImage(image){
  console.log("getting image")
  console.log(image)
}

function loadImagePath(){
  console.log("requesting image path")
  // window.electron.send('open-file',{title: 'Title', defaultPath: localStorage.getItem('defaultPath')});
  const dialogConfig = {
    title: 'Select an image file',
    buttonLabel: 'Submit',
    properties: ['openFile']
  };
  window.electron.openDialog('showOpenDialogSync', dialogConfig).then((file) => console.log(file[0]));
}
