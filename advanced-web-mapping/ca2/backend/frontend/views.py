from django.shortcuts import render




# frontend/views.py
import logging
from django.shortcuts import render

logger = logging.getLogger(__name__)

def indexView(request):
    logger.debug("Rendering indexView with index.html")
    return render(request, 'index.html')


# def get_all_locations(request):
#     if request.method == 'GET':
#         locations = BirdLocation.objects.all()
#         data = list(locations.values('latitude', 'longitude', 'name', 'description'))
#         return JsonResponse({'locations': data}, status=200)