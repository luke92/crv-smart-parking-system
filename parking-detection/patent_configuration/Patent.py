import cv2

class Patent:
	def __init__(self, _id, _tipo, _descripcion, _nomenclatura):
		self.id = _id
		self.tipo = _tipo
		self.descripcion = _descripcion
		self.nomenclatura = _nomenclatura
	
	def __repr__(self):
		return "Patent(id: {}, descripcion: {}, nomenclatura: {})".format(self.id, self.descripcion, self.nomenclatura)

