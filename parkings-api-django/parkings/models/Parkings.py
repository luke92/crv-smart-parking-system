from django.db import models


class Parkings(models.Model):
    id = models.AutoField(primary_key=True)
    tl_x = models.IntegerField(default=0, null=False)
    tl_y = models.IntegerField(default=0, null=False)
    br_x = models.IntegerField(default=0, null=False)
    br_y = models.IntegerField(default=0, null=False)
    isOccupied = models.BooleanField(default=False)
    patent = models.CharField(max_length=50, null=True)
    cameraId =  models.IntegerField(default=0, null=True)
    def __str__(self):
        return "id: {} ({},{}) isOccupied: {} patent: {} cameraId: {}".format(self.id, self.tl_x, self.tl_y, self.isOccupied, self.patent, self.cameraId)
