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
from services.parkings import get_parkings_async,put_parkings_async,putParkings,getParkings
import sys

import time
import movement_detection.vehiculo as vh
import random
import re

from services.api import get_token
from services.camaras import getCamaras
from camara_configuration import CamaraImageBase64
from helpers.Base64 import update_frame_base64_to_api_async, update_frame_draw_base64_to_api_async
import copy

from services.registrys import getRegistrys,post_registrys_async,postRegistrys
from parking_configuration.Registry import Registry
from datetime import datetime
#-----------------------------------------------------------------------------------------------
from configCRV import COLOR_RED
from configCRV import COLOR_GREEN

from helpers.Commands import Commands
from helpers.PatentHelper import detect_patent_async
from helpers.ImageHelpers import toGrayScale, suavizarParaEliminarRuido
#-----------------------------------------------------------------------------------------------
from services.cameraPatent import getCamarasPatent


def dibujar_parkings(frame1, frame2,parkingSlots):
	#Dibujamos todos lo parkings
	for parking in parkingSlots:
		if parking.state==True and parking.cameraId==2:
			cv2.rectangle(frame2, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_RED, 2)
			cv2.putText(frame2, str(parking.id), (parking.minx + 10, parking.miny + 30), textFont, textFontScale, textColor, textThickness)
		if parking.state==True and parking.cameraId==1:
			cv2.rectangle(frame1, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_RED, 2)
			cv2.putText(frame1, str(parking.id), (parking.minx + 10, parking.miny + 30), textFont, textFontScale, textColor, textThickness)
		if parking.state==False and parking.cameraId==2:
			cv2.rectangle(frame2, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_GREEN, 2)
			cv2.putText(frame2, str(parking.id), (parking.minx + 10, parking.miny + 30), textFont, textFontScale, textColor, textThickness)
		if parking.state==False and parking.cameraId==1:
			cv2.rectangle(frame1, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_GREEN, 2)
			cv2.putText(frame1, str(parking.id), (parking.minx + 10, parking.miny + 30), textFont, textFontScale, textColor, textThickness)

#Obtención de TOKEN
token = get_token()

session = requests.Session()

#Lectura de las camaras y su configuracion.
camarasResponse = getCamaras(token,session)
camaraSlots = camarasResponse

#Lectura de las camara_atente y su configuracion.
camerasPatentResponse = getCamarasPatent(token,session)
cameraPatenteSlots = camerasPatentResponse

# Lista vehiculos de cada camara.
vehiculosCam1=[]
vehiculosCam2=[]

# Cargamos el vídeo
camaraPatente = "assets/cam0.mp4"
camaraSource1 = "assets/cam1.mp4"
camaraSource2 = "assets/cam2.mp4"

for camara in camaraSlots:
	#print(camara.rtmp)
	if(camara.name=="Camara 1"):
		#camaraSource1 = camara.url
		#camaraSource1 = camara.rtmp
		homografiaCam1 = [[camara.x_izqsup,camara.y_izqsup],[camara.x_izqinf,camara.y_izqinf],[camara.x_dersup,camara.y_dersup],[camara.x_derinf,camara.y_derinf]]
		filtroContorno1 = camara.filtro_contorno
		radioParking1 = camara.radio_parking
		radioVehiculo1 = camara.radio_vehiculo
		videoWidth1 = camara.width
		videoHeight1 = camara.height

	if(camara.name=="Camara 2"):
		#camaraSource2 = camara.url
		#camaraSource2 = camara.rtmp
		homografiaCam2 = [[camara.x_izqsup,camara.y_izqsup],[camara.x_izqinf,camara.y_izqinf],[camara.x_dersup,camara.y_dersup],[camara.x_derinf,camara.y_derinf]]
		filtroContorno2 = camara.filtro_contorno
		radioParking2 = camara.radio_parking
		radioVehiculo2 = camara.radio_vehiculo
		videoWidth2 = camara.width
		videoHeight2 = camara.height

#Puntos origen
pts1cam1 = np.float32(homografiaCam1)
#Puntos destino
pts2cam1 = np.float32([[0,0],[0,videoHeight1],[videoWidth1,0],[videoWidth1,videoHeight1]])
#Se calcula la matriz para la corrección de perspectiva
M1 = cv2.getPerspectiveTransform(pts1cam1,pts2cam1)

#Puntos origen
pts1cam2 = np.float32(homografiaCam2)
#Puntos destino
pts2cam2 = np.float32([[0,0],[0,videoHeight2],[videoWidth2,0],[videoWidth2,videoHeight2]])
#Se calcula la matriz para la corrección de perspectiva
M2 = cv2.getPerspectiveTransform(pts1cam2,pts2cam2)

# Inicializamos el primer frame a vacío.
# Nos servirá para obtener el fondo
fondo1 = None
fondo2 = None

# Ingreso de vehiculo entrante
vehiculoInput = ""

# Opciones para el texto
# font 
textFont = cv2.FONT_ITALIC
# fontScale 
textFontScale = 1
# Blue color in BGR 
textColor = (255, 0, 0) 
# Line thickness of 2 px 
textThickness = 2

camaraPatenteReader = cv2.VideoCapture(camaraPatente)
(grabbed0, frameCamaraPatente) = camaraPatenteReader.read()
for dataCamaraPatente in cameraPatenteSlots:
	cv2.imshow(dataCamaraPatente.name, frameCamaraPatente)
	detect_patent_async(camaraPatente, vehiculoInput, vehiculosCam1,camaraPatenteReader, dataCamaraPatente, frameCamaraPatente,token,session)
camara1 = cv2.VideoCapture(camaraSource1)
camara2 = cv2.VideoCapture(camaraSource2)

# PARKING DEFINITIONS
parkingSlots = []
stop_threads = False
#get_parkings_async(parkingSlots,token,stop_threads,session)


update_frame = True
# Recorremos todos los frames
while True:

	#***************************************************************************************************************************

	# Obtenemos el frame
	(grabbed1, frame1) = camara1.read()
	(grabbed2, frame2) = camara2.read()
	
	# PARKING DEFINITIONS
	parkingsResponse = getParkings(token,session)
	parkingSlots = parkingsResponse

	# Si hemos llegado al final del vídeo salimos
	if not grabbed1:
		break
	if not grabbed2:
		break

	#Obtenemos la imagen con corrección de pespectiva
	frame1 = cv2.warpPerspective(frame1, M1, (videoWidth1,videoHeight1))

	#Obtenemos la imagen con corrección de pespectiva
	frame2 = cv2.warpPerspective(frame2, M2, (videoWidth2,videoHeight2))

	#Actualizamos en API los frame de las camaras de manera homografica
	oldframe1 = copy.copy(frame1)
	oldframe2 = copy.copy(frame2)

	update_frame_base64_to_api_async(update_frame,oldframe1,camarasResponse[0],token,session)
	update_frame_base64_to_api_async(update_frame,oldframe2,camarasResponse[1],token,session)

	# Convertimos a escala de grises
	gris1 = toGrayScale(frame1)
	gris2 = toGrayScale(frame2)
 
	# Aplicamos suavizado para eliminar ruido
	gris1 = suavizarParaEliminarRuido(gris1)
	gris2 = suavizarParaEliminarRuido(gris2)
 
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

	# Dibujamos parkings en frame
	dibujar_parkings(frame1,frame2,parkingSlots)
	update_frame_draw_base64_to_api_async(frame1,camarasResponse[0],token,session)
	update_frame_draw_base64_to_api_async(frame2,camarasResponse[1],token,session)
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
			if vhcam2.collide(x, y, radioVehiculo2):
				existevhcam1 = True
				
				for vhcam1 in vehiculosCam1:
					if vhcam1.patente==vhcam2.patente:
						existevhcam1 = False
						break
				
				if existevhcam1:
					vehiculosCam1.append(vh.Vehiculo(vhcam2.patente, videoWidth1+x, y, w, h))

		# Actualiza de coordenadas por movimiento.
		for vhcam1 in vehiculosCam1:
			if vhcam1.collide(x, y, radioVehiculo1):
				vhcam1.actualizarCoordenadasTamanio(x, y, w, h)
				#print("cam1")
				#vhcam1.presentarse()
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
			if vhcam1.collide(x-videoWidth1, y, radioVehiculo1):
				existevhcam2 = True
				
				for vhcam2 in vehiculosCam2:
					if vhcam2.patente==vhcam1.patente:
						existevhcam2 = False
						break
				
				if existevhcam2:
					vehiculosCam2.append(vh.Vehiculo(vhcam1.patente, x, y, w, h))

		# Actualiza de coordenadas por movimiento.
		for vhcam2 in vehiculosCam2:
			if vhcam2.collide(x, y, radioVehiculo2):
				vhcam2.actualizarCoordenadasTamanio(x, y, w, h)
				#print("cam2")
				#vhcam2.presentarse()
	# ----------------------------------------------------------
	# Elimina la patente que se encuentra en las dos camaras, si: 
	# 1 - no hay interseccion
	# 2 - y el vehiculo que se encuentra en un extremo (indica que se encuentra del otro lado).
	for vhcam1 in vehiculosCam1:
		for vhcam2 in vehiculosCam2:
			if vhcam1.patente==vhcam2.patente and vhcam1.collide(vhcam2.x, vhcam2.y, radioVehiculo2)==False:
				# eliminar el del extremo
				# para ida
				if vhcam1.x==0: # para ida
					vehiculosCam1.remove(vhcam1)
				if vhcam2.x==videoWidth2: # para vuelta
					vehiculosCam2.remove(vhcam2)

	# ----------------------------------------------------------

	#Checkea que los si hay interseccion con el parking-vehiculo entonces se actualiza ese espacio a isOccupied = True.
	for vhcam1 in vehiculosCam1:
		for parking in parkingSlots:
			if vhcam1.collide(parking.minx, parking.miny, radioParking1) and parking.state==False and parking.cameraId == 1 :
				parking.state = True
				# Registra cuando ingresa un vehiculo a un parking
				registrys=[]
				update_parking = []
				idParking = parking.id
				patente = vhcam1.patente
				registrys.append(Registry(0,str(datetime.now()),idParking,patente,True,parking.cameraId))
				postRegistrys(registrys,token,session)
				parking.patent = vhcam1.patente
				update_parking.append(parking)
				putParkings(update_parking,token,session)

	# Checkea que los si hay interseccion con el parking-vehiculo entonces se actualiza ese espacio a isOccupied = True.
	for vhcam2 in vehiculosCam2:
		for parking in parkingSlots:
			if vhcam2.collide(parking.minx, parking.miny, radioParking2) and parking.state==False and parking.cameraId == 2:
				parking.state = True
				# Registra cuando ingresa un vehiculo a un parking
				registrys=[]
				update_parking = []
				idParking = parking.id
				patente = vhcam2.patente
				registrys.append(Registry(0,str(datetime.now()),idParking,patente,True,parking.cameraId))
				postRegistrys(registrys,token,session)
				parking.patent = vhcam2.patente
				update_parking.append(parking)
				putParkings(update_parking,token,session)

	# Caso contrario, si no hay inteseccion con ningun vehiculo de cam1 y cam2, entonces isOccupied = False.
	for parking in parkingSlots:
		if(parking.state==True):
			changeState = True
			seguir = True

			for vhcam1 in vehiculosCam1:
				if vhcam1.collide(parking.minx, parking.miny, radioParking1):
					changeState = False
					seguir = False
					break
			
			if seguir:
				for vhcam2 in vehiculosCam2:
					if vhcam2.collide(parking.minx, parking.miny, radioParking2):
						changeState = False
						break

			if changeState:
				parking.state = False
				# Registra cuando sale un vehiculo de un parking
				registrys=[]
				update_parking=[]
				idParking = parking.id
				patente = parking.patent
				registrys.append(Registry(0,str(datetime.now()),idParking,patente,False,parking.cameraId))
				postRegistrys(registrys,token,session)
				parking.patent = "none"
				update_parking.append(parking)
				putParkings(update_parking,token,session)

	dibujar_parkings(frame1,frame2,parkingSlots)
	"""
	#Dibujamos todos lo parkings
	for parking in parkingSlots:
		if parking.state==True and parking.cameraId==2:
			cv2.rectangle(frame2, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_RED, 2)
			cv2.putText(frame2, str(parking.id), (parking.minx + 10, parking.miny + 30), textFont, textFontScale, textColor, textThickness)
		if parking.state==True and parking.cameraId==1:
			cv2.rectangle(frame1, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_RED, 2)
			cv2.putText(frame1, str(parking.id), (parking.minx + 10, parking.miny + 30), textFont, textFontScale, textColor, textThickness)
		if parking.state==False and parking.cameraId==2:
			cv2.rectangle(frame2, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_GREEN, 2)
			cv2.putText(frame2, str(parking.id), (parking.minx + 10, parking.miny + 30), textFont, textFontScale, textColor, textThickness)
		if parking.state==False and parking.cameraId==1:
			cv2.rectangle(frame1, (parking.minx, parking.miny), (parking.minx + parking.maxx, parking.miny + parking.maxy), COLOR_GREEN, 2)
			cv2.putText(frame1, str(parking.id), (parking.minx + 10, parking.miny + 30), textFont, textFontScale, textColor, textThickness)
	"""

	# Mostramos las imágenes de la cámara, el umbral y la resta
	cv2.imshow("Camara-1", frame1)
	cv2.imshow("Camara-2", frame2)
	#cv2.imshow("Umbral", umbral)
	#cv2.imshow("Resta", resta)
	#cv2.imshow("Contorno", contornosimg)
 
	# Capturamos una tecla para salir
	key = cv2.waitKey(1) & 0xFF
 
	# Tiempo de espera para que se vea bien
	#time.sleep(0.015)
 
	# Si ha pulsado la letra s, salimos
	if key == ord("s"):
		break
 
# Liberamos la cámara y cerramos todas las ventanas
camara1.release()
camara2.release()
cv2.destroyAllWindows()
stop_threads = True
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
separator = "****************************************************************"
print(separator)
print("A continuacion... todos los vehiculos de la CAMARA-1")
print("")
for vhcam1 in vehiculosCam1:
	vhcam1.presentarse()
print(separator)
print("A continuacion... todos los vehiculos de la CAMARA-2")
print("")
for vhcam2 in vehiculosCam2:
	vhcam2.presentarse()
print(separator)
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++