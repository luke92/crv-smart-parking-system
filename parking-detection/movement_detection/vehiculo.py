import math
from configCRV import radioVehiculo

class Vehiculo(): #Creamos la clase vehiculo
    def __init__(self, patente, x, y, w, h):
        self.patente = patente
        self.x = x
        self.y = y
        self.r = radioVehiculo
        self.w = w 
        self.h = h 

        #Creación de un nuevo método
    def presentarse(self):
        presentacion = ("Soy el vehiculo {}, coordenada {}-{} y tamaño {}x{}") #Mensaje
        print(presentacion.format(self.patente, self.x, self.y, self.w, self.h)) #Usamos FORMAT

    def getPatente(self):
        return self.patente

    def actualizarCoordenadasTamanio(self, x, y, w, h):
        self.x = x
        self.y = y
        self.w = w
        self.h = h

    #*****************************************************************************************

    def distance(self, x2, y2):
        return math.sqrt(abs(x2 - self.x)**2 + abs(y2 - self.y)**2)

    def collide(self, x2, y2, r2):
        return self.r + r2 > self.distance(x2, y2)

    #*****************************************************************************************
