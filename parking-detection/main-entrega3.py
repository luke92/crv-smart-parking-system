import cv2
import numpy as np
from video_source.Video import Video
from movement_detection.MovementDetector import MovementDetector
from movement_detection.Blob import Blob
from parking_configuration.Parking import Parking
from math import sqrt
from video_source.CameraStreaming import CameraStreaming
from video_source.VideoStream import VideoStream
import json,codecs
from UserInterface import UserInterface
from helpers.JsonManager import writeToJSONFile
import os
import requests,random
from services.api import get
from services.apiRoutes import CONFIG
from services.parkings import getParkings,putParkings
import sys

import time
import movement_detection.vehiculo as vh
import random

from services.camaras import getCamaras
from camara_configuration import CamaraImageBase64
from helpers.Base64 import update_frame_base64_to_api_async
import copy
#-----------------------------------------------------------------------------------------------
#from configCRV import homografiaCam1
#from configCRV import homografiaCam2
from configCRV import videoWidth
from configCRV import videoHeight
from configCRV import COLOR_RED
from configCRV import COLOR_GREEN
#from configCRV import filtroContorno
from configCRV import radioParking
from configCRV import radioVehiculo
#-----------------------------------------------------------------------------------------------

#Lectura de las camaras y su configuracion.
camarasResponse = getCamaras()
camaraSlots = camarasResponse

for camara in camaraSlots:
	if(camara.name=="Camara 1"):
		homografiaCam1 = [[camara.x_izqsup,camara.y_izqsup],[camara.x_izqinf,camara.y_izqinf],[camara.x_dersup,camara.y_dersup],[camara.x_derinf,camara.y_derinf]]
		filtroContorno1 = camara.filtro_contorno
		#radioParking1 = camara.radio_parking
		#radioVehiculo1 = camara.radio_vehiculo
	if(camara.name=="Camara 2"):
		homografiaCam2 = [[camara.x_izqsup,camara.y_izqsup],[camara.x_izqinf,camara.y_izqinf],[camara.x_dersup,camara.y_dersup],[camara.x_derinf,camara.y_derinf]]
		filtroContorno2 = camara.filtro_contorno
		#radioParking2 = camara.radio_parking
		#radioVehiculo2 = camara.radio_vehiculo

# Lista vehiculos de cada camara.
vehiculosCam1=[]
vehiculosCam2=[]

# Cargamos el vídeo
camara1 = cv2.VideoCapture("assets/cam1.mp4")
camara2 = cv2.VideoCapture("assets/cam2.mp4")

#Actualizar en API frames de la camara NO HOMOGRAFICA
#seconds_to_update_imagebase64 = 1
#camara_base_64_1 =  CamaraImageBase64.CamaraImageBase64(seconds_to_update_imagebase64,camara1, camarasResponse[0])
#camara_base_64_2 = CamaraImageBase64.CamaraImageBase64(seconds_to_update_imagebase64,camara2, camarasResponse[1])

# Inicializamos el primer frame a vacío.
# Nos servirá para obtener el fondo
fondo1 = None
fondo2 = None

# Ingreso de vehiculo entrante
vehiculoInput = "CRV086"



# Recorremos todos los frames
while True:

	# Crea objetos entrantes
	if vehiculoInput != "":
		vehiculosCam1.append(vh.Vehiculo(vehiculoInput, 2*videoWidth-44, 164, 44, 54)) # videoWidth-w(ancho del objeto captado).
		vehiculoInput = ""

	# PARKING DEFINITIONS
	parkingsResponse = getParkings()
	parkingSlots = parkingsResponse

	# Obtenemos el frame
	(grabbed1, frame1) = camara1.read()
	(grabbed2, frame2) = camara2.read()
	
	

	# Si hemos llegado al final del vídeo salimos
	if not grabbed1:
		break
	if not grabbed2:
		break

	#Puntos origen
	pts1cam1 = np.float32(homografiaCam1)
	#Puntos destino
	pts2cam1 = np.float32([[0,0],[0,videoHeight],[videoWidth,0],[videoWidth,videoHeight]])
	#Se calcula la matriz para la corrección de perspectiva
	M1 = cv2.getPerspectiveTransform(pts1cam1,pts2cam1)
	#Obtenemos la imagen con corrección de pespectiva
	frame1 = cv2.warpPerspective(frame1, M1, (videoWidth,videoHeight))

	#Puntos origen
	pts1cam2 = np.float32(homografiaCam2)
	#Puntos destino
	pts2cam2 = np.float32([[0,0],[0,videoHeight],[videoWidth,0],[videoWidth,videoHeight]])
	#Se calcula la matriz para la corrección de perspectiva
	M2 = cv2.getPerspectiveTransform(pts1cam2,pts2cam2)
	#Obtenemos la imagen con corrección de pespectiva
	frame2 = cv2.warpPerspective(frame2, M2, (videoWidth,videoHeight))

	#Actualizamos en API los frame de las camaras de manera homografica
	oldframe1 = copy.copy(frame1)
	oldframe2 = copy.copy(frame2)
	update_frame_base64_to_api_async(oldframe1,camarasResponse[0])
	update_frame_base64_to_api_async(oldframe2,camarasResponse[1])

	# Convertimos a escala de grises
	gris1 = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
	gris2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)
 
	# Aplicamos suavizado para eliminar ruido
	gris1 = cv2.GaussianBlur(gris1, (21, 21), 0)
	gris2 = cv2.GaussianBlur(gris2, (21, 21), 0)
 
	# Si todavía no hemos obtenido el fondo, lo obtenemos
	# Será el primer frame que obtengamos
	if fondo1 is None:
		fondo1 = gris1
		continue
	
	if fondo2 is None:
		fondo2 = gris2
		continue
 
	# Calculo de la diferencia entre el fondo y el frame actual
	resta1 = cv2.absdiff(fondo1, gris1)
	resta2 = cv2.absdiff(fondo2, gris2)
 
	# Aplicamos un umbral
	umbral1 = cv2.threshold(resta1, 25, 255, cv2.THRESH_BINARY)[1]
	umbral2 = cv2.threshold(resta2, 25, 255, cv2.THRESH_BINARY)[1]

	# Dilatamos el umbral para tapar agujeros
	umbral1 = cv2.dilate(umbral1, None, iterations=2)
	umbral2 = cv2.dilate(umbral2, None, iterations=2)
 
	# Copiamos el umbral para detectar los contornos
	contornosimg1 = umbral1.copy()
	contornosimg2 = umbral2.copy()

	# Buscamos contorno en la imagen
	im, contornos1, hierarchy = cv2.findContours(contornosimg1,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
	im, contornos2, hierarchy = cv2.findContours(contornosimg2,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

	# ----------------------------------------------------------
	# Recorremos todos los contornos encontrados
	for c1 in contornos1:
		# Eliminamos los contornos más pequeños
		if cv2.contourArea(c1) < filtroContorno1:
			continue
 
		# Obtenemos el bounds del contorno, el rectángulo mayor que engloba al contorno
		(x, y, w, h) = cv2.boundingRect(c1)
		# Dibujamos el rectángulo del bounds
		#cv2.rectangle(frame1, (x, y), (x + w, y + h), (0, 255, 0), 2)		

		# Si los obj de cam1 se intersecan con vhcam2, entonces copia el vehiculo en cam1.
		for vhcam2 in vehiculosCam2:
			if vhcam2.collide(videoWidth+x, y, radioVehiculo):
				existevhcam1 = True
				
				for vhcam1 in vehiculosCam1:
					if vhcam1.patente==vhcam2.patente:
						existevhcam1 = False
						break
				
				if existevhcam1:
					vehiculosCam1.append(vh.Vehiculo(vhcam2.patente, videoWidth+x, y, w, h))

		# Actualiza de coordenadas por movimiento.
		for vhcam1 in vehiculosCam1:
			if vhcam1.collide(videoWidth+x, y, radioVehiculo):
				vhcam1.actualizarCoordenadasTamanio(videoWidth+x, y, w, h)
				print("cam1")
				vhcam1.presentarse()
	# ----------------------------------------------------------
	# Recorremos todos los contornos encontrados
	for c2 in contornos2:
		# Eliminamos los contornos más pequeños
		if cv2.contourArea(c2) < filtroContorno2:
			continue
 
		# Obtenemos el bounds del contorno, el rectángulo mayor que engloba al contorno
		(x, y, w, h) = cv2.boundingRect(c2)
		# Dibujamos el rectángulo del bounds
		#cv2.rectangle(frame2, (x, y), (x + w, y + h), (0, 255, 0), 2)

		# Si los obj de cam2 se intersecan con vhcam1, entonces copia el vehiculo en cam2.
		for vhcam1 in vehiculosCam1:
			if vhcam1.collide(x, y, radioVehiculo):
				existevhcam2 = True
				
				for vhcam2 in vehiculosCam2:
					if vhcam2.patente==vhcam1.patente:
						existevhcam2 = False
						break
				
				if existevhcam2:
					vehiculosCam2.append(vh.Vehiculo(vhcam1.patente, x, y, w, h))

		# Actualiza de coordenadas por movimiento.
		for vhcam2 in vehiculosCam2:
			if vhcam2.collide(x, y, radioVehiculo):
				vhcam2.actualizarCoordenadasTamanio(x, y, w, h)
				print("cam2")
				vhcam2.presentarse()
	# ----------------------------------------------------------
	# Elimina la patente que se encuentra en las dos camaras, si: 
	# 1 - no hay interseccion
	# 2 - y el vehiculo que se encuentra en un extremo (indica que se encuentra del otro lado).
	for vhcam1 in vehiculosCam1:
		for vhcam2 in vehiculosCam2:
			if vhcam1.patente==vhcam2.patente and vhcam1.collide(vhcam2.x, vhcam2.y, radioVehiculo)==False:
				# eliminar el del extremo
				# para ida
				if vhcam1.x==videoWidth: # para ida
					vehiculosCam1.remove(vhcam1)
				if vhcam2.x==videoWidth: # para vuelta
					vehiculosCam2.remove(vhcam2)

	# ----------------------------------------------------------

	#Checkea que los si hay interseccion con el parking-vehiculo entonces se actualiza ese espacio a isOccupied = True.
	for vhcam1 in vehiculosCam1:
		for parking in parkingSlots:
			if vhcam1.collide(parking.minx, parking.miny, radioParking) and parking.state==False:
				parking.state = True
				parking.patent = vhcam1.patente
				cv2.rectangle(frame1, (parking.minx-videoWidth, parking.miny), (parking.minx-videoWidth + parking.maxx, parking.miny + parking.maxy), COLOR_GREEN, 2)
				response = putParkings(parkingSlots)

	# Checkea que los si hay interseccion con el parking-vehiculo entonces se actualiza ese espacio a isOccupied = True.
	for vhcam2 in vehiculosCam2:
		for parking in parkingSlots:
			if vhcam2.collide(parking.minx, parking.miny, radioParking) and parking.state==False:
				parking.state = True
				parking.patent = vhcam2.patente
				cv2.rectangle(frame2, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_GREEN, 2)
				response = putParkings(parkingSlots)

	# Caso contrario, si no hay inteseccion con ningun vehiculo de cam1 y cam2, entonces isOccupied = False.
	for parking in parkingSlots:
		if(parking.state==True):
			changeState = True
			seguir = True

			for vhcam1 in vehiculosCam1:
				if vhcam1.collide(parking.minx, parking.miny, radioParking):
					changeState = False
					cv2.rectangle(frame1, (parking.minx-videoWidth, parking.miny), (parking.minx-videoWidth + parking.maxx, parking.miny + parking.maxy), COLOR_RED, 2)
					seguir = False
					break
			
			if seguir:
				for vhcam2 in vehiculosCam2:
					if vhcam2.collide(parking.minx, parking.miny, radioParking):
						changeState = False
						cv2.rectangle(frame2, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_RED, 2)
						break

			if changeState:
				parking.state = False
				response = putParkings(parkingSlots)

	#Dibujamos todos lo parkings
	for parking in parkingSlots:
		if parking.state==False and parking.minx<videoWidth:
			cv2.rectangle(frame2, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_GREEN, 2)
		if parking.state==False and parking.minx>videoWidth:
			cv2.rectangle(frame1, (parking.minx-videoWidth, parking.miny), (parking.minx-videoWidth + parking.maxx, parking.miny + parking.maxy), COLOR_GREEN, 2)

	# Mostramos las imágenes de la cámara, el umbral y la resta

	cv2.imshow("Camara-1", frame1)
	cv2.imshow("Camara-2", frame2)
	#cv2.imshow("Umbral", umbral)
	#cv2.imshow("Resta", resta)
	#cv2.imshow("Contorno", contornosimg)
 
	# Capturamos una tecla para salir
	key = cv2.waitKey(1) & 0xFF
 
	# Tiempo de espera para que se vea bien
	time.sleep(0.015)
 
	# Si ha pulsado la letra s, salimos
	if key == ord("s"):
		break
 
# Liberamos la cámara y cerramos todas las ventanas
camara1.release()
cv2.destroyAllWindows()

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

print("****************************************************************")
print("A continuacion... todos los vehiculos de la CAMARA-1")
print("")
for vhcam1 in vehiculosCam1:
	vhcam1.presentarse()
print("****************************************************************")
print("A continuacion... todos los vehiculos de la CAMARA-2")
print("")
for vhcam2 in vehiculosCam2:
	vhcam2.presentarse()
print("****************************************************************")

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
