# Importamos las librerías necesarias
import numpy as np
import cv2
import time

# Cargamos el vídeo
camara = cv2.VideoCapture("videos/cam-perspectiva.mp4")

#Colores
COLOR_GREEN = (0, 255, 0)

#Dimension del video
videoWidth = 720
videoHeight = 720

# Recorremos todos los frames
while True:

	# Obtenemos el frame
	(grabbed, frame) = camara.read()
 
	# Si hemos llegado al final del vídeo salimos
	if not grabbed:
		break

	#Seleccionamos cuatro puntos usando un arreglo de numpy
	#[Izq-sup], [Izq-inf], [Der-sup], [Der-inf]	

	#Puntos origen
	pts1 = np.float32([[103,309],[87,625],[555,310],[684,631]])

	#Puntos destino
	pts2 = np.float32([[200,350],[200,550],[400,350],[400,550]])

	#Se calcula la matriz para la corrección de perspectiva
	M = cv2.getPerspectiveTransform(pts1,pts2)

	#Obtenemos la imagen con corrección de pespectiva
	frame = cv2.warpPerspective(frame, M, (600,600))

	#Dibujamos el rectangulo sobre el frame homograficado
	cv2.rectangle(frame, (303, 350), (327, 415), COLOR_GREEN, 2)

	#Se calcula la matriz para volver a la perspectiva anterior (inversa).
	Minversa = cv2.getPerspectiveTransform(pts2,pts1)

	#Obtenemos la imagen con corrección de pespectiva
	frame = cv2.warpPerspective(frame, Minversa, (videoWidth,videoHeight))

	#Lo escalamos
	frame = cv2.resize(frame, (350, 350))

	# Mostramos las imágenes de la cámara.
	cv2.imshow("Camara", frame)

	# Capturamos una tecla para salir
	key = cv2.waitKey(1) & 0xFF
 
	# Si ha pulsado la letra s, salimos
	if key == ord("s"):
		break
 
# Liberamos la cámara y cerramos todas las ventanas
camara.release()
cv2.destroyAllWindows()