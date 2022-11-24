from urllib import request
from rest_framework import generics
from backend.models import Hotel, Room, Booking
from .serializers import BookingSerializer, CardPaymentSerializer, HotelSerializer, RoomSerializer
from rest_framework.permissions import AllowAny, SAFE_METHODS, BasePermission, DjangoModelPermissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser, FileUploadParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
from django.shortcuts import get_object_or_404
from rest_framework import filters

# Customer Permission
class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='customer'):
            return True
        return False
    
# Amin Permission
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='admin'):
            return True
        return False

# Hotel Manager Permission
class IsHotelManager(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='hotel_manager'):
            return True
        return False

    
class HotelList(generics.ListCreateAPIView, IsHotelManager):
    permission_classes = [IsHotelManager] 
    serializer_class = HotelSerializer
    
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Hotel, name=item)
    
    # Define Custom Queryset
    def get_queryset(self):
        #owner = request.user.owner
        user = self.request.user
        return Hotel.objects.all().filter(owner=user)
    
class ListOfHotel(generics.ListCreateAPIView, AllowAny):
    permission_classes = [AllowAny]
    queryset =  Hotel.objects.all()  
    serializer_class = HotelSerializer
    
class HotelDetail(generics.RetrieveAPIView, AllowAny):
    permission_classes = [AllowAny]
    queryset =  Hotel.objects.all()
    serializer_class = HotelSerializer

class HotelListDetailFilter(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['address','name']

    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.

class HotelReview(generics.RetrieveAPIView, IsHotelManager):
    permission_classes = [IsHotelManager]
    queryset =  Hotel.objects.all()
    serializer_class = HotelSerializer

class HotelEdit(generics.UpdateAPIView, IsHotelManager):
    permission_classes = [IsHotelManager]
    queryset =  Hotel.objects.all()
    serializer_class = HotelSerializer
    
class HotelDelete(generics.RetrieveDestroyAPIView, IsHotelManager):
    permission_classes = [IsHotelManager]
    queryset =  Hotel.objects.all()
    serializer_class = HotelSerializer

class HotelCreate(APIView):
    permission_classes = [IsHotelManager]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
         
class ListRoom(generics.ListCreateAPIView, AllowAny):
    permission_classes = [AllowAny] 
    serializer_class = RoomSerializer
    
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Room, name=item)
    
        # Define Custom Queryset
    def get_queryset(self):
        pk = self.kwargs["id"]
        queryset = Room.objects.filter(hotel=pk)
        return queryset

class RoomList(generics.ListAPIView, IsHotelManager):
    permission_classes = [IsHotelManager]
    queryset =  Room.objects.all()   
    serializer_class = RoomSerializer

class RoomReview(generics.RetrieveAPIView, AllowAny):
    permission_classes = [AllowAny]
    queryset =  Room.objects.all()
    serializer_class = RoomSerializer

class RoomEdit(generics.UpdateAPIView, IsHotelManager):
    permission_classes = [IsHotelManager]
    queryset =  Room.objects.all()
    serializer_class = RoomSerializer
    
class RoomDelete(generics.RetrieveDestroyAPIView, IsHotelManager):
    permission_classes = [IsHotelManager]
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class RoomCreate(APIView):
    permission_classes = [IsHotelManager]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ListBooking(generics.ListAPIView, IsCustomer):
    permission_classes = [IsCustomer] 
    serializer_class = BookingSerializer
    
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Booking, name=item)
    
    # Define Custom Queryset
    def get_queryset(self):
        pk = self.kwargs["id"]
        queryset = Booking.objects.filter(room=pk)
        return queryset

class BookingList(generics.ListAPIView, IsHotelManager):
    permission_classes = [IsHotelManager]
    queryset =  Booking.objects.all()   
    serializer_class = BookingSerializer

class BookingCreate(APIView):
    permission_classes = [IsCustomer]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CardPaymentCreate(APIView):
    permission_classes = [IsCustomer]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = CardPaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

