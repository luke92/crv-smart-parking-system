from .apiRoutes import CAMARASPATENTES
from .api import get
import json
from camara_configuration.CameraPatent import CameraPatent
from helpers.JsonManager import writeToJSONFile,readJSONFile

folder_camera_patent = './camera_data'
file_camera_patent = 'camaras_patentes'

def getCamarasPatent(token,session):
    response = []
    try:
        response = get(CAMARASPATENTES,token,session)
        response = json.loads(response.content)
        writeToJSONFile(folder_camera_patent, file_camera_patent, response)
    except Exception as e:
        print(e)
        response = readJSONFile(folder_camera_patent, file_camera_patent)
    camaras = []
    for camara in response:
        camara_new = CameraPatent(camara['id'],camara['name'],camara['url'],camara['rtmp'],camara['x_izqsup'],camara['y_izqsup'],camara['x_izqinf'],camara['y_izqinf'],camara['x_dersup'],camara['y_dersup'],camara['x_derinf'],camara['y_derinf'],camara['id_camera'],camara['distance_sensor'], camara['width'],camara['height'],camara['lastFrameImageBase64'])
        camaras.append(camara_new)
    return camaras