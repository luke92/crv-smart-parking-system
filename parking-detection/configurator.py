import cv2
import numpy as np
import os
import glob
from video_source.Video import Video
from camera_calibration.ImageCapturer import captureImages
from camera_calibration.CameraCalibrator import calibrateCamera
from helpers.PointsManager import PointManager
from parking_configuration.DrawParking import DrawParking
from parking_configuration.ParkingConfigurator import parkingConfigurator
from parking_configuration.ParkingStates import ParkingStates
from homography_configuration.HomographyCalculator import calculateHomography
import codecs, json
from services.api import put,post
from services.parkings import postParkings
from helpers.JsonManager import readParkingsJSON
from video_source.VideoStream import VideoStream
from services.api import get
from services.apiRoutes import CONFIG
from helpers.Commands import Commands
import sys

#Constants Strings
keyStart = "Presione ENTER para comenzar"
keyContinue = "Presione ENTER para continuar..."

# Getting server config data
response = get(CONFIG)
configData = json.loads(response.content)

ip = configData['ip']
port = int(configData['port'])

# FIXME: Hack para parametros. Usar bien y refactorizar todo a clases
# Video resource
if len(sys.argv) < 2:	
    webcam = VideoStream("http://{}:{}/video".format(ip,port),False).start()
    print("Webcam")
else:
    #webcam =  Video("./assets/parking_video.mp4")
	#webcam =  Video("./assets/test2.mp4")
    #webcam =  Video("./assets/test.mp4")
    webcam =  VideoStream(src=sys.argv[1]).start()
    print("Video grabado")
	
frame = webcam.getFrame()
height, width, channels = frame.shape

configData = {
	"configurations": [
		{
			"height": height
		},
		{
			"width": width
		}
	]
}

response = put(CONFIG,configData)

print('Bienvenido al modulo de configuracion del Administrador de estacionamientos [ BETA ] ')
input(keyContinue)

# First Step - Image Capture
Commands.cls()
if len(glob.glob('./camera_data/*.jpg')) < 10:
	print('Procederemos a capturar las imagenes.')
	input(keyStart)
	captureImages()
	print('Imagenes capturadas exitosamente.')
	input(keyContinue)
else:
	print('Imagenes listas para calibracion.')
	input(keyContinue)

# Second Step - Camera Configuration
Commands.cls()
if os.path.isfile('./camera_data/calib.npz'):
	print('La camara esta calibrada')
	input(keyContinue)
else:
	print('Procederemos a calibrar la camara.')
	input(keyStart)
	calibrateCamera(True)
	print('Calibracion finalizada exitosamente!')
	input(keyContinue)

# Third Step - Points for Homography
Commands.cls()
if os.path.isfile('./camera_data/homography.json'):
	print('La correccion de imagen se encuentra configurada!.')
	input(keyContinue)
else:
	print('La correccion de imagen se encuentra configurada!.')
	homographyFrame = calculateHomography(frame.copy())
	print('Configuracion de imagen finalizada.')
	input(keyContinue)

# Fourth Step - Parking Configuration
Commands.cls()
if os.path.isfile('./camera_data/parking.json'):
	print('Los estacionamientos ya están configurados.')
	input(keyContinue)
else:
	print('Configurar estacionamiento')
	parkingConfigurator(webcam.getFrame())
	Commands.cls()
	print('Los estacionamientos configurado exitosamente!')
	input(keyContinue)

# Make new connection to get an homography frame
if len(sys.argv) < 2:	
    webcam = VideoStream("http://{}:{}/video".format(ip,port),False).start()
    print("Webcam")
else:
    webcam =  VideoStream(src=sys.argv[1]).start()
    print("Video grabado")
    
# Fifth Step - Set states of parkings
Commands.cls()
opt = input('¿Desea indicar los estados de los estacionamientos? S/N')
if opt.lower() == 's':
	ParkingStates(webcam.getHomographyFrame())
else:
	print('NO')

Commands.cls()

response = postParkings(readParkingsJSON())
#print(response)


# Sixth Step - Start Parking System [ BETA ]
print('Ha finalizado con exito la configuracion de sus sistema de administracion de estacionamientos!')
input('Presione una tecla para finalizar...')