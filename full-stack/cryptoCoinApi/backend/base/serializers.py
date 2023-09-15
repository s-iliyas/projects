from rest_framework import serializers
from .models import CoinData


class RoiSerializer(serializers.Serializer):
    times = serializers.FloatField(
        allow_null=True, required=False, default=None)
    currency = serializers.CharField(
        allow_blank=True, allow_null=True, required=False, default=None)
    percentage = serializers.FloatField(
        allow_null=True, required=False, default=None)

    class Meta:
        fields = ["times", "currency", "percentage"]


class CoinDataSerializer(serializers.ModelSerializer):
    id = serializers.CharField(
        allow_blank=True, allow_null=True, required=False, default=None)
    symbol = serializers.CharField(
        allow_blank=True, allow_null=True, required=False, default=None)
    name = serializers.CharField(
        allow_blank=True, allow_null=True, required=False, default=None)
    image = serializers.CharField(
        allow_blank=True, allow_null=True, required=False, default=None)
    current_price = serializers.FloatField(
        allow_null=True, required=False, default=None)
    market_cap = serializers.FloatField(
        allow_null=True, required=False, default=None)
    market_cap_rank = serializers.FloatField(
        allow_null=True, required=False, default=None)
    fully_diluted_valuation = serializers.FloatField(
        allow_null=True, required=False, default=None)
    total_volume = serializers.FloatField(
        allow_null=True, required=False, default=None)
    high_24h = serializers.FloatField(
        allow_null=True, required=False, default=None)
    low_24h = serializers.FloatField(
        allow_null=True, required=False, default=None)
    price_change_24h = serializers.FloatField(
        allow_null=True, required=False, default=None)
    price_change_percentage_24h = serializers.FloatField(
        allow_null=True, required=False, default=None)
    market_cap_change_24h = serializers.FloatField(
        allow_null=True, required=False, default=None)
    market_cap_change_percentage_24h = serializers.FloatField(
        allow_null=True, required=False, default=None)
    circulating_supply = serializers.FloatField(
        allow_null=True, required=False, default=None)
    total_supply = serializers.FloatField(
        allow_null=True, required=False, default=None)
    max_supply = serializers.FloatField(
        allow_null=True, required=False, default=None)
    ath = serializers.FloatField(allow_null=True, required=False, default=None)
    ath_change_percentage = serializers.FloatField(
        allow_null=True, required=False, default=None)
    ath_date = serializers.CharField(
        allow_blank=True, allow_null=True, required=False, default=None)
    atl = serializers.FloatField(allow_null=True, required=False, default=None)
    atl_change_percentage = serializers.FloatField(
        allow_null=True, required=False, default=None)
    atl_date = serializers.CharField(
        allow_blank=True, allow_null=True, required=False, default=None)
    roi = RoiSerializer(allow_null=True, required=False, source="*")
    last_updated = serializers.CharField(
        allow_blank=True, allow_null=True, required=False, default=None)

    def validate(self, data):
        if "roi" in data:
            if "roi" == null:
                data["roi"] = {}
        return data

    class Meta:
        model = CoinData
        fields = [
            "id", "symbol", "name", "image", "current_price", "market_cap", "market_cap_rank", "fully_diluted_valuation", "total_volume", "high_24h", "low_24h", "price_change_24h", "price_change_percentage_24h", "market_cap_change_24h", "market_cap_change_percentage_24h", "circulating_supply", "total_supply", "max_supply", "ath", "ath_change_percentage", "ath_date", "atl", "atl_change_percentage", "atl_date", "roi", "last_updated"
        ]
