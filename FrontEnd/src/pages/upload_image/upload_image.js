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
  window.electron.openDialog('showOpenDialogSync', dialogConfig).then(
    (file) => {
      console.log(file);
      if (file == undefined){
        imageFileElement = document.getElementById('image_button');
    		imageFileElement.innerHTML = 'Error, please try again';
      }
      if (!(file[0].endsWith('.jpg') || file[0].endsWith('.jpeg') || file[0].endsWith('.png'))){
        imageFileElement = document.getElementById('image_button');
    		imageFileElement.innerHTML = 'Error, please select an image file';
      }
      else{
        imageFileElement = document.getElementById('image_button');
    		imageFileElement.innerHTML = file[0];
        imageFileElement.disabled = true;

        alert("Please wait, your image is being converted.");
      }
    }
  );
}
