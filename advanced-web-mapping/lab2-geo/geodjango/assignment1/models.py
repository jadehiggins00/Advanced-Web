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


class PineMartens(models.Model):
    OBJECTID = models.BigAutoField(primary_key=True)
    TAXON_LATI = models.CharField(max_length=75, null=True, blank=True)
    SAMPLE_SPA = models.CharField(max_length=40, null=True, blank=True)
    SURVEY_NAM = models.CharField(max_length=100, null=True, blank=True)
    SAMPLE_YEA = models.DecimalField(max_digits=19, decimal_places=11, null=True, blank=True)
    DatasetTit = models.CharField(max_length=254, null=True, blank=True)
    StartDate = models.DateField( null=True, blank=True)
    EndDate = models.DateField( null=True, blank=True)
    SiteName = models.CharField(max_length=254, null=True, blank=True)
    GridRefere = models.CharField(max_length=254, null=True, blank=True)
    Source = models.CharField(max_length=254,  null=True, blank=True)
    RecordDate = models.DateField( null=True, blank=True)
    x_coord_IG = models.BigIntegerField( null=True, blank=True)
    y_coord_IG = models.BigIntegerField( null=True, blank=True)
    Input_file = models.CharField(max_length=100, null=True, blank=True)
    Source_file = models.CharField(max_length=100, null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    geometry = models.PointField(null=True, blank=True)


    def save(self, *args, **kwargs):
      # Automatically set the geometry based on the latitude and longitude
      if self.latitude and self.longitude:
          self.geometry = Point(self.longitude, self.latitude)
      super(PineMartens, self).save(*args, **kwargs)


      # Returns the string representation of the model.
    def __str__(self):
      return self.TAXON_LATI
    

class User(models.Model):
    username = models.CharField(max_length=20)
    email = models.EmailField(max_length=30)
    password = models.CharField(max_length=15)

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

