# TactionTablet

## Overview
This repository contains all the software for the newest (in-progress) iteration of the Taction Tablet. It is currently maintained by Ria Sonecha (rsonecha@mit.edu) as her UROP/MEng thesis work.

### Todos (as of 5/11/22)
1. Frontend image uploading -- currently a user can select an image from their computer to be tactified. However, the implementation for sending this filepath to the flask backend and waiting for a response is not done.
2. Backend image uploading/recieving -- currently there is a placeholder for this functionality but the implementation for receiving a put request with an filepath, opening that image, tactifiying it and sending the results back to the frontend is not done.
3. Frontend image preview -- we would like to give the user some sort of auditory preview of the image that is being tactified before it is sent to the Taction Tablet to be displayed.
4. Backend GCode conversion -- once the RGB image has been converted to a binarized tactile version it needs to be converted to GCode which can be used by the arduino driving the Taction Taction.
5. Serial communication with tablet -- there is currently some code for searching for the arduino device but it needs to be tested and then the code for serial communication with that device needs to be written/tested. This will be necessary for sending GCode from the backend to the device.
6. Driving tablet with GCode -- once the aurduino recieves the GCode from the backend and decodes it, it needs to use the GCode to drive the tablet actuators and push the correct pins.
7. There is additional functionality such as resetting the tablet and updating the tablet settings that will be easy to add on once the above tasks are completed.

## Previewing, Packaging, and Modifying the App
You will need to build the app using [Electron](https://electronjs.org/) and [Electron Forge](https://www.electronforge.io/), it is really not too bad I promise.

### Previewing App using Electron

1. Install [Node.js and the Node package manager NPM](https://www.npmjs.com/get-npm)
2. Install [Electron]() by running `npm install --save-dev electron`
3. You can then try to build an app with one of the following two options

#### Sample App
Following [Electron's first app documentation](https://electronjs.org/docs/tutorial/first-app)

#### Taction Tablet
Building TactionTablet by completing the following steps:

1. Download this repo
2. Terminal into the `TactionTablet/FrontEnd` directory inside the local copy
3. Install all dependencies by running `npm install`
   1. Consider bumping updates as needed with caution `npm update`
   2. Consider addressing vulnerabilities `npm audit fix`
4. Preview the app by running `npm start`

### Packaging the App using Electron Forge

1. Install [Electron Forge](https://www.electronforge.io/) by running `npm i -g @electron-forge/cli`
2. Terminal into your project directory
3. Create distributable by running `electron-forge make`
