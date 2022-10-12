console.log("upload image")

// function uploadImage(image){
//   console.log("getting image")
//   console.log(image)
// }

async function convertImage(data){
  console.log("start convertImage")
  var url = "http://127.0.0.1:5000/convertImage";
  console.log("sending post request to localhost/convertImage")
  var response = await fetch(url,
      {
        method: 'POST',
        headers: {
            'Content-Type': 'text/json'
        },
        body: JSON.stringify(data)
      }
  );
  var fromServer = await response.json();
  console.log({"fromServer": fromServer});
  console.log("end convertImage");
  return fromServer
}

function display_image(src, width, height, alt) {
    document.clear()
    var a = document.createElement("img");
    a.src = src;
    a.width = width;
    a.height = height;
    a.alt = alt;
    document.body.appendChild(a);
}

function loadImagePath(){
  console.log("requesting image path")
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
    		imageFileElement.innerHTML = 'Error, please try again.';
      }
      if (!(file[0].endsWith('.jpg') || file[0].endsWith('.jpeg') || file[0].endsWith('.png'))){
        imageFileElement = document.getElementById('image_button');
    		imageFileElement.innerHTML = 'Error, please select an image file (.jpg, .jpeg, or .png).';
      }
      else{
        imageFileElement = document.getElementById('image_button');
    		imageFileElement.innerHTML = file[0];
        imageFileElement.disabled = true;

        alert("Please wait, your image is being converted.");
        let data = {"imagePath": file[0]};
        return Promise.all([convertImage(data)]).then(
          (values) => {
            data = values[0];
            modified_path = data.modified_path;
            console.log(data);
            display_image(modified_path, 60, 60, 'Tactified Image Preview')
          }
        )
      }
    }
  );
}
