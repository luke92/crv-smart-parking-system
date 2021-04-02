from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('api/', include('parkings.urls')),
    re_path('api/', include('camaras.urls')),
    re_path('api/', include('patents.urls')),
    path('token-auth/', obtain_jwt_token),
    path('core/', include('core.urls'))
]