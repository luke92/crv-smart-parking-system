# CRV Smart Parking System Detector

## Requisitos
* CRV Smart Parking System API
* OpenCV (Minimum Version == 3.4.11)
* Requests (Minimum version == 2.24.0)
* Carpeta camera_data con el archivo appsettings.json con la conexion a la API y las credenciales para obtener el Token

## Pasos para instalar requisitos
* python -m pip install opencv-python
* python -m pip install requests

## Configurar detector
* Correr CRV Smart Parking System API (python .\manage.py runserver)
* Configurar valores desde la API de las cámaras
* Configurar homografía desde la app FRONT-END (Homografías)
* Configurar archivo appsettings.json si fuera necesario

## Iniciar modulo de deteccion
* Correr CRV Smart Parking System API (python .\manage.py runserver)
* python main-entrega7.py