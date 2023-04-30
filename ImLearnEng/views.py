"""
Main module for GET-POST process handling.
"""

from django.core.cache import cache
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpRequest

from ImLearnEng import words_work


def index(request: HttpRequest) -> HttpResponse:
    """Launching the main page."""
    return render(request, "index.html")


def info_page(request: HttpRequest) -> HttpResponse:
    """Launching the info page."""
    return render(request, "info_page.html")


def grammar_page(request: HttpRequest) -> HttpResponse:
    """Launching the grammar page."""
    return render(request, "grammar_page.html")


def vocabulary_page(request: HttpRequest) -> HttpResponse:
    """Launching the vocabulary page."""
    return render(request, "vocabulary_page.html")


def tests_page(request: HttpRequest) -> HttpResponse:
    """Launching the tests page."""
    return render(request, "tests_page.html")


def test_conditionals_1(request: HttpRequest) -> HttpResponse:
    """Launching the test-conditional page number 1."""
    return render(request, "test_conditionals_1.html")


def test_conditionals_2(request: HttpRequest) -> HttpResponse:
    """Launching the test-conditional page number 2."""
    return render(request, "test_conditionals_2.html")


def dict_main(request: HttpRequest) -> HttpResponse:
    """Launching the dictionary base page."""
    return render(request, "dict_main.html")


def word_list(request: HttpRequest) -> HttpResponse:
    """Launching the dictionary-table page."""
    words = words_work.get_words_for_table("./data/words.csv")
    return render(request, "word_list.html", context={"words": words})


def words_api(request) -> JsonResponse:
    """
    This helper page is used for filling the
    dictionary table with words from javascript code in word_list.html.
    """
    words = words_work.get_words_for_table("./data/words.csv")
    words_to_dict = [{'id': w[0], 'word': w[1],
                      'translation': w[2], 'example': w[3]} for w in words]

    return JsonResponse(words_to_dict, safe=False,
                        json_dumps_params={'ensure_ascii': False})


def add_word(request: HttpRequest) -> HttpResponse:
    """Launching the page for adding new words to the dictionary-table."""
    return render(request, "word_add.html")


def send_word(request: HttpRequest) -> HttpResponse:
    """
    Runs the process of sending a new word to the dictionary-table.
    Hadling some possible wrong inputs.
    """
    if request.method != "POST":
        add_word(request)
    else:
        cache.clear()
        user_name = request.POST.get("name")
        new_word = request.POST.get("new_word", "").replace(";", ",")
        new_translation = request.POST.get("new_translation",
                                           "").replace(";", ",")
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


def update_example(request: HttpRequest) -> HttpResponse:
    """A back-end part of updating an example item in the dictionary-table."""
    if request.method != "POST":
        word_list(request)
    else:
        word_id = int(request.POST.get("id", ""))
        upd_example = request.POST.get("example", "").replace(";", ",")

        words_work.update_example(word_id, upd_example)
        return JsonResponse("Word list updated!", safe=False)


def delete_word(request: HttpRequest) -> HttpResponse:
    """A back-end part of deleting a row from the dictionary-table."""
    if request.method != "POST":
        word_list(request)
    else:
        word_id = int(request.POST.get("id", ""))

        words_work.delete_word(word_id)
        return JsonResponse("Word list updated!", safe=False)


def vocab_season_page(request: HttpRequest) -> HttpResponse:
    """Launching the vocabulary page with the "Seasons" topic."""
    words = words_work.get_words_for_table("./data/vocab_season.csv")
    return render(request, "vocab_season_page.html", context={"words": words})


def vocab_appear_page(request: HttpRequest) -> HttpResponse:
    """Launching the vocabulary page with the "Appearance" topic."""
    words = words_work.get_words_for_table("./data/vocab_appear.csv")
    return render(request, "vocab_appear_page.html", context={"words": words})


def grammar_cond_page(request: HttpRequest) -> HttpResponse:
    """Launching the grammar page with the "Conditionals" topic."""
    return render(request, "grammar_cond_page.html")


def grammar_adject_page(request: HttpRequest) -> HttpResponse:
    """Launching the grammar page with the "Adkective degrees" topic."""
    words = words_work.get_words_for_table("./data/grammar_adject.csv")
    return render(request, "grammar_adject_page.html",
                  context={"words": words})
