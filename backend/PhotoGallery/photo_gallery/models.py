from django.db import models
from django.contrib.auth.models import User

class File(models.Model):
    file = models.FileField(blank=False, null=False)
    def __str__(self):
        return self.file.name

class Album(models.Model):
	description = models.CharField(max_length = 300, blank = True)
	cover_photo = models.FileField(blank = True)
	likes = models.ManyToManyField(User, related_name='liked_by')
	lat = models.FloatField(null = True)
	lon = models.FloatField(null = True)
	created_at = models.DateTimeField(auto_now_add = True)
	is_private = models.BooleanField(default = False)
	link = models.URLField(blank = True)
	owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_by')
	def __str__(self):
		return ("Album of %s", self.owner.username)

class Photo(models.Model):
	photo = models.FileField(blank = True)
	description = models.CharField(max_length = 300, blank = True)
	album = models.ForeignKey(Album, on_delete = models.CASCADE)
	likes = models.ManyToManyField(User)
	lat = models.FloatField(null = True)
	lon = models.FloatField(null = True)
	is_private = models.BooleanField(default = False)
	link = models.URLField()
	def __str__(self):
		return self.photo.name

# Model to store additional User details
class UserDetails(models.Model):
	profile_picture = models.FileField()
	gender = models.CharField(max_length = 10)
	user = models.OneToOneField(User, on_delete = models.CASCADE)