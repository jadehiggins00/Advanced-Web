from django.contrib.gis.db import models
from django.contrib.gis.geos import Point


class BirdHides(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    location = models.PointField(null=True) # Spatial Field Types


class BirdSpots(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    location = models.PointField(null=True) # Spatial Field Types


class BirdLocation(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    name = models.CharField(max_length=100, blank=True)  # Bird's name
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} at ({self.latitude}, {self.longitude})"