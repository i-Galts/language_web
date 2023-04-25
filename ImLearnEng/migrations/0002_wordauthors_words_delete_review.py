# Generated by Django 4.1.7 on 2023-04-20 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ImLearnEng", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Wordauthors",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("wordid", models.IntegerField(db_column="wordId")),
                ("wordsource", models.TextField(db_column="wordSource")),
            ],
            options={"db_table": "wordAuthors", "managed": False,},
        ),
        migrations.CreateModel(
            name="Words",
            fields=[
                (
                    "wordid",
                    models.AutoField(
                        db_column="wordId", primary_key=True, serialize=False
                    ),
                ),
                ("word", models.TextField()),
                ("translation", models.TextField()),
                ("example", models.TextField()),
            ],
            options={"db_table": "words", "managed": False,},
        ),
        migrations.DeleteModel(name="Review",),
    ]