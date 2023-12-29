from django.urls import path, include
from .views import fetch_bird_hides_in_ireland, get_all_locations, AddBirdLocation, UpdateBirdLocation, DeleteBirdLocation, register

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', include('django.contrib.auth.urls')),
    path('get_all_locations/', get_all_locations, name='get_all_locations'),
    path('birdhides_ireland/', fetch_bird_hides_in_ireland, name='birdhides_ireland'),
    path('add_location/', AddBirdLocation.as_view(), name='add_location'),
    path('update_location/<int:pk>/', UpdateBirdLocation.as_view(), name='update_location'),
    path('delete_location/<int:pk>/', DeleteBirdLocation.as_view(), name='delete_location'),
]
