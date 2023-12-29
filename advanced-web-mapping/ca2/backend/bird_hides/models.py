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
    id = models.AutoField(primary_key=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    name = models.CharField(max_length=100, blank=True)  # Bird's name
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} at ({self.latitude}, {self.longitude})"
    


class User(models.Model):
    username = models.CharField(max_length=20)
    email = models.EmailField(max_length=30)
    password = models.CharField(max_length=128)

    def __str__(self):
        return str(self.username)

class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.PROTECT,
        primary_key=True,
    )
    lon = models.FloatField()
    lat = models.FloatField()

    def __str__(self):
        return str(self.lon), str(self.lat)