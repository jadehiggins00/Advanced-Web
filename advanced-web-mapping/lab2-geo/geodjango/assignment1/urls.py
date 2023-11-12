from django.urls import path, include

from . import views

 
# urlpatterns = [
#     path('add/', views.add_pine_marten, name='add_pine_marten'),
#     path('pine-martens/', views.pine_martens_list, name='pine_martens_list'),
# ]

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', include('django.contrib.auth.urls')),  

    path('pine-martens/', views.pine_martens_view, name='pine_martens_list'),
]
