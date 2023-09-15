from django.urls import path

from.views import *

urlpatterns = [
    # path('', OrderView.as_view(), name='hello_world'),
    path('', OrderCreateListView.as_view(), name='Orders_Create'),
    path('<int:order_id>/', OrderDetailView.as_view(),
         name='Orders_Detail_and_changes'),
    path('update-status/<int:order_id>/',
         OrderUpdateStatusView.as_view(), name='Update_Status'),
]
