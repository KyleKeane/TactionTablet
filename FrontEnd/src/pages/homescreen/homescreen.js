console.log("homescreen")

async function getComPort(){
  console.log("start getComPort")
  var url = "http://127.0.0.1:5000/connect";
  console.log("sending get request to localhost/connect")
  var response = await fetch(url,
      {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
      }
  );
  var fromServer = await response.json();
  console.log({"fromServer": fromServer});
  console.log("end getComPort");
  return fromServer
}

function connectToTablet(){
  console.log("connecting to taction tablet");
  // TODO: add waiting/loading screen while connecting
  return Promise.all([getComPort()]).then(
    (values) => {
      data = values[0];
      port = data.port
      if (port){
        window.electron.send("setGlobalPort", port);
        window.electron.receive("getGlobalPort", (data) => {
          console.log(data);
        });
        window.electron.send("toMain", "settings");
      }
      else {
        // TODO: add error message
        window.electron.send("toMain", "homescreen");
      }
    }
  )
}
