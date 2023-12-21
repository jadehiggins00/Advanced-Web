from assignment1.models import BirdHides
from rest_framework import serializers
 
class BirdHidesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BirdHides
        fields = ("id", "name", "address", "location")
        extra_kwargs = {"location": {"read_only": True}}