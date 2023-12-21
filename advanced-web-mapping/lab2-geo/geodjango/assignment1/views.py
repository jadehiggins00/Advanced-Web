from django.shortcuts import render, redirect
from .models import PineMartens
from .forms import PineMartenForm
from django.contrib import messages
from django.urls import reverse
from django.contrib.auth import login, authenticate
from .forms import SignUpForm
import logging
from rest_framework import generics
from .models import BirdHides, PineMartens
from assignment1.serializers import BirdHidesSerializer

from django.contrib.gis.geos import Point
from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="location")


logger = logging.getLogger(__name__)


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


# when the server first runs, redirect to the login page 
def redirect_to_login(request):
    logger.debug("Request received")
    return redirect('/assignment1/login/')

def pine_martens_view(request):
    pine_martens = PineMartens.objects.all()
    
    if request.method == "POST":
        form = PineMartenForm(request.POST)
        if form.is_valid():
            instance = form.save()
            messages.success(request, f"You inserted {instance.SiteName} at latitude: {instance.latitude} & longitude: {instance.longitude}")
            return render(request, 'index.html', {'pine_martens': pine_martens, 'form': form, 'recently_added': instance})

        # if form.is_valid():
        #     instance = form.save()
        #     messages.success(request, f"You inserted {instance.SiteName} at latitude: {instance.latitude} & longitude: {instance.longitude}")
        #     return redirect('pine_martens_list') 
    else:
        form = PineMartenForm()

    return render(request, 'index.html', {'pine_martens': pine_martens, 'form': form})



def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect(reverse('login'))
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})
