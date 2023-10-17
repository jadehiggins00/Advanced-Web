from django.db import models

# Create your models here.
class Task:

    def __init__(self, title, completed=False):

        self.title = title

        self.completed = completed