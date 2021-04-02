from django.db import models

class Reports(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    url = models.CharField(max_length=500)
    active = models.BooleanField(default=True)
    def __str__(self):
        return "name {} url {} active {}".format(self.name, self.url, self.active)