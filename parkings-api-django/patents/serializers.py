from rest_framework import serializers
from .models.Patents import Patents

class PatentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patents
        fields = ("id", "tipo", "descripcion", "nomenclatura")
