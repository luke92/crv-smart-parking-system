import cv2

class CameraPatent:
	def __init__(self, _id, _name, _url, _rtmp, _x_izqsup, _y_izqsup, _x_izqinf, _y_izqinf, _x_dersup, _y_dersup, _x_derinf, _y_derinf, _id_camera, _distance_sensor, _width, _height, _lastFrameImageBase64):
		self.id = _id
		self.name = _name
		self.url = _url
		self.rtmp = _rtmp
		self.x_izqsup = _x_izqsup
		self.y_izqsup = _y_izqsup
		self.x_izqinf = _x_izqinf
		self.y_izqinf = _y_izqinf
		self.x_dersup = _x_dersup
		self.y_dersup = _y_dersup
		self.x_derinf = _x_derinf
		self.y_derinf = _y_derinf
		self.id_camera = _id_camera
		self.distance_sensor = _distance_sensor
		self.width = _width
		self.height = _height
		self.lastFrameImageBase64 = _lastFrameImageBase64
		
	def __repr__(self):
		return "Camara_Patent(id: {} name: {} url: {} rtmp: {} resolution: ({},{}) distance_sensor: {})".format(self.id, self.name, self.url, self.rtmp, self.width, self.height, self.distance_sensor)