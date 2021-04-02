
# Importamos las librerías necesarias
import cv2
import pytesseract
import re

def mostrarTexto(filePath):
	img = cv2.imread(filePath)
	text = pytesseract.image_to_string(img)
	textLimpio = text.strip()
	textLimpio = textLimpio.replace(" ", "")
	print("Texto: " + textLimpio)
	esPatenteValida(textLimpio)
	cv2.imshow('Imagen', img)
	cv2.waitKey(0)
	cv2.destroyAllWindows()

def esPatenteValida(pseudoPatent):
	expresiones=["[A-Z]{2}[0-9]{3}[A-Z]{2}",
				"[A-Z][0-9]{3}[A-Z]{3}",
				"[0-9]{3}[A-Z]{4}",
				"[A-Z]{3}[0-9]{4}"]
	for exp in expresiones:
		#x = re.match(exp, pseudoPatent) Exacto		
		x = re.search(exp, pseudoPatent)
		if(x != None):
			print("Es una patente valida")
			return
	print("NO es una patente valida")


#esPatenteValida("AA999AA")
#esPatenteValida("A999AAA")
#esPatenteValida("999AAAA")
#esPatenteValida("AAA9999")
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'
mostrarTexto('images/patente1.jpg')
#mostrarTexto('images/no-estacionar.jpg')
