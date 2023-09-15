import requests
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import CoinDataSerializer
from .models import CoinData

def mapFunction(x):
    if not x["roi"]:
        x["roi"] = {}
    return x

class HomeView(APIView):
    permission_classes = [AllowAny]
    serializer_class=CoinDataSerializer
    def get(self, request):
        currency = request.GET.get("currency")
        if currency:
            response = requests.get(
                f'https://api.coingecko.com/api/v3/coins/markets?vs_currency={currency}')
            coinData = response.json()
            request_data = list(map(lambda x: mapFunction(x), coinData))
            serializer = self.serializer_class(data=request_data, many=True)
            # serialized data validation
            if serializer.is_valid():
                # saving validated serialized data in db using save method
                serializer.save()
                # send 200 ok when success as response
                return Response({"coinData": serializer.data}, status=status.HTTP_200_OK)
            return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "No currency provided."}, status=status.HTTP_400_BAD_REQUEST)
