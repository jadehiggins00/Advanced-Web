from django.shortcuts import render, redirect
from .models import PineMartens
from .forms import PineMartenForm
from django.contrib import messages
from django.urls import reverse
from django.contrib.auth import login, authenticate
from .forms import SignUpForm

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



def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect(reverse('login'))
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})
