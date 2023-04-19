from django.shortcuts import render
from django.core.cache import cache
from ImLearnEng import words_work
import os

# Create your views here.

def index(request):
    return render(request, "index.html")

def info_page(request):
    return render(request, "info_page.html")

def grammar_page(request):
    return render(request, "grammar_page.html")

def vocabulary_page(request):
    return render(request, "vocabulary_page.html")

def tests_page(request):
    return render(request, "tests_page.html")

def dict_main(request):
    return render(request, "dict_main.html")

def vocab_season_page(request):
    words = words_work.get_words_for_table("./data/vocab_season.csv")
    return render(request, "vocab_season_page.html", context={"words": words})