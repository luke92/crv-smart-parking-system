from rest_framework import serializers
from .models.Parkings import Parkings
from .models.Configuration import Configuration
from .models.Registrys import Registrys
from .models.Reports import Reports
from .models.Audits import Audits

class ParkingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parkings
        fields = ("id", "tl_x", "tl_y", "br_x", "br_y", "isOccupied","patent","cameraId")

class ConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuration
        fields = ("key", "value")

class RegistrysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registrys
        fields = ("id", "fecha", "idParking", "patente", "tipo", "cameraId")

class ReportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reports
        fields = ("id", "name", "description", "url", "active")

class AuditsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Audits
        fields = ("id", "username", "fecha", "tipo", "operacion", "detalle")