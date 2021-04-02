from django.urls import path
from .views import UserList, UsersView

urlpatterns = [
    path('current_user/', UsersView.current_user),
    path('users-list/', UsersView.users),
    path('groups/', UsersView.groups),
    path('users/', UserList.user_add),
    path('users/<int:pk>/', UserList.user_change),
    path('current_user_json/', UsersView.current_user_json)
]