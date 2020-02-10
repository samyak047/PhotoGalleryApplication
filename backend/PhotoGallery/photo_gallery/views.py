import json

from django.shortcuts import render
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import *
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from django.http import Http404
from django.db import transaction
from . import service
#View class for get users and create user

class UserApiView(APIView):
	def get(self, request, *args, **kwargs):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		user_detail_objs = UserDetails.objects.all()
		serializer = UserDetailResponseSerializer(user_detail_objs, many = True)
		return Response(serializer.data)
	def post(self, request):
		serializer = UserDetailRegisterSerializer(data=request.data)
		if serializer.is_valid():
			user_detail_obj = serializer.create()
			return Response(UserDetailResponseSerializer(user_detail_obj).data)
		else:
			return Response(serializer.errors)


#View class for get, update or delete any specific user

class UserApiViewIdEndpoint(APIView):
	def get(self, request, id):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		try:
			print(request.META['HTTP_AUTHORIZATION'])
		except:
			print("No token passed")
		try:
			requested_user = User.objects.get(pk = id)
			user_detail_obj = UserDetails.objects.get(user = requested_user)
			res = UserDetailResponseSerializer(user_detail_obj).data
			print(res)
			private_albums = []
			if user.pk == id:
				private_albums = Album.objects.filter(owner = user, is_private = True)
			public_albums = Album.objects.filter(owner = requested_user, is_private = False)
			res['private_albums'] = AlbumResponseSerializer(private_albums, many = True).data
			res['public_albums'] = AlbumResponseSerializer(public_albums, many = True).data
			return Response(res)
		except:
			raise Http404("User not found.")

	def put(self, request, id):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		serializer = UserDetailUpdateSerializer(data= request.data)
		print(serializer.initial_data)
		try:
			user = User.objects.get(pk=id)
		except:
			raise Http404("User not found.")

		if serializer.is_valid():
			user_detail_obj = serializer.update(user=user)
			return Response(UserDetailResponseSerializer(user_detail_obj).data)
		else:
			return Response(serializer.errors, status=400)

	def delete(self, request, id):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		try:
			user = User.objects.get(pk=id)
			user.delete()
			return Response()
		except:
			raise Http404("User not found.");


#View class for get albums and create album

class AlbumApiView(APIView):

	def get(self, request):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		albums = Album.objects.filter(is_private = False).order_by('-created_at')[:30]
		return Response(AlbumResponseSerializer(albums, many=True).data)

	def post(self, request):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		serializer = AlbumRequestSerializer(data = request.data)
		if serializer.is_valid():
			album = serializer.save()
			return Response(AlbumResponseSerializer(album).data)
		else:
			return Response(serializer.errors)


#View class for get, delete and update any specific album

class AlbumApiViewIdEndpoint(APIView):

	def get(self, request, id):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		try:
			album = Album.objects.get(pk=id)
		except:
			raise Http404("Album not found")
		if album.is_private and user != album.owner:
			return Response(status=401)
		photos = album.photo_set.all()
		photo_res = PhotoResponseSerializer(photos, many=True).data
		album_res = AlbumResponseSerializer(album).data
		album_res['photos'] = photo_res
		return Response(album_res)

	def put(self, request, id):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		try:
			serializer = AlbumRequestSerializer(data=request.data)
			album = Album.objects.get(pk=id)
			if(serializer.is_valid()):
				album = serializer.update(album = album)
				photos = album.photo_set.all()
				photo_res = PhotoResponseSerializer(photos, many=True).data
				album_res = AlbumRequestSerializer(album).data
				album_res['photos'] = photo_res
				return Response(album_res)
			else:
				return Response(serializer.errors)
		except:
			raise Http404("Album not found")

	def delete(self, request, id):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		album = Album.objects.get(pk=id)
		album.delete()
		return Response()


class PhotoApiView(APIView):

	def post(self, request, *args, **kwargs):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		photo_serializer = PhotoRequestSerializer(data = request.data)

		if photo_serializer.is_valid():
			photo = photo_serializer.save()
			return Response(PhotoResponseSerializer(photo).data)
		else:
			return Response(photo_serializer.errors)

class PhotoApiViewIdEndpoint(APIView):
	def delete(self, request, id):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		try:
			photo = Photo.objects.get(pk=id)
		except:
			raise Http404("Photo not found")
		photo.delete()
		return Response()

	def put(self, request, id):
		user = service.authenticate_request(request)
		if user is None:
			return Response(status=401)
		serializer = PhotoRequestSerializer(data=request.data)
		if serializer.is_valid():
			try:
				photo = Photo.objects.get(pk=id)
			except:
				raise Http404("Photo not found")
			photo = serializer.update(photo)
			return Response(PhotoResponseSerializer(photo).data)
		else:
			return Response(serializer.errors)

class LoginApiView(APIView):
	def post(self, request):
		serializer = LoginSerializer(data=request.data)
		if serializer.is_valid():
			username = serializer.validated_data['username']
			password = serializer.validated_data['password']
			user = authenticate(request, username=username, password=password)
			if user is not None:
				Token.objects.get_or_create(user=user)
				token = Token.objects.get(user=user)
				res = {
					"username": user.username,
					"user_id": user.pk,
					"token": token.key,
					"status": "Success"
				}
				return Response(res)
			else:
				res = {
					"message": "Credentials Mismatch",
					"status": "Failed"
				}
				return Response(res)

		else:
			print(serializer.errors)
			res = {
				"status": "Failed",
				"message": serializer.error_messages
			}
			return Response(res)


class TriggerLikeOnPhoto(APIView):
	def get(self, request, *args, **kwargs):
		user_id = request.GET['user_id']
		photot_id = request.GET['photo_id']
		photo = Photo.objects.get(pk = photot_id)
		user = User.objects.get(pk = user_id)
		likes = photo.likes.all().count()
		photo.likes.add(user)
		if likes == photo.likes.all().count():
			photo.likes.remove(user)
		return Response({"Message" : "Operation triggered"})

@api_view(["GET"])
def like_album(request, album_id):
	user = service.authenticate_request(request)
	if user is None:
		return Response(status=401)
	album = Album.objects.get(pk = album_id)
	album.likes.add(user)
	return Response()

@api_view(["GET"])
def unlike_album(request, album_id):
	user = service.authenticate_request(request)
	if user is None:
		return Response(status=401)
	album = Album.objects.get(pk = album_id)
	album.likes.remove(user)
	return Response()

@api_view(["GET"])
def like_photo(request, photo_id):
	user = service.authenticate_request(request)
	if user is None:
		return Response(status=401)
	photo = Photo.objects.get(pk = photo_id)
	photo.likes.add(user)
	return Response()

@api_view(["GET"])
def unlike_photo(request, photo_id):
	user = service.authenticate_request(request)
	if user is None:
		return Response(status=401)
	photo = Photo.objects.get(pk = photo_id)
	photo.likes.remove(user)
	return Response()

