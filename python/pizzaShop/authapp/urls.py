from django.urls import path

from.views import *

urlpatterns=[
    path('signup/',UserCreateView.as_view(),name='signup'),
]