from django.shortcuts import render
import requests
from urllib.parse import quote_plus
from rest_framework import generics
from .models import BirdHides
from bird_hides.serializers import BirdHidesSerializer
from rest_framework import viewsets
from django.contrib.gis.geos import Point
from geopy.geocoders import Nominatim
from django.http import JsonResponse
import requests

geolocator = Nominatim(user_agent="location")


class BirdHideViewSet(viewsets.ModelViewSet):
    queryset = BirdHides.objects.all()
    serializer_class = BirdHidesSerializer

    def perform_create(self, serializer):
        address = serializer.initial_data["address"]
        g = geolocator.geocode(address)
        if g is not None:
            lat = g.latitude
            lng = g.longitude
            pnt = Point(lng, lat)
            serializer.save(location=pnt)
        else:
            # Handle the case where the address could not be geocoded
            print(f"Address {address} could not be geocoded.")


class BirdHidesUpdateRetreiveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BirdHides.objects.all()
    serializer_class = BirdHidesSerializer

    def perform_update(self, serializer):
        address = serializer.initial_data["address"]
        g = geolocator.geocode(address)
        lat = g.latitude
        lng = g.longitude
        pnt = Point(lng, lat)
        print(pnt)
        serializer.save(location=pnt)


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