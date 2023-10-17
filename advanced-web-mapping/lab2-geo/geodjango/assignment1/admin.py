from django.contrib.gis import admin
from .models import PineMartens

admin.site.register(PineMartens, admin.GISModelAdmin)
