from django.forms import ModelForm
from myapi.models import Hero
from django import forms

class HeroForm(forms.ModelForm):
    class Meta:
        model = Hero
        fields = ['name', 'alias']
