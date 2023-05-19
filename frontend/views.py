from django.shortcuts import render, redirect
from frontend.forms import HeroForm
from django.http import JsonResponse
import json
from django.core import serializers
# Create your views here.
def index(request):
    hero_form = HeroForm()
    return render(request, 'home.html', {'hero_form': hero_form})

# def add_hero(request):
#     if request.method == "POST":
#         form = HeroForm(request.POST, request.FILES)
#         if form.is_valid():
#             new_hero = form.save()
#             return redirect("home")
#     else:
#         form = HeroForm()
#     return render(request, "home", {'form': form})