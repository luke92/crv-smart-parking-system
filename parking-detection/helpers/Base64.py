from services.camaras import put_camaras_async, put_camaras_draw_async, put_camaras, put_camaras_draw
import threading
import cv2
import base64
from time import sleep

#Convert image to base64 string
def get_string_from_image_file(file):
    with open(file, "rb") as img_file:
        return base64.b64encode(img_file.read())
        
#Convert image from webcam to base64 string
def get_string_from_image_webcam():
    cap = cv2.VideoCapture(0)
    retval, image = cap.read()
    retval, buffer = cv2.imencode('.jpg', image)
    jpg_as_text = base64.b64encode(buffer)
    print(jpg_as_text)
    cap.release()

def update_frame_base64_to_api_async(update_frame,frame,camara_api,token,session):
    try:
        threading.Thread(target=update_frame_base64_to_api, args=(update_frame,frame,camara_api,token,session,)).start()
    except Exception as e: print(e)



def update_frame_base64_to_api(update_frame,frame,camara_api,token,session):
    try:
        if(update_frame):
            retval, buffer = cv2.imencode('.jpg', frame)
            data_base64 = base64.b64encode(buffer)  # encode to base64 (bytes)
            data_base64 = data_base64.decode()    # convert bytes to string
            #self.camara_video.release()
            new_camara = camara_api
            new_camara.lastFrameImageBase64 = 'data:image/jpeg;base64,' + data_base64
            camaras = []
            camaras.append(new_camara)
            put_camaras(camaras,token,session)
            update_frame = False
        else:
            update_frame = True
    except Exception as e: print(e)
    
def update_frame_draw_base64_to_api_async(frame,camara_api,token,session):
    try:
        threading.Thread(target=update_frame_draw_base64_to_api, args=(frame,camara_api,token,session,)).start()
    except Exception as e: print(e)

def update_frame_draw_base64_to_api(frame,camara_api,token,session):
    try:
        retval, buffer = cv2.imencode('.jpg', frame)
        data_base64 = base64.b64encode(buffer)  # encode to base64 (bytes)
        data_base64 = data_base64.decode()    # convert bytes to string
        #self.camara_video.release()
        new_camara = camara_api
        new_camara.lastFrameDrawImg64 = 'data:image/jpeg;base64,' + data_base64
        camaras = []
        camaras.append(new_camara)
        put_camaras_draw(camaras,token,session)
    except Exception as e: print(e)
    