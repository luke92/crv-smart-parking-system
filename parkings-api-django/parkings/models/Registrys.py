from django.db import models


class Registrys(models.Model):
    id = models.AutoField(primary_key=True)
    fecha = models.DateTimeField(default=0, null=True)
    idParking = models.IntegerField(default=0, null=True)
    patente = models.CharField(max_length=50, null=True)
    tipo = models.BooleanField(default=False)
    cameraId = models.IntegerField(default=0, null=True)
    def __str__(self):
        return "id: {} fecha: {} idParking: {} patente: {} tipo: {} cameraId: {}".format(self.id, self.fecha, self.idParking, self.patente, self.tipo, self.cameraId)
