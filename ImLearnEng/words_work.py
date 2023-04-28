def get_words_for_table(filename):
    words = []
    with open(filename, "r", encoding="utf-8") as f:
        for line in f.readlines()[1:]:
            id, word, translation, example, source = line.split(";")
            words.append([int(id), word, translation, example])
    return words

def write_word(new_word, new_translation, new_example):
    last_id = len(get_words_for_table())
    new_word_line = f"{last_id + 1};{new_word};{new_translation};{new_example};user"
    with open("./data/words.csv", "r", encoding="utf-8") as f:
        existing_words = [l.strip("\n") for l in f.readlines()]
        title = existing_words[0]
        old_words = existing_words[1:]
    words_sorted = old_words + [new_word_line]
    words_sorted.sort()
    new_words = [title] + words_sorted
    with open("./data/words.csv", "w", encoding="utf-8") as f:
        f.write("\n".join(new_words))

def update_word(upd_Id, upd_word):
    with open("./data/words.csv", "r", encoding="utf-8") as f:
        i = 1
        replaced_content = []
        for line in f:
            if i == upd_Id:
                old_word = line.split(';')[1]
                new_line = line.replace(old_word, upd_word)
            else:
                new_line = line
            replaced_content.append(new_line)
            i += 1

    with open("./data/words.csv", "w", encoding="utf-8") as f:
        f.write("".join(replaced_content))

def update_translation(upd_Id, upd_trans):
    with open("./data/words.csv", "r", encoding="utf-8") as f:
        i = 1
        replaced_content = []
        for line in f:
            if i == upd_Id:
                old_word = line.split(';')[2]
                new_line = line.replace(old_word, upd_trans)
            else:
                new_line = line
            replaced_content.append(new_line)
            i += 1

    with open("./data/words.csv", "w", encoding="utf-8") as f:
        f.write("".join(replaced_content))

def update_translation(upd_Id, upd_translation):
    pass

def update_example(upd_Id, upd_example):
    pass


#def delete_word():


# def get_terms_stats():
#     db_terms = 0
#     user_terms = 0
#     defin_len = []
#     with open("./data/terms.csv", "r", encoding="utf-8") as f:
#         for line in f.readlines()[1:]:
#             term, defin, added_by = line.split(";")
#             words = defin.split()
#             defin_len.append(len(words))
#             if "user" in added_by:
#                 user_terms += 1
#             elif "db" in added_by:
#                 db_terms += 1
#     stats = {
#         "terms_all": db_terms + user_terms,
#         "terms_own": db_terms,
#         "terms_added": user_terms,
#         "words_avg": sum(defin_len)/len(defin_len),
#         "words_max": max(defin_len),
#         "words_min": min(defin_len)
#     }
#     return stats