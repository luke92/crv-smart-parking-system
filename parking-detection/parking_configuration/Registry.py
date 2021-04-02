import cv2

class Registry:
	def __init__(self,_id,_fecha,_idParking,_patente,_tipo,_cameraId):
		self.id = _id
		self.fecha = _fecha
		self.idParking = _idParking
		self.patente = _patente
		self.tipo = _tipo
		self.cameraId = _cameraId
	
	def __str__(self):
		return "id: {} fecha: {} idParking: {} patente: {} tipo: {} cameraId: {}".format(self.id, self.fecha, self.idParking, self.patente, self.tipo, self.cameraId)