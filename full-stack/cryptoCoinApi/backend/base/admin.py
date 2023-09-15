from django.contrib import admin

# Register your models here.
from .models import CoinData

admin.site.register(CoinData)