from django.contrib import admin
from . import models

# Register our models for admin panel

@admin.register(models.Hotel)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'address', 'services', 'rating', 'image', 'owner')
    
@admin.register(models.Room)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'type', 'price', 'size', 'capacity', 'pets', 'breakfast','featured','description','image','hotel')

@admin.register(models.Booking)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('total_price', 'id', 'check_in', 'check_out', 'customer', 'room', 'hotel')
    
@admin.register(models.CardPayment)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('cardName', 'id', 'cardNumber', 'expDate', 'cvv', 'owner')