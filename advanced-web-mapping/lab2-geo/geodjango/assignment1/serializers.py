from assignment1.models import BirdHides
from rest_framework import serializers
<<<<<<< HEAD
 
=======
<<<<<<< HEAD

=======
 
>>>>>>> 0130e62667ecc81662a9b993e1e9f060a744c636
>>>>>>> deploy-v2
class BirdHidesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BirdHides
        fields = ("id", "name", "address", "location")
        extra_kwargs = {"location": {"read_only": True}}