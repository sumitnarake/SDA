from django.contrib import admin
from packages.models import Package
# Register your models here.
class Dypackage(admin.ModelAdmin):
    list_display=['place','see','price','image']

admin.site.register(Package, Dypackage)