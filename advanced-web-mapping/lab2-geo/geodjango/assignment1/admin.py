from django.contrib.gis import admin
from .models import PineMartens, BirdHides
from leaflet.admin import LeafletGeoAdmin

admin.site.register(PineMartens, admin.GISModelAdmin)




 

@admin.register(BirdHides)

class BirdHidesAdmin(LeafletGeoAdmin):

    list_display = ("id", "name", "address", "location", "created_at", "updated_at")