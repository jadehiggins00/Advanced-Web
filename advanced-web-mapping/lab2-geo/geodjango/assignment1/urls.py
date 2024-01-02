from django.urls import path, include

from . import views
from . import views
from django.views.generic.base import RedirectView

from .views import BirdHidesUpdateRetreiveView, ListCreateGenericViews
 


urlpatterns = [

    # path('signup/', views.signup, name='signup'),
    # path('login/', include('django.contrib.auth.urls')),  

    path('pine-martens/', views.pine_martens_view, name='pine_martens_list'),
    # path('', RedirectView.as_view(url=reverse_lazy('login')), name='root'),
  #  path('signup/', views.signup, name='signup'),
  #  path('login/', include('django.contrib.auth.urls')),  
    # path('pine-martens/', views.pine_martens_view, name='pine_martens_list'),
    path("birdhides", ListCreateGenericViews.as_view()),
    path(
        "birdhides/<str:pk>",
        BirdHidesUpdateRetreiveView.as_view(),
    ),
]
