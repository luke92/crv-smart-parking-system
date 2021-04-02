from django.db import models

class Audits(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, null=True)
    fecha = models.DateTimeField(default=0, null=True)
    tipo = models.CharField(max_length=50, null=True)
    operacion = models.CharField(max_length=50, null=True)
    detalle = models.CharField(max_length=512, null=True)
    def __str__(self):
        return "id: {} fecha: {} username: {} operacion: {}".format(self.id, self.fecha, self.username, self.operacion)