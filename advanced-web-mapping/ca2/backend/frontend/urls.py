from django.urls import path
from .views import indexView


urlpatterns = [
    path('', indexView),  # add the view to the url
  
]