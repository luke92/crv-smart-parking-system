import threading
from helpers.ImageHelpers import toGrayScale, suavizarParaEliminarRuido
import cv2
from helpers.Commands import Commands
from configCRV import videoWidth
from services.patents import getPatents
import pytesseract
import movement_detection.vehiculo as vh
import numpy as np
import re
from services.registrys import getRegistrys,post_registrys_async
from parking_configuration.Registry import Registry
from datetime import datetime

pytesseract.pytesseract.tesseract_cmd = Commands.getPathTesseract()

def limpiezaDeTexto(text):
	text = text.strip()
	charNoadmitidos = [",",".",";","a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"," "]
	for char in charNoadmitidos:
		text = text.replace(char, "")
	return text

def esPatenteValida(pseudoPatent, listPatrones):
	for exp in listPatrones:	
		x = re.search(exp.nomenclatura, pseudoPatent)
		if(x != None):
			return x.group()
	return ""

def analizarCaptura(img, listPatrones):
	text = pytesseract.image_to_string(img)
	textLimpio = limpiezaDeTexto(text)
	patente = esPatenteValida(textLimpio, listPatrones)
	return patente

def detect_patent_async(source,patent,vehiculosCam, camaraPatenteReader,dataCamaraPatente,frameCamaraPatente,token,session):
    try:
        threading.Thread(target=detect_patent, args=(source,patent,vehiculosCam,camaraPatenteReader,dataCamaraPatente,frameCamaraPatente,token,session,)).start()
    except Exception as e: print(e)

def detect_patent(source,patent,vehiculosCam,camaraPatenteReader,dataCamaraPatente,frameCamaraPatente,token,session):
    patentsResponse = getPatents(token,session)
    patentSlots = patentsResponse
    seguirCam0 = True
    fondo0 = None
    while True:

        (grabbed0, frame0) = camaraPatenteReader.read()
        frameCamaraPatente = frame0
        
		# Si hemos llegado al final del vídeo salimos
        if not grabbed0:
            seguirCam0 = False
            break
		
		# Convertimos a escala de grises
        gris0 = toGrayScale(frame0) 
		# Aplicamos suavizado para eliminar ruido
        gris0 = suavizarParaEliminarRuido(gris0)
	
		# Si todavía no hemos obtenido el fondo, lo obtenemos
		# Será el primer frame que obtengamos
        if fondo0 is None:
            fondo0 = gris0
            continue
	
		# Calculo de la diferencia entre el fondo y el frame actual
        resta0 = cv2.absdiff(fondo0, gris0)
		# Aplicamos un umbral
        umbral0 = cv2.threshold(resta0, 25, 255, cv2.THRESH_BINARY)[1]
		# Dilatamos el umbral para tapar agujeros
        umbral0 = cv2.dilate(umbral0, None, iterations=2)

		# Copiamos el umbral para detectar los contornos
        contornosimg0 = umbral0.copy()
		# Buscamos contorno en la imagen
        im, contornos0, hierarchy = cv2.findContours(contornosimg0,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)

        frame0 = cv2.resize(frame0, (dataCamaraPatente.width, dataCamaraPatente.height))
        cv2.imshow(dataCamaraPatente.name,frameCamaraPatente)

        if patent=="" :
            for c0 in contornos0:
				# Eliminamos los contornos más pequeños
                if cv2.contourArea(c0) < dataCamaraPatente.distance_sensor:
                    continue
				#Puntos origen
                pts1 = np.float32([[dataCamaraPatente.x_izqsup,dataCamaraPatente.y_izqsup],[dataCamaraPatente.x_izqinf,dataCamaraPatente.y_izqinf],[dataCamaraPatente.x_dersup,dataCamaraPatente.y_dersup],[dataCamaraPatente.x_derinf,dataCamaraPatente.y_derinf]])
				#Puntos destino
                pts2 = np.float32([[0,0],[0,75],[175,0],[175,75]])
				#Se calcula la matriz para la corrección de perspectiva
                M = cv2.getPerspectiveTransform(pts1,pts2)
				#Obtenemos la imagen con corrección de pespectiva
                frame0 = cv2.warpPerspective(frame0, M, (175,75))
				#Analisis
                patente = analizarCaptura(frame0, patentSlots)
                if patente != "":
                    patent = patente
                    vehiculosCam.append(vh.Vehiculo(patent, videoWidth-44, 164, 44, 54))
                    # Registra entrada de vehiculo a estacionamiento
                    registrys=[]
                    idParking = None
                    registrys.append(Registry(0,str(datetime.now()),idParking,patent,True,dataCamaraPatente.id))
                    post_registrys_async(registrys,token,session)

    camaraPatenteReader.release()
    cv2.destroyWindow(dataCamaraPatente.name)