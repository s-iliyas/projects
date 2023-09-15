from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import *
from .models import Orders, User
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
User = get_user_model()


class OrderView(generics.GenericAPIView):
    def get(self, request):
        return Response(data={"message": "Orders"}, status=status.HTTP_200_OK)


class OrderCreateListView(generics.GenericAPIView):
    serializer_class = OrderCreationSerializer
    queryset = Orders.objects.all()
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        orders = Orders.objects.all()
        serializer = self.serializer_class(instance=orders, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        user = request.user
        if serializer.is_valid():
            serializer.save(customer=user)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailView(generics.GenericAPIView):
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, order_id):
        order = get_object_or_404(Orders, pk=order_id)
        serializer = self.serializer_class(instance=order)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, order_id):
        data = request.data
        order = get_object_or_404(Orders, pk=order_id)
        serializer = self.serializer_class(data=data, instance=order)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, order_id):
        order = get_object_or_404(Orders, pk=order_id)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrderUpdateStatusView(generics.GenericAPIView):
    serializer_class = OrderStatusUpdateSerializer
    permission_classes = [IsAuthenticated, ]

    def put(self, request, order_id):
        data = request.data
        order = get_object_or_404(Orders, pk=order_id)
        serializer = self.serializer_class(data=data, instance=order)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.data, status=status.HTTP_400_BAD_REQUEST)


class UserOrdersView(generics.GenericAPIView):
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, user_id):
        user = User.objects.get(pk=user_id)
        orders = Orders.objects.all().filter(customer=user)
        serializer = self.serializer_class(instance=orders, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserOrderDetailView(generics.GenericAPIView):
    serializer_class = OrderDetailSerializer
    permission_classes = [IsAuthenticated, ]

    def get(self, request, user_id, order_id):
        user = User.objects.get(pk=user_id)
        order = Orders.objects.all().filter(customer=user).filter(pk=order_id)
        serializer = self.serializer_class(instance=order, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
