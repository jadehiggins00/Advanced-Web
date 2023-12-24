from django.shortcuts import render
import requests
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Adjust according to your project structure
django.setup()
from urllib.parse import quote_plus
from rest_framework import generics
from .models import BirdHides, BirdSpots, BirdLocation
from bird_hides.serializers import BirdSpotsSerializer
from rest_framework import viewsets
from django.contrib.gis.geos import Point
from geopy.geocoders import Nominatim
from django.http import JsonResponse
import requests
import logging
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt
import json

logger = logging.getLogger(__name__)


geolocator = Nominatim(user_agent="location")



@csrf_exempt
def add_bird_location(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            latitude = data['latitude']
            longitude = data['longitude']
            name = data.get('name', '')  # Optional
            description = data.get('description', '')  # Optional

            location = BirdLocation(latitude=latitude, longitude=longitude, name=name, description=description)
            location.save()

            return JsonResponse({'message': 'Location added successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


# views.py
from django.http import JsonResponse

def get_all_locations(request):
    if request.method == 'GET':
        try:
            locations = BirdLocation.objects.all()
            data = list(locations.values('latitude', 'longitude', 'name', 'description'))
            return JsonResponse({'locations': data}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)



# class BirdSpotsViewSet(viewsets.ModelViewSet):
#     queryset = BirdSpots.objects.all()
#     serializer_class = BirdSpotsSerializer

  

#     def perform_create(self, serializer):
#         address = serializer.initial_data["address"]

#         try:
#             g = geolocator.geocode(address)
#             if g is not None:
#                 lat = g.latitude
#                 lng = g.longitude
#                 pnt = Point(lng, lat)
#                 serializer.save(location=pnt)
#             else:
#                 logger.info(f"Address {address} could not be geocoded.")
#         except Exception as e:
#             logger.error(f"Geocoding error: {e}")


# class BirdHideViewSet(viewsets.ModelViewSet):
#     queryset = BirdSpots.objects.all()
#     serializer_class = BirdSpotsSerializer

#     def perform_create(self, serializer):
#         lat = self.request.data.get('latitude')
#         lng = self.request.data.get('longitude')
#         if lat and lng:
#             location = Point(float(lng), float(lat))
#             serializer.save(location=location)
#         else:
#             serializer.save()

# class BirdHidesUpdateRetreiveView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = BirdHides.objects.all()
#     serializer_class = BirdHidesSerializer

#     def perform_update(self, serializer):
#         address = serializer.initial_data["address"]
#         try: 
#             g = geolocator.geocode(address)
#             if g is not None:
#                 lat = g.latitude
#                 lng = g.longitude
#                 pnt = Point(lng, lat)
#                 print(pnt)
#                 serializer.save(location=pnt)
#             else:
#                 print(f"Address {address} could not be geocoded.")
#         except Exception as e:
#             print(f"Geocoding error: {e}")

def fetch_bird_hides_in_ireland(request):
    query = """
    [out:json];
    area["name"="Ireland"]->.searchArea;
    (
      way["leisure"="bird_hide"](area.searchArea);
      relation["leisure"="bird_hide"](area.searchArea);
    );
    out body;
    >;
    out skel qt;
    """
    encoded_query = quote_plus(query)
    url = f"http://overpass-api.de/api/interpreter?data={encoded_query}"

    response = requests.get(url)
    if response.status_code == 200:
        return JsonResponse(response.json())  # Returning a JsonResponse
    else:
        # Handle errors
        return JsonResponse({'error': 'Failed to fetch data'}, status=500)