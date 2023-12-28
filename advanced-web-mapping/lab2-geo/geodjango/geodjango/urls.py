"""
URL configuration for geodjango project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

from django.urls import path, include
from assignment1.views import signup, pine_martens_view, bird_hide_view





urlpatterns = [
<<<<<<< HEAD
    # path('', redirect_to_login, name='redirect-to-login'),
    path('admin/', admin.site.urls),
    # path("assignment1/", include("django.contrib.auth.urls")), 
    # path('assignment1/', include('assignment1.urls')),
    path('', include('assignment1.urls')),
    path('', include('pwa.urls')),
=======
    path('admin/', admin.site.urls),
   # path('assignment1/', include('django.contrib.auth.urls')),
    # path('assignment1/pine-martens/', pine_martens_view, name='pine-martens'),
    # path('assignment1/bird-watch/', bird_hide_view, name='bird-watch'),
    #path('assignment1/signup/', signup, name='signup'),
>>>>>>> 0130e62667ecc81662a9b993e1e9f060a744c636
    path("api/v1/", include('assignment1.urls')),


    # ... other URL patterns
]