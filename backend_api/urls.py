from django.urls import path
from .views import CardPaymentCreate, HotelDetail, ListRoom, RoomCreate, RoomDelete, RoomEdit, RoomList, HotelList, HotelListDetailFilter, ListOfHotel, HotelCreate, HotelDelete, HotelEdit, HotelReview, RoomList, RoomReview, BookingList, ListBooking, BookingCreate


app_name = 'backend_api'

urlpatterns = [
    
    # Hotel URLs
    path('<int:pk>/', HotelDetail.as_view(), name='detail_hotel'),
    path('search/', HotelListDetailFilter.as_view(), name='hotel_search'),
    path('', HotelList.as_view(), name='list_hotel'),
    path('listofhotels/', ListOfHotel.as_view(), name='list_hotel'),
    path('hotel/create/', HotelCreate.as_view(), name="create_hotel"),
    path('hotel/edit/hoteldetail/<int:pk>/', HotelReview.as_view(), name="detail_hotel"),
    path('hotel/edit/<int:pk>/', HotelEdit.as_view(), name="edit_hotel"),
    path('hotel/delete/<int:pk>/', HotelDelete.as_view(), name="delete_hotel"),
    path('hotel/<int:id>/', ListRoom.as_view(), name="list_room"),
    
    # Room URLs
    path('room/<int:pk>/', RoomReview.as_view(), name="detail_room"),
    path('room/', RoomList.as_view(), name="list_room"),
    path('room/create/', RoomCreate.as_view(), name="create_room"),
    path('room/edit/roomdetail/<int:pk>/', RoomReview.as_view(), name="detail_room"),
    path('room/edit/<int:pk>/', RoomEdit.as_view(), name="edit_room"),
    path('room/delete/<int:pk>/', RoomDelete.as_view(), name="delete_room"),
    
    # Booking URLs
    path('booking/', BookingList.as_view(), name='list_booking'),
    path('booking/<int:id>', ListBooking.as_view(), name='list_booking'),
    path('booking/create/', BookingCreate.as_view(), name="create_booking"),
    
    # Card Payment URLs
    path('cardpayment/create/', CardPaymentCreate.as_view(), name="create_cardpayment"),
]