from django.db import models

class Camera_Patent(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500, null=True)
    #fuente de video
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
    id_camera = models.IntegerField(default=0, null=False)
    distance_sensor = models.IntegerField(default=0, null=False)
    #resolucion y ubicacion
    width = models.IntegerField(default=0, null=False)
    height = models.IntegerField(default=0, null=False)
    lastFrameImageBase64 = models.TextField(default="", null =False)
    def __str__(self):
        return "id: {} name: {} configHttp: {} configRtmp: {} resolution: ({},{}) distance_sensor: {}".format(self.id, self.name, self.url, self.rtmp, self.width, self.height, self.distance_sensor)