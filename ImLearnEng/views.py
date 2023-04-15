from django.shortcuts import render
from django.core.cache import cache
from ImLearnEng import words_work

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

def add_words_dict(request):
    return render(request, "add_words_dict.html")