from dataclasses import field
from rest_framework import serializers
from backend.models import Booking, Hotel, Room, CardPayment

# Hotel Serializer
class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ('id', 'name', 'address', 'services', 'rating', 'owner')
    
# Room Serializer    
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name', 'type', 'price', 'size', 'capacity', 'pets', 'breakfast','featured','description','hotel')

# Booking Serializer
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('total_price', 'id', 'check_in', 'check_out', 'customer', 'room', 'hotel')
        
# Card Payment Serializer
class CardPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardPayment
        fields = ('cardName', 'id', 'cardNumber', 'expDate', 'cvv', 'owner')