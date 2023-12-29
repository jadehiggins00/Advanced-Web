from django.shortcuts import render
import requests
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Adjust according to your project structure
django.setup()
from urllib.parse import quote_plus
from rest_framework import generics
from .models import BirdHides, BirdSpots, BirdLocation
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import BirdLocationSerializer
from django.contrib.gis.geos import Point
from geopy.geocoders import Nominatim
from django.http import JsonResponse
import requests
import logging
from django.http import JsonResponse
from django.http import HttpResponse


from django.views.decorators.csrf import csrf_exempt
import json
from backend import app_settings

logger = logging.getLogger(__name__)


geolocator = Nominatim(user_agent="location")

# add bird spot location
class AddBirdLocation(APIView):
    def post(self, request):
        serializer = BirdLocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#update 
class UpdateBirdLocation(APIView):
    def put(self, request, pk):
        try:
            bird_location = BirdLocation.objects.get(pk=pk)
        except BirdLocation.DoesNotExist:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = BirdLocationSerializer(bird_location, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteBirdLocation(APIView):
    def delete(self, request, pk):
        try:
            bird_location = BirdLocation.objects.get(pk=pk)
        except BirdLocation.DoesNotExist:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        bird_location.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def service_worker(request):
    response = HttpResponse(
        open(app_settings.PWA_SERVICE_WORKER_PATH).read(), content_type="application/javascript"
    )
    return response


def manifest(request):
    return render(
        request,
        "manifest.json",
        {
            setting_name: getattr(app_settings, setting_name)
            for setting_name in dir(app_settings)
            if setting_name.startswith("PWA_")
        },
        content_type="application/json",
    )


def offline(request):
    return render(request, "offline.html")


# @csrf_exempt
# def add_bird_location(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             latitude = data['latitude']
#             longitude = data['longitude']
#             name = data.get('name', '')  # Optional
#             description = data.get('description', '')  # Optional

#             location = BirdLocation(latitude=latitude, longitude=longitude, name=name, description=description)
#             location.save()

#             return JsonResponse({'message': 'Location added successfully!'}, status=200)
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=400)


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


# class BirdHide(viewsets.ModelViewSet):
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