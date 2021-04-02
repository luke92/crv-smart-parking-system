from django.db import models

class Camaras(models.Model):
    id = models.AutoField(primary_key=True)

    #parte config de camara
    name = models.CharField(max_length=500, null=True) 
    ip = models.CharField(max_length=500, null=True) 
    port = models.IntegerField(default=0, null=True)
    url = models.CharField(max_length=1000, null=True)
    rtmp = models.CharField(max_length=1000, null=True)
    #parte para hacer la homografia
    x_izqsup = models.IntegerField(default=0, null=False)
    y_izqsup = models.IntegerField(default=0, null=False)
    x_izqinf = models.IntegerField(default=0, null=False)
    y_izqinf = models.IntegerField(default=0, null=False)
    x_dersup = models.IntegerField(default=0, null=False)
    y_dersup = models.IntegerField(default=0, null=False)
    x_derinf = models.IntegerField(default=0, null=False)
    y_derinf = models.IntegerField(default=0, null=False)
    #parte de ajustes de la camara
    filtro_contorno = models.IntegerField(default=0, null=False)
    radio_parking = models.IntegerField(default=0, null=False)
    radio_vehiculo = models.IntegerField(default=0, null=False)
    #resolucion y ubicacion
    width = models.IntegerField(default=0, null=False)
    height = models.IntegerField(default=0, null=False)
    matrix_camera_row = models.IntegerField(default=0, null=False)
    matrix_camera_column = models.IntegerField(default=0, null=False)
    lastFrameImageBase64 = models.TextField(default="", null =False)
    lastFrameDrawImg64 = models.TextField(default="", null =False)
    def __str__(self):
        return "id: {} name: {} configHttp: {} configRtmp: {} resolution: ({},{}) location: ({},{})".format(self.id, self.name, self.url, self.rtmp, self.width, self.height, self.matrix_camera_row, self.matrix_camera_column)
