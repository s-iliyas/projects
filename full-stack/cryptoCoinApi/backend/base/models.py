from django.utils import timezone
from django.db import models
from datetime import datetime


class CoinData(models.Model):
    row_id = models.AutoField(primary_key=True)
    id = models.CharField(
        primary_key=False, max_length=5000, null=True, blank=True)
    symbol = models.CharField(max_length=5000, null=True, blank=True)
    name = models.CharField(max_length=5000, null=True, blank=True)
    image = models.CharField(max_length=5000, null=True, blank=True)
    current_price = models.FloatField(null=True, blank=True)
    market_cap = models.FloatField(null=True, blank=True)
    market_cap_rank = models.FloatField(null=True, blank=True)
    fully_diluted_valuation = models.FloatField(null=True, blank=True)
    total_volume = models.FloatField(null=True, blank=True)
    high_24h = models.FloatField(null=True, blank=True)
    low_24h = models.FloatField(null=True, blank=True)
    price_change_24h = models.FloatField(null=True, blank=True)
    price_change_percentage_24h = models.FloatField(null=True, blank=True)
    market_cap_change_24h = models.FloatField(null=True, blank=True)
    market_cap_change_percentage_24h = models.FloatField(null=True, blank=True)
    circulating_supply = models.FloatField(null=True, blank=True)
    total_supply = models.FloatField(null=True, blank=True)
    max_supply = models.FloatField(null=True, blank=True)
    ath = models.FloatField(null=True, blank=True)
    ath_change_percentage = models.FloatField(null=True, blank=True)
    ath_date = models.CharField(max_length=5000, null=True, blank=True)
    atl = models.FloatField(null=True, blank=True)
    atl_change_percentage = models.FloatField(null=True, blank=True)
    atl_date = models.CharField(max_length=5000, null=True, blank=True)
    times = models.FloatField(null=True, blank=True)
    currency = models.CharField(max_length=5000, null=True, blank=True)
    percentage = models.FloatField(null=True, blank=True)
    last_updated = models.CharField(max_length=5000, null=True, blank=True)
    created_time = models.DateTimeField(default=timezone.now, editable=False)
    updated_time = models.DateTimeField(auto_now=True, blank=True)

    class Meta:
        db_table = "coin_data"

    def __str__(self):
        return self.id+" "+self.last_updated