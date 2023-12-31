from rest_framework import serializers
from .models import BirdLocation

class BirdLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BirdLocation
        fields = ['id', 'latitude', 'longitude', 'name', 'description']
