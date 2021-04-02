from .apiRoutes import CONFIG,REGISTRYS
from .api import get,post
import json
from parking_configuration.Registry import Registry
import threading

def post_registrys_async(registrys,token,session):
    try:
        threading.Thread(target=postRegistrys, args=(registrys,token,session)).start()
    except Exception as e: print(e)

def postRegistrys(registrys,token,session):
	formattedRegistrys = []
	
	for registry in registrys:
		formattedRegistrys.append(
			{
				"fecha": registry.fecha,
				"idParking": registry.idParking,
				"patente": registry.patente,
				"tipo": registry.tipo,
				"cameraId": registry.cameraId
			}	
		)

	data = {
		"registrys": formattedRegistrys
	}

	return post(REGISTRYS,data,token,session)

def getRegistrys(token):
	response = get(REGISTRYS,token)
	response = json.loads(response.content)
	registrys = []
	for registry in response:
		registry_new = Registry(registry['id'],registry['fecha'],registry['idParking'],registry['patente'],registry['tipo'],registry['cameraId'])
		registry_new.id = registry['id']
		registrys.append(registry_new)
	return registrys
