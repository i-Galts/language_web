# Generated by Django 4.1.7 on 2023-04-20 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "ImLearnEng",
            "0004_rename_wordid_words_id_remove_wordauthors_wordid_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="wordauthors",
            name="id",
            field=models.AutoField(
                db_column="wordId", primary_key=True, serialize=False
            ),
        ),
    ]