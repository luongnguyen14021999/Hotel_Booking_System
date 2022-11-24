from email.policy import default
from secrets import choice
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.utils.translation import gettext_lazy as _

# Upload images for hotels
def upload_to(instance, filename):
    return 'hotels/{filename}'.format(filename=filename)

# Upload images for rooms
def upload_to_1(instance, filename):
    return 'rooms/{filename}'.format(filename=filename)


# Hotel Model
class Hotel(models.Model):
    
    class HotelObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()
        
    name = models.CharField(max_length=250)
    image = models.ImageField(
        _("Image"), upload_to=upload_to, default='hotels/default.jpg', null=True)
    address = models.TextField(null=True)
    services = models.TextField(null=True)
    rating = models.TextField(null=True)
    published = models.DateTimeField(default=timezone.now)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='hotel_manager')
    objects = models.Manager()
    hotel_objects = HotelObjects()
    
    class Meta:
        ordering = ('-published',)
    
    def __str__(self):
        return self.name
    
# Room Model
class Room(models.Model):
    
    class RoomObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()
    
    ROOM_CATEGORIES = {
        ('single', 'single'),
        ('double','double'),
        ('family', 'family'),
        ('president', 'president'),
    }
    name = models.CharField(max_length=250)
    image = models.ImageField(
        _("Image"), upload_to=upload_to_1, default='rooms/default.jpg')
    type = models.CharField(max_length=50, choices=ROOM_CATEGORIES)
    price = models.IntegerField()
    size = models.IntegerField()
    capacity = models.IntegerField()
    pets = models.BooleanField(default=False)
    breakfast = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    description = models.TextField(null=True)
    published = models.DateTimeField(default=timezone.now)
    hotel = models.ForeignKey(
        Hotel, on_delete=models.CASCADE, related_name='hotel')
    objects = models.Manager()
    room_objects = RoomObjects()
    
    class Meta:
        ordering = ('-published',)
    
    def __str__(self):
        return self.name
# Booking Model
class Booking(models.Model):
    class BookingObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    total_price = models.IntegerField(default=0)
    check_in = models.DateTimeField('check in date', null=True)
    check_out = models.DateTimeField('check out date', null = True)
    published = models.DateTimeField(default=timezone.now)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='customer', null=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=True)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True)
    objects = models.Manager()
    room_objects = BookingObjects()
    
    class Meta:
        ordering = ('-published',)
        
# Card Payment Model 
class CardPayment(models.Model):
    class CardPaymentObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()
        
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cardName = models.CharField(max_length=250)
    cardNumber = models.CharField(max_length=16)
    expDate = models.CharField(max_length=50)
    cvv = models.IntegerField()
    published = models.DateTimeField(default=timezone.now)
    objects = models.Manager()
    cardpayment_objects = CardPaymentObjects()
    
    class Meta:
        ordering = ('-published',)
    
    