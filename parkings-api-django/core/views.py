from django.shortcuts import render

from django.http import JsonResponse
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User, Group
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, UsersSerializer, UserModelSerializer, \
    GroupModelSerializer


class UsersView():

    @api_view(['GET'])
    def current_user(request):
        """
        Determine the current user by their token, and return their data
        """

        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    @api_view(['GET', 'OPTIONS'])
    def users(request):
        usersData = User.objects.all()
        serializer = UsersSerializer(usersData, many=True)
        return JsonResponse(serializer.data, safe=False)

    @api_view(['GET', 'OPTIONS'])
    def groups(request):
        groupData = Group.objects.all()
        serializer = GroupModelSerializer(groupData, many=True)
        return JsonResponse(serializer.data, safe=False)

    @api_view(['GET'])
    def current_user_json(request):
        """
        Determine the current user by their token, and return their data
        """

        serializer = UserSerializer(request.user)
        return JsonResponse(serializer.data, safe=False)


class UserList(APIView):
    @api_view(['POST'])
    def user_add(request):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['GET', 'PUT', 'DELETE'])
    def user_change(request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = UsersSerializer(user)
            return Response(serializer.data)

        elif request.method == 'PUT':
            serializer = UserModelSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
