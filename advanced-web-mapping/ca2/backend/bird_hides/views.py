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
from .models import User
from django.contrib.auth.hashers import make_password
from .forms import SignUpForm
from django.views.decorators.csrf import csrf_exempt
import json
from backend import app_settings
from django.contrib.auth import authenticate, login
from django.http import JsonResponse

logger = logging.getLogger(__name__)


geolocator = Nominatim(user_agent="location")

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.username})


# def login_view(request):
#     username = request.POST.get('username')
#     password = request.POST.get('password')
#     user = authenticate(request, username=username, password=password)
#     if user is not None:
#         login(request, user)
#         return JsonResponse({"status": "success"})
#     else:
#         return JsonResponse({"status": "error", "message": "Invalid credentials"})



# @csrf_exempt
# def register(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         username = data.get('username')
#         email = data.get('email')
#         password = data.get('password')

#         # Create new user
#         user = User.objects.create(
#             username=username,
#             email=email,
#             password=make_password(password)  # Hash the password
#         )

#         return JsonResponse({'message': 'User created successfully.'}, status=201)
#     return JsonResponse({'error': 'Invalid request'}, status=400)


# def signup(request):
#     if request.method == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return JsonResponse({'message': 'Signup successful'}, status=201)
#         else:
#             return JsonResponse({'errors': form.errors}, status=400)
#     else:
#         form = SignUpForm()
#         return JsonResponse({'form': form.as_p()})

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

from django.http import JsonResponse

def get_all_locations(request):
    if request.method == 'GET':
        try:
            locations = BirdLocation.objects.all()
            data = list(locations.values('id','latitude', 'longitude', 'name', 'description'))
            return JsonResponse({'locations': data}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)



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