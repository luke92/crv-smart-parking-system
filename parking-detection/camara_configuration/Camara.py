import cv2

class Camara:
	def __init__(self, _id, _name, _ip, _port, _x_izqsup, _y_izqsup, _x_izqinf, _y_izqinf, _x_dersup, _y_dersup, _x_derinf, _y_derinf, _filtro_contorno, _radio_parking, _radio_vehiculo, width, height, matrix_camera_row, matrix_camera_column, _url, _lastFrameImageBase64, _lastFrameDrawImg64, _rtmp):
		self.id = _id
		self.name = _name
		self.ip = _ip
		self.port = _port
		self.x_izqsup = _x_izqsup
		self.y_izqsup = _y_izqsup
		self.x_izqinf = _x_izqinf
		self.y_izqinf = _y_izqinf
		self.x_dersup = _x_dersup
		self.y_dersup = _y_dersup
		self.x_derinf = _x_derinf
		self.y_derinf = _y_derinf
		self.filtro_contorno = _filtro_contorno
		self.radio_parking = _radio_parking
		self.radio_vehiculo = _radio_vehiculo
		self.width = width
		self.height = height
		self.matrix_camera_row = matrix_camera_row
		self.matrix_camera_column = matrix_camera_column
		self.url = _url
		self.lastFrameImageBase64 = _lastFrameImageBase64
		self.lastFrameDrawImg64 = _lastFrameDrawImg64
		self.rtmp = _rtmp
	
	def __repr__(self):
		return "Camara(id: {}, name: {}, url: {} rtmp: {})".format(self.id,self.name,self.url, self.rtmp)