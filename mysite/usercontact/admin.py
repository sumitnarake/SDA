from django.contrib import admin
from usercontact.models import Contact
# Register your models here.
class userContact(admin.ModelAdmin):
    list_display=['name','email','phone','subject']

admin.site.register(Contact,userContact)