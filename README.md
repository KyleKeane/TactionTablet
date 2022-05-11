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
