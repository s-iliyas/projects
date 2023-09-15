from django.contrib import admin
from .models import Orders

# admin.site.register(Orders)

@admin.register(Orders)
class OrderAdmin(admin.ModelAdmin):
    list_display=['size','order_status','quantity','created_at']
    list_filter=['size','created_at','order_status']