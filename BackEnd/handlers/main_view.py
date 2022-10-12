from flask import render_template, redirect, request
import serial.tools.list_ports
import cv2
import numpy as np
import json

def main():
    return render_template("homescreen.html")

def handshake(arduino, sleep_time=1, print_handshake_message=False, handshake_code=0):
    """Make sure connection is established by sending
    and receiving bytes."""
    # Close and reopen
    arduino.close()
    arduino.open()

    # Chill out while everything gets set
    time.sleep(sleep_time)

    # Set a long timeout to complete handshake
    timeout = arduino.timeout
    arduino.timeout = 2

    # Read and discard everything that may be in the input buffer
    _ = arduino.read_all()

    # Send request to Arduino
    arduino.write(bytes([handshake_code]))

    # Read in what Arduino sent
    handshake_message = arduino.read_until()

    # Send and receive request again
    arduino.write(bytes([handshake_code]))
    handshake_message = arduino.read_until()

    # Print the handshake message, if desired
    if print_handshake_message:
        print("Handshake message: " + handshake_message.decode())

    # Reset the timeout
    arduino.timeout = timeout
    return handshake_message.decode()

def connect():
    arduino_found = False
    devices = list(serial.tools.list_ports.comports())
    ports = []
    for dev_info in devices:
        if ("Arduino" in dev_info.description): # this needs to be tested with our hardware
            ports.append(dev_info[0])
            arduino_found = True
    return {"port": 47} # use this line for testing without arduino
    if not arduino_found:
        return {"port": False}
    else:
        for port in ports:
            arduino = serial.Serial(port, baudrate=115200, timeout=1)
            handshake = handshake(arduino)
            if handshake == "This is a Taction Tablet.":
                return {"port": port}
    return {"port": False}

def get_image(request):
    photo = request.files['photo']
    in_memory_file = io.BytesIO()
    photo.save(in_memory_file)
    data = np.fromstring(in_memory_file.getvalue(), dtype=np.uint8)
    color_image_flag = 1
    img = cv2.imdecode(data, color_image_flag)
    return "image recieved"

def basic_tactification(img_path):
    img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    img_gray_small = cv2.resize(img, (60, 40))
    (thresh, img_bw_small) = cv2.threshold(img_gray_small, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    return img_bw_small

def convertImage(img_path, tactification_alg = None):
    if not tactification_alg:
        tactified_img = basic_tactification(img_path)
    new_path = img_path[:img_path.rindex('.')] + '_tactified' + img_path[img_path.rindex('.'):]
    cv2.imwrite(new_path, tactified_img)
    return {"original_path": img_path, "modified_path": new_path, "image_array": json.dumps(tactified_img.tolist())}

def reset_screen(request):
    port = request.args['port']
