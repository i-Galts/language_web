"""lang_web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from ImLearnEng import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    path('info-page', views.info_page),
    path('grammar-page', views.grammar_page),
    path('grammar-cond-page', views.grammar_cond_page),
    path('grammar-adject-page', views.grammar_adject_page),
    path('vocabulary-page', views.vocabulary_page),
    path('tests-page', views.tests_page),
    path('dict-main', views.dict_main),
    path('word-list', views.word_list),
    path('words-api', views.words_api),
    path('add-word', views.add_word),
    path('update-example', views.update_example),
    path('delete-word', views.delete_word),
    path('send-word', views.send_word),
    path('vocab-season-page', views.vocab_season_page),
    path('vocab-appear-page', views.vocab_appear_page),
    path('test-conditionals-1', views.test_conditionals_1),
    path('test-conditionals-2', views.test_conditionals_2),
    path('test-adject-1', views.test_adject_1),
    path('test-adject-2', views.test_adject_2)
]
