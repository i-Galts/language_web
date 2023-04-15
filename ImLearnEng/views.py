from django.shortcuts import render
from django.core.cache import cache
from ImLearnEng import words_work

# Create your views here.

def index(request):
    return render(request, "index.html")

def words_list(request):
    words = words_work.get_words_for_table()
    return render(request, "words_list.html", context={"words": words})