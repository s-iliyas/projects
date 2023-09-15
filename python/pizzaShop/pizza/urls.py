
from django.contrib import admin
from django.urls import path, include
from authapp.views import HelloWorldView

from orders.views import UserOrderDetailView, UserOrdersView


from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

...

schema_view = get_schema_view(
    openapi.Info(
        title="Pizza API",
        default_version='v1',
        description="Breakdown of all APIs in this site as Docs. ",
        contact=openapi.Contact(email="a@a.com"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('', HelloWorldView, name='hello_world'),

    path('admin/', admin.site.urls),
    path('auth/', include('authapp.urls')),
    path('orders/', include('orders.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('users/<int:user_id>/orders/',
         UserOrdersView.as_view(), name='User_Orders'),
    path('users/<int:user_id>/orders/<int:order_id>/',
         UserOrderDetailView.as_view(), name='User_Order_Detail'),
    path('swagger<format>.json.yaml', schema_view.without_ui(
        cache_timeout=0), name='schema-json'),

    path('docs/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redocs/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),


]
