from django import forms
from .models import PineMartens
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class PineMartenForm(forms.ModelForm):
    SiteName = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    latitude = forms.FloatField(widget=forms.NumberInput(attrs={'class': 'form-control'}))
    longitude = forms.FloatField(widget=forms.NumberInput(attrs={'class': 'form-control'}))
    
    class Meta:
        model = PineMartens
        fields = ['SiteName', 'latitude', 'longitude']

class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', )