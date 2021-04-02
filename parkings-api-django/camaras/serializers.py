from rest_framework import serializers
from .models.Camaras import Camaras
from .models.Camera_Patent import Camera_Patent

class CamarasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camaras
        fields = ("id", "name", "ip", "port", "url", "rtmp", "x_izqsup", "y_izqsup", "x_izqinf", "y_izqinf", "x_dersup", "y_dersup", "x_derinf", "y_derinf", "filtro_contorno", "radio_parking", "radio_vehiculo", "width", "height", "matrix_camera_row", "matrix_camera_column","lastFrameImageBase64","lastFrameDrawImg64")

class CameraPatentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Camera_Patent
        fields = ("id", "name", "url", "rtmp", "x_izqsup", "y_izqsup", "x_izqinf", "y_izqinf", "x_dersup", "y_dersup", "x_derinf", "y_derinf", "id_camera", "distance_sensor", "width", "height", "lastFrameImageBase64")
