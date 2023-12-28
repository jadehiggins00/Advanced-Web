from django.urls import path
from .views import fetch_bird_hides_in_ireland, get_all_locations, AddBirdLocation

urlpatterns = [
    path('get_all_locations/', get_all_locations, name='get_all_locations'),
    path('birdhides_ireland/', fetch_bird_hides_in_ireland, name='birdhides_ireland'),
    path('add_location/', AddBirdLocation.as_view(), name='add_location'),
]
