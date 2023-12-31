<<<<<<< HEAD
from django.urls import path, include

from .views import BirdHidesUpdateRetreiveView, ListCreateGenericViews
=======
from django.urls import path, include, reverse_lazy
>>>>>>> 0130e62667ecc81662a9b993e1e9f060a744c636
from . import views
from django.views.generic.base import RedirectView
from .views import BirdHidesUpdateRetreiveView, ListCreateGenericViews
 


urlpatterns = [
<<<<<<< HEAD
    # path('signup/', views.signup, name='signup'),
    # path('login/', include('django.contrib.auth.urls')),  

=======
    # path('', RedirectView.as_view(url=reverse_lazy('login')), name='root'),
  #  path('signup/', views.signup, name='signup'),
  #  path('login/', include('django.contrib.auth.urls')),  
>>>>>>> 0130e62667ecc81662a9b993e1e9f060a744c636
    # path('pine-martens/', views.pine_martens_view, name='pine_martens_list'),
    path("birdhides", ListCreateGenericViews.as_view()),
    path(
        "birdhides/<str:pk>",
        BirdHidesUpdateRetreiveView.as_view(),
    ),
]
