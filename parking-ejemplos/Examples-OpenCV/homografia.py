# Importamos las librerías necesarias
import numpy as np
import cv2
import time

# Cargamos el vídeo
camara = cv2.VideoCapture("videos/parking_video.mp4")

# Recorremos todos los frames
while True:
	# Obtenemos el frame
	(grabbed, frame) = camara.read()
 
	# Si hemos llegado al final del vídeo salimos
	if not grabbed:
		break
  
	#Homografía
	rows = 480 #w
	cols = 854 #h

	#Seleccionamos cuatro puntos usando un arreglo de numpy
	#[Izq-sup], [Izq-inf], [Der-sup], [Der-inf]	

	#Puntos origen
	pts1 = np.float32([[0,0],[0,480],[480,0],[854,480]])

	#Puntos destino
	pts2 = np.float32([[0,0],[0,480],[480,0],[854,480]])

	#Se calcula la matriz para la corrección de perspectiva
	M = cv2.getPerspectiveTransform(pts1,pts2)

	#Obtenemos la imagen con corrección de pespectiva
	frame = cv2.warpPerspective(frame, M, (cols,rows))

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