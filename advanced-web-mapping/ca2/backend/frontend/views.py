from django.shortcuts import render




# this view will point to the index page in the frontend app
def indexView(request, *args, **kwargs):
    return render(request, "frontend/index.html")  