from django.contrib.gis.db import models
from django.contrib.gis.geos import Point


class BirdHides(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    location = models.PointField(null=True) # Spatial Field Types

    def __str__(self) -> str:
        return self.name