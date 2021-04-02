from django.urls import path
from .views.Camaras import CamarasView
from .views.Camera_Patent import CameraPatentView

urlpatterns = [
    path('camaras/', CamarasView.camaras_list),
    path('camaras/<int:pk>/', CamarasView.camara_detail),
    path('camerapatent/', CameraPatentView.camaras_list),
    path('camerapatent/<int:pk>/', CameraPatentView.camara_detail)
]