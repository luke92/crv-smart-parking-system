
# Importamos las librerías necesarias
import cv2
import numpy as np
import pytesseract
import re
import time

def analizarCaptura(img):
	text = pytesseract.image_to_string(img)
	textLimpio = limpiezaDeTexto(text)
	patente = esPatenteValida(textLimpio)
	return patente

def limpiezaDeTexto(text):
	text = text.strip()
	charNoadmitidos = [",",".",";","a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"," "]
	for char in charNoadmitidos:
		text = text.replace(char, "")
	return text
	
def esPatenteValida(pseudoPatent):
	expresiones=["[A-Z]{3}[0-9]{3}",
				"[A-Z]{2}[0-9]{3}[A-Z]{2}",
				"[A-Z][0-9]{3}[A-Z]{3}",
				"[0-9]{3}[A-Z]{4}",
				"[A-Z]{3}[0-9]{4}"]
	for exp in expresiones:	
		x = re.search(exp, pseudoPatent)
		if(x != None):
			print("Es una patente valida")
			return x.group()
	print("NO es una patente valida")
	return ""

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'
# Cargamos el vídeo
camara0 = cv2.VideoCapture("videos/entrada-mov-no-continuo.mp4")
# Inicializamos el primer frame a vacío.
# Nos servirá para obtener el fondo
fondo0 = None
# Ingreso de vehiculo entrante
vehiculoInput = ""

# Recorremos todos los frames
while True:

	# Obtenemos el frame
	(grabbed0, frame0) = camara0.read()

	# Si hemos llegado al final del vídeo salimos
	if not grabbed0:
		break
	 
	# Convertimos a escala de grises
	gris0 = cv2.cvtColor(frame0, cv2.COLOR_BGR2GRAY) 
	# Aplicamos suavizado para eliminar ruido
	gris0 = cv2.GaussianBlur(gris0, (21, 21), 0)
 
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

	frame0 = cv2.resize(frame0, (640, 352))
	cv2.imshow("Camara-0", frame0)

	if vehiculoInput=="" :
		for c0 in contornos0:
			# Eliminamos los contornos más pequeños
			if cv2.contourArea(c0) < 176000:
				continue		

			#print(cv2.contourArea(c0))
			# Obtenemos el bounds del contorno, el rectángulo mayor que engloba al contorno
			(x, y, w, h) = cv2.boundingRect(c0)
			# Dibujamos el rectángulo del bounds
			cv2.rectangle(frame0, (x, y), (x + w, y + h), (0, 255, 0), 2)
					
			#Puntos origen
			pts1 = np.float32([[435,75],[435,150],[610,73],[610,148]])
			#Puntos destino
			pts2 = np.float32([[0,0],[0,75],[175,0],[175,75]])
			#Se calcula la matriz para la corrección de perspectiva
			M = cv2.getPerspectiveTransform(pts1,pts2)
			#Obtenemos la imagen con corrección de pespectiva
			frame0 = cv2.warpPerspective(frame0, M, (175,75))
			#FilterGaussian
			#frame0 = cv2.cvtColor(frame0, cv2.COLOR_BGR2GRAY)
			#frame0 = cv2.adaptiveThreshold(frame0,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2)
			#Analisis
			patente = analizarCaptura(frame0)
			if patente != "":
				vehiculoInput = patente
				print("La patente es: " + vehiculoInput)

	# Tiempo de espera para que se vea bien
	time.sleep(0.015)
 
	# Capturamos una tecla para salir
	key = cv2.waitKey(1) & 0xFF

	# Si ha pulsado la letra s, salimos
	if key == ord("s"):
		break

# Liberamos la cámara y cerramos todas las ventanas
camara0.release()
cv2.destroyAllWindows()
