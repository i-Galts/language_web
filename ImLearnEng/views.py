from django.shortcuts import render
from django.core.cache import cache
from django.http import JsonResponse
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

def test_conditionals_1(request):
    return render(request, "test_conditionals_1.html")

def test_conditionals_2(request):
    return render(request, "test_conditionals_2.html")

def dict_main(request):
    return render(request, "dict_main.html")

def word_list(request):
    words = words_work.get_words_for_table("./data/words.csv")
    return render(request, "word_list.html", context={"words": words})

def words_api(request):
    words = words_work.get_words_for_table("./data/words.csv")
    return JsonResponse(words, safe=False, json_dumps_params={'ensure_ascii': False})

def add_word(request):
    return render(request, "word_add.html")

def send_word(request):
    if request.method == "POST":
        cache.clear()
        user_name = request.POST.get("name")
        new_word = request.POST.get("new_word", "")
        new_translation = request.POST.get("new_translation", "")
        new_example = request.POST.get("new_example", "").replace(";", ",")
        context = {"user": user_name}
        if len(new_example) == 0:
            context["success"] = False
            context["comment"] = "Описание должно быть не пустым"
        elif len(new_word) == 0:
            context["success"] = False
            context["comment"] = "Термин должен быть не пустым"
        elif len(new_translation) == 0:
            context["success"] = False
            context["comment"] = "Перевод должен быть не пустым"
        else:
            context["success"] = True
            context["comment"] = "Ваш термин принят"
            words_work.write_word(new_word, new_translation, new_example)
        if context["success"]:
            context["success-title"] = ""
        return render(request, "word_request.html", context)
    else:
        add_word(request)

def update_word(request):
    if request.method == "POST":
        cache.clear()
        wordId = request.POST.get("id", "")
        word = request.POST.get("word", "")
        translation = request.POST.get("translation", "")
        example = request.POST.get("example", "").replace(";", ",")

        update_word(wordId, word, translation, example)
    else:
        word_list(request)

def delete_word(request):
    pass


def vocab_season_page(request):
    words = words_work.get_words_for_table("./data/vocab_season.csv")
    return render(request, "vocab_season_page.html", context={"words": words})