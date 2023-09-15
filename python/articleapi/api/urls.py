
from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('article', ArticleViewSet, basename='article')


urlpatterns = [
    path('article/', views.article_list, name='articles'),
    path('article/', ArticleAPIView.as_view()),
    path('article/<int:pk>', article_detail),
    path('article/<int:pk>', ArticleDetail.as_view()),
    path('gen/article/', GenericAPIView.as_view()),
    path('viewset/', include(router.urls)),
    path('viewset/<int:pk>', include(router.urls)),
    path('gen/article/<int:id>', GenericAPIView.as_view())
]
