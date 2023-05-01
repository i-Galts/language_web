# ImLearnEng
Проект по веб-разработке на тему изучения английского языка

## Как использовать

1. Скачать этот репозиторий или клонировать его
2. Перейти в папку репозитория при помощи `cd`
3. `pip3 install -r requirements.txt`
4. `python3 manage.py runserver`

## Некоторые замечания

При разработке данного web-приложения использовались отчасти готовые решения из разных источников, а что-то было дописано автором самостоятельно.

Ниже представлен перечнь открытых интернет-ресурсов, идеи которых использованы в работе:
1. https://getbootstrap.com/ - наиболее важный источник, на основе которого сверстаны все страницы сайта
2. https://github.com/dig-kafedra-webdev/maths-site - проект-референс для данного проекта. Использованы идеи для обработки новых слов при отправлении в таблицу-словарь.
3. https://englishinn.ru/dialogi-i-tekstyi-pro-pogodu-na-angliyskom-yazyike.html и https://engmaster.ru/topic/2634 - тексты в разделе "Vocabulary"
4. https://www.w3schools.com/bootstrap5/exercise.php?filename=exercise_bs5_typography1 - javascript'ы (check_answers.js, check_answers_boxes.js) и css-стили для раздела "Tests"
5. https://github.com/divanov11/table-edit-frontend-complete и https://github.com/divanov11/table-edit-backend - для создания интерактивной таблицы-словаря с возможностью редактирования и удаления строк.

## Еще одно замечание
Автор пожелал не размещать ссылки на vk-страницу и email-адрес в разделе "Author" вверху каждой страницы сайта, оставив лишь "заглушки" для красоты.

## Корректное хранение секретов и токенов

Для загрузки секретов как переменных окружения используется библиотека [python-dotenv](https://pypi.org/project/python-dotenv/).

Все секретные токены должны быть спрятаны в коде за импортом. Для этого создайте в корне репозитория файл `.env` 
и добавьте в него пары "переменная-значение".

Файл `.env` нужно **обязательно** поместить в `.gitignore`!

Затем в settings.py загрузите эти переменные при помощи команды `load_dotenv()` и обратитесь к ним через `os.getenv()`:

```python
import os
from dotenv import load_dotenv

dotenv_path = os.path.join(BASE_DIR, ".env")
load_dotenv() 

SECRET_KEY = str(os.getenv("SECRET_KEY"))
```