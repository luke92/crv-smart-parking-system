from django.urls import path
from .views.Patents import PatentsView

urlpatterns = [
    path('patents/', PatentsView.patents_list),
    path('patents/<int:pk>/', PatentsView.patent_detail)
]