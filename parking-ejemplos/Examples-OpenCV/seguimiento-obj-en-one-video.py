
# Importamos las librerías necesarias
import numpy as np
import cv2
import time
import model.vehiculo as vh
import random
vehiculosCam1=[]

# Cargamos el vídeo
camara = cv2.VideoCapture("videos/parking-one-vehicle.mp4")
#camara = cv2.VideoCapture("videos/parking-two-vehicles.mp4")

# Inicializamos el primer frame a vacío.
# Nos servirá para obtener el fondo
fondo = None
 
# Recorremos todos los frames
while True:
	# Obtenemos el frame
	(grabbed, frame) = camara.read()
 
	# Si hemos llegado al final del vídeo salimos
	if not grabbed:
		break
 
	# Convertimos a escala de grises
	gris = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
 
	# Aplicamos suavizado para eliminar ruido
	gris = cv2.GaussianBlur(gris, (21, 21), 0)
 
	# Si todavía no hemos obtenido el fondo, lo obtenemos
	# Será el primer frame que obtengamos
	if fondo is None:
		fondo = gris
		continue
 
	# Calculo de la diferencia entre el fondo y el frame actual
	resta = cv2.absdiff(fondo, gris)
 
	# Aplicamos un umbral
	umbral = cv2.threshold(resta, 25, 255, cv2.THRESH_BINARY)[1]
 
	# Dilatamos el umbral para tapar agujeros
	umbral = cv2.dilate(umbral, None, iterations=2)
 
	# Copiamos el umbral para detectar los contornos
	contornosimg = umbral.copy()
 
	# Buscamos contorno en la imagen
	im, contornos, hierarchy = cv2.findContours(contornosimg,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
 
	# Recorremos todos los contornos encontrados
	for c in contornos:
		# Eliminamos los contornos más pequeños
		if cv2.contourArea(c) < 500:
			continue
 
		# Obtenemos el bounds del contorno, el rectángulo mayor que engloba al contorno
		(x, y, w, h) = cv2.boundingRect(c)
		# Dibujamos el rectángulo del bounds
		cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
		
		#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		
		newVh = True

		for vhcam1 in vehiculosCam1:
			if vhcam1.collide(x, y, 15):
				vhcam1.actualizarCoordenadas(x, y)
				vhcam1.actualizarTamanio(w, h)
				vhcam1.presentarse()
				newVh = False

		if newVh:
			char = "ABCDEFGHIJKLMNOPQRSTUVWYZ"
			letra_aleatoria1 = random.choice(char)
			letra_aleatoria2 = random.choice(char)
			letra_aleatoria3 = random.choice(char)
			numero = "0123456789"
			numero_aleatorio1 = random.choice(numero)
			numero_aleatorio2 = random.choice(numero)
			numero_aleatorio3 = random.choice(numero)
			patente = letra_aleatoria1 + letra_aleatoria2 + letra_aleatoria3 + numero_aleatorio1 + numero_aleatorio2 + numero_aleatorio3
			vehiculosCam1.append(vh.Vehiculo(patente, x, y, w, h))		
			print("Soy nuevo VH en " + "EjeX: " + str(x) + " EjeY: " + str(y) +" Ancho: "+ str(w) +" Alto: "+ str(h))

		#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	# Mostramos las imágenes de la cámara, el umbral y la resta
	cv2.imshow("Camara", frame)
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
camara.release()
cv2.destroyAllWindows()

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

print("****************************************************************")
print("****************************************************************")
print("A continuacion... todos los vehiculos de la camara 1")
print("")
for vhcam1 in vehiculosCam1:
	vhcam1.presentarse()

print("****************************************************************")
print("****************************************************************")

#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
