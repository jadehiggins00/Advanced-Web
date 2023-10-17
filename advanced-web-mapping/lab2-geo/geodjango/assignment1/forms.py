from django import forms
from .models import PineMartens

class PineMartenForm(forms.ModelForm):
    SiteName = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    latitude = forms.FloatField(widget=forms.NumberInput(attrs={'class': 'form-control'}))
    longitude = forms.FloatField(widget=forms.NumberInput(attrs={'class': 'form-control'}))
    
    class Meta:
        model = PineMartens
        fields = ['SiteName', 'latitude', 'longitude']
