from django.contrib import admin
from .models import (
    Spot,
    SpotImage
)
# Register your models here.
admin.site.register(Spot)
admin.site.register(SpotImage)