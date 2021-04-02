from django.urls import path
from .views.Parkings import ParkingsView
from .views.Configuration import ConfigurationView
from .views.Registrys import RegistrysView
from .views.Reports import ReportsView
from .views.Audits import AuditsView

urlpatterns = [
    path('parkings/', ParkingsView.parkings_list),
    path('parkings/<int:pk>/', ParkingsView.parking_detail),
    path('configuration/', ConfigurationView.configuration_list),
    path('configuration/<str:pk>/', ConfigurationView.configuration_detail),
    path('registrys/', RegistrysView.registrys_list),
    path('registrys/<int:pk>/', RegistrysView.registry_detail),
    path('reports/', ReportsView.reports_list),
    path('reports/<int:pk>/', ReportsView.report_detail),
    path('top_vehicles/<int:cant>/', RegistrysView.get_top_vehicles),
    path('top_parkings/<int:cant>/', RegistrysView.get_top_parkings),
    path('audits/', AuditsView.audits_list),
    path('audits/<int:pk>/', AuditsView.audit_detail)
]