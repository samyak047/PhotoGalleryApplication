from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.db import transaction
from django.contrib.auth import authenticate, login

class LoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()
	# def authenticate(self, request, raise_exception=False):
	# 	username = self.validated_data['username']
	# 	password = self.validated_data['password']
	# 	print(username, password)
	# 	user = authenticate(request, username=username, password=password)
	# 	return user




class UserDetailRegisterSerializer(serializers.ModelSerializer):
	profile_picture = serializers.FileField(required=True)
	gender = serializers.CharField(max_length=10)
	class Meta:
		model = User
		fields = ("username", "first_name", "last_name", "gender", "profile_picture", "email", "password")

	@transaction.atomic
	def create(self):
		user = User.objects.create_user(
			username = self.validated_data["username"],
			email = self.validated_data["email"],
			password = self.validated_data["password"],
			first_name = self.validated_data["first_name"],
			last_name = self.validated_data["last_name"]
		)
		user_detail = UserDetails.objects.create(
			gender = self.validated_data["gender"],
			profile_picture = self.validated_data["profile_picture"],
			user = user
		)
		return user_detail

class UserDetailUpdateSerializer(serializers.ModelSerializer):
	profile_picture = serializers.FileField(required=False)
	gender = serializers.CharField(max_length=10)
	class Meta:
		model = User
		fields = ("first_name", "last_name", "gender", "profile_picture", "email")

	@transaction.atomic
	def update(self, user):
		user_detail = UserDetails.objects.get(user = user)
		user.first_name = self.validated_data["first_name"]
		user.last_name = self.validated_data["last_name"]
		user.email = self.validated_data["email"]
		user_detail.gender = self.validated_data["gender"]
		try:
			user_detail.profile_picture = self.validated_data["profile_picture"]
		except:
			pass;
		user.save()
		user_detail.save()
		return user_detail

class UserDetailResponseSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserDetails
		fields = "__all__"
		depth = 1


class AlbumRequestSerializer(serializers.ModelSerializer):
	class Meta:
		model = Album
		fields = ('cover_photo', 'description', 'owner', 'is_private')

	@transaction.atomic
	def update(self, album):
		try:
			album.cover_photo = self.validated_data["cover_photo"]
		except:
			pass
		album.description = self.validated_data["description"]
		album.is_private = self.validated_data["is_private"]
		album.save()
		return album

class AlbumResponseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Album
		fields = ('id', 'cover_photo', 'description', 'owner', 'is_private', 'likes')
		# depth=1

# class AlbumSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = Album
# 		exclude = ('likes', 'link')
# 		depth = 0



class PhotoRequestSerializer(serializers.ModelSerializer):
	class Meta:
		model = Photo
		fields = ('photo', 'description', 'album', 'is_private', 'likes')

	def update(self, photo):
		photo.photo = self.validated_data['photo']
		photo.description = self.validated_data['description']
		photo.album = self.validated_data['album']
		photo.is_private = self.validated_data['is_private']
		photo.save()
		return photo

class PhotoResponseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Photo
		fields = "__all__"




# class AlbumResponseSerializer(serializers.ModelSerializer):
#     tracks = serializers.StringRelatedField(many=True)
#
#     class Meta:
#         model = Album
#         fields = ['__all__', 'tracks']
