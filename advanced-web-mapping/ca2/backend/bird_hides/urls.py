from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BirdHideViewSet, fetch_bird_hides_in_ireland

router = DefaultRouter()
router.register(r'birdhides', BirdHideViewSet)

urlpatterns = [
    path('', include(router.urls)),
   path("birdhides", BirdHideViewSet.as_view({'get': 'list'})),
       path('birdhides_ireland', fetch_bird_hides_in_ireland, name='birdhides_ireland'),

]