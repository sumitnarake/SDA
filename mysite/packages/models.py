from django.db import models
# Create your models here.
class Package(models.Model):
    # image=models.CharField(max_length=50)
    place=models.CharField(max_length=50)
    see=models.TextField()
    price=models.TextField()
    image=models.FileField( upload_to="see/", max_length=100,null=True,default=None)