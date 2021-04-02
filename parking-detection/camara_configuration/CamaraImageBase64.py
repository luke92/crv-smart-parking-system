from services.camaras import put_camaras
import threading
import cv2
import base64
from time import sleep

class CamaraImageBase64:
    def __init__(self, seconds, camara_video, camara_api,token):
        self.seconds = seconds
        self.camara_video = camara_video
        self.camara_api = camara_api
        threading.Thread(target=CamaraImageBase64.update_image_base64, args=(self.camara_video,self.camara_api,self.seconds,token,)).start()

    @staticmethod
    def update_image_base64(camara_video,camara_api,seconds,token):
        try:
            while(True):
                retval, image = camara_video.read()
                retval, buffer = cv2.imencode('.jpg', image)
                data_base64 = base64.b64encode(buffer)  # encode to base64 (bytes)
                data_base64 = data_base64.decode()    # convert bytes to string
                #self.camara_video.release()
                new_camara = camara_api
                new_camara.lastFrameImageBase64 = 'data:image/jpeg;base64,' + data_base64
                camaras = []
                camaras.append(new_camara)
                put_camaras(camaras,token)
                sleep(seconds)
        except Exception as e: print(e)
