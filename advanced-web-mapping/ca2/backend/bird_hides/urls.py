from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BirdSpotsViewSet, fetch_bird_hides_in_ireland, add_bird_location

# router = DefaultRouter()
# router.register(r'birdhides', BirdHideViewSet)


# Create instances of BirdHideViewSet for different actions
birdhides_list = BirdSpotsViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

urlpatterns = [
    # path('', include(router.urls)),
    path('birdhides/', birdhides_list, name='birdhides_list'),
 
    path('birdhides_ireland', fetch_bird_hides_in_ireland, name='birdhides_ireland'),
    path('add_location/', add_bird_location, name='add_location'),
]