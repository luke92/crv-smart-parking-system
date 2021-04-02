import os

class Commands:

    @staticmethod
    #Clear Screen
    def cls():
        os.system('cls' if os.name=='nt' else 'clear')
    
    @staticmethod
    #Get path of tesseract
    def getPathTesseract():
        if(os.name == 'nt'):
            return r'C:\Program Files\Tesseract-OCR\tesseract'
        return '/usr/local/bin/tesseract'