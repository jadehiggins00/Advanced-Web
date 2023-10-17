from django.shortcuts import render, redirect
from .models import PineMartens
from .forms import PineMartenForm
from django.contrib import messages
 
# when the server first runs, redirect to the login page 
def redirect_to_login(request):
    return redirect('/assignment1/login/')

def pine_martens_view(request):
    pine_martens = PineMartens.objects.all()
    
    if request.method == "POST":
        form = PineMartenForm(request.POST)
        if form.is_valid():
            instance = form.save()
            messages.success(request, f"You inserted {instance.SiteName} at latitude: {instance.latitude} & longitude: {instance.longitude}")
            return render(request, 'index.html', {'pine_martens': pine_martens, 'form': form, 'recently_added': instance})

        # if form.is_valid():
        #     instance = form.save()
        #     messages.success(request, f"You inserted {instance.SiteName} at latitude: {instance.latitude} & longitude: {instance.longitude}")
        #     return redirect('pine_martens_list') 
    else:
        form = PineMartenForm()

    return render(request, 'index.html', {'pine_martens': pine_martens, 'form': form})


