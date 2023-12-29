from django.urls import path, include
from .views import fetch_bird_hides_in_ireland, get_all_locations, AddBirdLocation, UpdateBirdLocation, DeleteBirdLocation,logout_view, login_view, session_view,whoami_view

urlpatterns = [
    # path('register/', register, name='register'),
    # path('login/', login_view, name='login'),
    path('login/', login_view, name='api-login'),
    path('logout/', logout_view, name='api-logout'),
    path('session/', session_view, name='api-session'),
    path('whoami/', whoami_view, name='api-whoami'),
    path('get_all_locations/', get_all_locations, name='get_all_locations'),
    path('birdhides_ireland/', fetch_bird_hides_in_ireland, name='birdhides_ireland'),
    path('add_location/', AddBirdLocation.as_view(), name='add_location'),
    path('update_location/<int:pk>/', UpdateBirdLocation.as_view(), name='update_location'),
    path('delete_location/<int:pk>/', DeleteBirdLocation.as_view(), name='delete_location'),
]
