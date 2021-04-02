from .apiRoutes import CAMARAS
from .api import get,put
import json
from camara_configuration.Camara import Camara
import threading
from helpers.JsonManager import writeToJSONFile,readJSONFile

folder_camera = './camera_data'
file_camera = 'camaras'

def getCamaras(token,session):
	response = []
	try:
		response = get(CAMARAS,token,session)
		response = json.loads(response.content)
		writeToJSONFile(folder_camera, file_camera, response)
	except Exception as e:
		print(e)
		response = readJSONFile(folder_camera, file_camera)
	camaras = []
	for camara in response:
		camara_new = Camara(camara['id'],camara['name'],camara['ip'],camara['port'],camara['x_izqsup'],camara['y_izqsup'],camara['x_izqinf'],camara['y_izqinf'],camara['x_dersup'],camara['y_dersup'],camara['x_derinf'],camara['y_derinf'],camara['filtro_contorno'],camara['radio_parking'],camara['radio_vehiculo'], camara['width'],camara['height'],camara['matrix_camera_row'],camara['matrix_camera_column'],camara['url'],camara['lastFrameImageBase64'],camara['lastFrameDrawImg64'], camara['rtmp'])
		camaras.append(camara_new)
	return camaras

def put_camaras_async(camaras,token,session):
	try:
		threading.Thread(target=put_camaras, args=(camaras,token,session,)).start()
	except Exception as e: print(e)

def put_camaras(camaras,token,session):
	formatted_parkings = []
	for camara in camaras:
		new_camara = {
				"id": camara.id,
				"lastFrameImageBase64": camara.lastFrameImageBase64,
			}
			
		formatted_parkings.append(new_camara)

	data = {
		"camaras": formatted_parkings
	}

	return put(CAMARAS,data,token,session)

def put_camaras_draw_async(camaras,token,session):
	try:
		threading.Thread(target=put_camaras_draw, args=(camaras,token,session,)).start()
	except Exception as e: print(e)    

def put_camaras_draw(camaras,token,session):
	formatted_parkings = []
	for camara in camaras:
		new_camara = {
				"id": camara.id,
				"lastFrameDrawImg64": camara.lastFrameDrawImg64,
			}
			
		formatted_parkings.append(new_camara)

	data = {
		"camaras": formatted_parkings
	}

	return put(CAMARAS,data,token,session)