def get_words_for_table(filename):
    words = []
    with open(filename, "r", encoding="utf-8") as f:
        for line in f.readlines()[1:]:
            id, word, translation, example = line.split(";")
            words.append([int(id), word, translation, example])
    return words

def write_word(new_word, new_translation, new_example):
    last_id = len(get_words_for_table("./data/words.csv"))
    new_word_line = f"{last_id + 1};{new_word};{new_translation};{new_example}"
    with open("./data/words.csv", "r", encoding="utf-8") as f:
        existing_words = [l.strip("\n") for l in f.readlines()]
        title = existing_words[0]
        old_words = existing_words[1:]
    words_sorted = old_words + [new_word_line]
    words_sorted.sort()
    new_words = [title] + words_sorted
    with open("./data/words.csv", "w", encoding="utf-8") as f:
        f.write("\n".join(new_words))

def update_example(upd_Id, upd_example):
    replaced_content = []
    with open("./data/words.csv", "r", encoding="utf-8") as f:
        i = 0
        for line in f:
            if i == upd_Id:
                wlist = line.split(";")
                print(wlist)
                wlist[3] = upd_example + "\n"
                new_line = ";".join(wlist)
                print(new_line)
            else:
                new_line = line
            replaced_content.append(new_line)
            i += 1

    with open("./data/words.csv", "w", encoding="utf-8") as f:
        f.write("".join(replaced_content))

def delete_word(id):
    replaced_content = []
    with open("./data/words.csv", "r", encoding="utf-8") as f:
        i = 0
        for line in f:
            if i < id:
                replaced_content.append(line)
            elif i == id:
                pass
            else:
                wlist = line.split(";")
                wlist[0] = str(i - 1)
                new_line = ";".join(wlist)
                replaced_content.append(new_line)
            i += 1

    with open("./data/words.csv", "w", encoding="utf-8") as f:
        f.write("".join(replaced_content))


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