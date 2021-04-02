from django.db import models

class Patents(models.Model):
    id = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=500, null=True) 
    descripcion = models.CharField(max_length=500, null=True) 
    nomenclatura = models.CharField(max_length=500, null=True)

    def __str__(self):
        return "id: {} decripcion: {}".format(self.id, self.descripcion)
