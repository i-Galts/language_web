from ImLearnEng.models import Words, WordAuthors


def db_get_words_for_table():
    words = []
    for i, item in enumerate(Words.objects.all()):
        words.append([i + 1, item.word, item.translation, item.example])
    return words

def db_write_word(new_word, new_translation, new_example):
    word = Words(word=new_word, 
                 translation=new_translation,
                 example=new_example)
    word_addition = WordAuthors(wordid=word.wordid, wordsource="user")
    word.save()
    word_addition.save()