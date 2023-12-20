from django.shortcuts import render, redirect
from .forms import PineMartenForm
from django.contrib import messages
from django.urls import reverse
from django.contrib.auth import login, authenticate
from .forms import SignUpForm
from django.http import JsonResponse
from .encoders import GeoJSONEncoder
import requests
from urllib.parse import quote_plus
from rest_framework import generics
from .models import BirdHides, PineMartens
from assignment1.serializers import BirdHidesSerializer
 
from django.contrib.gis.geos import Point
from geopy.geocoders import Nominatim
 
geolocator = Nominatim(user_agent="location")


class ListCreateGenericViews(generics.ListCreateAPIView):
    queryset = BirdHides.objects.all()
    serializer_class = BirdHidesSerializer
 
    def perform_create(self, serializer):
        address = serializer.initial_data["address"]
        g = geolocator.geocode(address)
        if g is not None:
            lat = g.latitude
            lng = g.longitude
            pnt = Point(lng, lat)
            print(pnt)
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



def fetch_bird_hides_in_ireland():
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
        return response.json()  # Or handle the response as needed
    else:
        # Handle errors
        return None
    
def bird_hide_view(request):
    data = fetch_bird_hides_in_ireland()
    return JsonResponse(data)

# when the server first runs, redirect to the login page 
def redirect_to_login(request):
    return redirect('/assignment1/login/')

from django.http import JsonResponse

def pine_martens_view(request):
    pine_martens = list(PineMartens.objects.values())  # Convert QuerySet to a list of dictionaries

    if request.method == "POST":
        form = PineMartenForm(request.POST)
        if form.is_valid():
            instance = form.save()
            # Returning JSON response
            return JsonResponse({'message': f"You inserted {instance.SiteName} at latitude: {instance.latitude} & longitude: {instance.longitude}"}, status=201)
        else:
            return JsonResponse({'errors': form.errors}, status=400)


    # Sending the list of pine martens and an empty form
    return JsonResponse({'pine_martens': pine_martens}, encoder=GeoJSONEncoder)



def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Signup successful'}, status=201)
        else:
            return JsonResponse({'errors': form.errors}, status=400)
    else:
        form = SignUpForm()
        return JsonResponse({'form': form.as_p()})

