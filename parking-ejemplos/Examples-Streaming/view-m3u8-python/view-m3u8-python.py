import cv2
import numpy as np

#Lectura de las camaras y su configuracion.
homografiaCam1 = [[103,309],[87,625],[555,310],[684,631]]
filtroContorno1 = 1500
#Puntos origen
pts1cam1 = np.float32(homografiaCam1)
#Puntos destino
pts2cam1 = np.float32([[0,0],[0,350],[400,0],[400,350]])
#Se calcula la matriz para la corrección de perspectiva
M1 = cv2.getPerspectiveTransform(pts1cam1,pts2cam1)

vcap = cv2.VideoCapture("http://localhost:8080/hls/camara1.m3u8")
while(1):
    # Obtenemos el frame
    grabbed1, frame1 = vcap.read()
    
	#Obtenemos la imagen con corrección de pespectiva
    frame1 = cv2.warpPerspective(frame1, M1, (400,350))
    
    cv2.imshow('video', frame1)
    cv2.waitKey(1)