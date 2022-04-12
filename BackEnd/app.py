from flask import Flask, request, jsonify, render_template
import numpy as np
import cv2
import time
import io
import json

import handlers.main_view

app = Flask(__name__)

@app.route('/', methods=['GET'])
def main_view():
    return handlers.main_view.main()

@app.route('/connect', methods=['GET'])
def connect():
    return handlers.main_view.connect()

@app.route('/upload', methods=['POST'])
def recieve_image():
    return handlers.main_view.get_image(request)

@app.route('/upload', methods=['GET'])
def upload_image():
    return handlers.main_view.upload_image()

@app.route('/reset', methods=['GET'])
def reset_screen():
    return handlers.main_view.reset_screen(request)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
