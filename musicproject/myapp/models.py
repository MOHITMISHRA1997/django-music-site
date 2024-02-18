from django.db import models

# Create your models here.


class Song(models.Model):
    sno = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    artist = models.CharField(max_length=50)
    band = models.CharField(max_length=50)
    image = models.ImageField(upload_to="image")
    uploded_at = models.DateTimeField(auto_now = True)
    song_file = models.FileField(upload_to="song")

    def __str__(self) -> str:
        return self.title