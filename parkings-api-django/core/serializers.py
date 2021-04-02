from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User, Permission
from django.contrib.auth.models import Group


class UserSerializer(serializers.ModelSerializer):
    user_permissions = serializers.SerializerMethodField('get_permissions')
    #my_group = Group.objects.get(role).permissions.all()
    # my_group.user_set.add(instance)
    class Meta:
        model = User
        fields = ('username', 'user_permissions')

    def get_permissions(user, request):
        # Individual permissions
        permissions = Permission.objects.filter(user=request)

        # Permissions that the user has via a group
        group_permissions = Permission.objects.filter(group__user=request)

        perm_tuple = [x.codename for x in group_permissions]
        return perm_tuple


class UsersSerializer(serializers.ModelSerializer):
    customgroups = serializers.SerializerMethodField('custom_groups')

    class Meta:
        model = User
        fields = ("id", "username", "groups", "customgroups")

    def custom_groups(user, request):
        groups = Group.objects.filter(user=request)
        group_tuple = [{"id": x.id, "name": x.name} for x in groups]
        return group_tuple


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        groups_data = validated_data.pop('groups', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        if groups_data is not None:
            for group_data in groups_data:
                # Group.objects.create(user=user, **group_data)
                instance.groups.add(group_data)

        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'groups')


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("password", "groups")


class GroupModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("id", "name")
