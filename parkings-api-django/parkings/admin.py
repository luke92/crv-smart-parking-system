from django.contrib import admin
from .models import Parkings
from .models import Configuration
from .models import Registrys
from .models import Reports
from .models import Audits

# Register your models here.

admin.site.register(Parkings)
admin.site.register(Configuration)
admin.site.register(Registrys)
admin.site.register(Reports)
admin.site.register(Audits)
