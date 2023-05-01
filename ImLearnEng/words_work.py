"""
Main module for working with words in tables in this project.
"""

from typing import List


def get_words_for_table(filename: str) -> List[List[object]]:
    """
    Used for filling tables with words already
    written to file .csv in /data folder.
    """
    words = []
    with open(filename, "r", encoding="utf-8") as file:
        for line in file.readlines()[1:]:
            word_id, word, translation, example = line.split(";")
            words.append([int(word_id), word, translation, example])
    return words


def write_word(new_word: str,
               new_translation: str,
               new_example: str) -> None:
    """
    Used for adding a new word to the dictionary table.
    """
    last_id = len(get_words_for_table("./data/words.csv"))
    new_word_line = f"{last_id + 1};{new_word};{new_translation};{new_example}"
    with open("./data/words.csv", "r", encoding="utf-8") as file:
        existing_words = [line.strip("\n") for line in file.readlines()]
        title = existing_words[0]
        old_words = existing_words[1:]
    words_sorted = old_words + [new_word_line]
    words_sorted.sort()
    new_words = [title] + words_sorted
    with open("./data/words.csv", "w", encoding="utf-8") as file:
        file.write("\n".join(new_words))


def update_example(upd_id: int, upd_example: str) -> None:
    """
    Used for updating an example item in the dictionary table.
    """
    replaced_content = []
    with open("./data/words.csv", "r", encoding="utf-8") as file:
        i = 0
        for line in file:
            if i == upd_id:
                wlist = line.split(";")
                wlist[3] = upd_example + "\n"
                new_line = ";".join(wlist)
            else:
                new_line = line
            replaced_content.append(new_line)
            i += 1

    with open("./data/words.csv", "w", encoding="utf-8") as file:
        file.write("".join(replaced_content))


def delete_word(word_id: int) -> None:
    """
    Used for deleting a line from the dictionary table.
    """
    replaced_content = []
    with open("./data/words.csv", "r", encoding="utf-8") as file:
        i = 0
        for line in file:
            if i < word_id:
                replaced_content.append(line)
            elif i == word_id:
                pass
            else:
                wlist = line.split(";")
                wlist[0] = str(i - 1)
                new_line = ";".join(wlist)
                replaced_content.append(new_line)
            i += 1

    with open("./data/words.csv", "w", encoding="utf-8") as file:
        file.write("".join(replaced_content))
