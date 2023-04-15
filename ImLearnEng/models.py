from django.db import models

# Create your models here.

class Review(models.Model):
    author = models.CharField(max_length=30)
    timestamp = models.DateTimeField()