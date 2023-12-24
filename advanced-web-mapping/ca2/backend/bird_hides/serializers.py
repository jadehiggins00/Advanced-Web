from bird_hides.models import BirdSpots
from rest_framework import serializers

class BirdSpotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BirdSpots
        fields = ("id", "name", "address", "location")
        extra_kwargs = {"location": {"read_only": True}}