from rest_framework import generics
from users.models import User
from .serializers import RegisterHotelManagerSerializer, UserSerializer
from rest_framework.permissions import IsAdminUser, SAFE_METHODS, BasePermission, AllowAny, DjangoModelPermissions
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

# Customer Permission
class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='customer'):
            return True
        return False
    
# Hotel Manager Permission
class IsHotelManager(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='hotel_manager'):
            return True
        return False

# Admin Permission
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='admin'):
            return True
        return False
    
class HotelManagerList(generics.ListCreateAPIView, IsAdmin):
    permission_classes = [IsAdmin]
    queryset =  User.objects.all().filter(groups__name__in=['hotel_manager'])
    serializer_class = UserSerializer

class HotelManagerDetail(generics.RetrieveAPIView, IsAdmin):
    permission_classes = [IsAdmin]
    queryset =  User.objects.all().filter(groups__name__in=['hotel_manager'])
    serializer_class = UserSerializer

class HotelManagerEdit(generics.UpdateAPIView, IsAdmin):
    permission_classes = [IsAdmin]
    queryset =  User.objects.all().filter(groups__name__in=['hotel_manager'])
    serializer_class = UserSerializer
    
class HotelManagerDelete(generics.RetrieveDestroyAPIView, IsAdmin):
    permission_classes = [IsAdmin]
    queryset =  User.objects.all().filter(groups__name__in=['hotel_manager'])
    serializer_class = UserSerializer

class AdminDetail(generics.ListAPIView, IsAdmin):
    permission_classes = [IsAdmin]
    queryset =  User.objects.all().filter(groups__name__in=['admin'])
    serializer_class = UserSerializer

class CustomerDetail(generics.ListAPIView, IsCustomer):
    permission_classes = [IsCustomer]
    serializer_class = UserSerializer
    
    def get_queryset(self):
        #owner = request.user.owner
        return User.objects.all().filter(email=self.request.user.email)

class HotelManager(generics.ListAPIView, IsHotelManager):
    permission_classes = [IsHotelManager] 
    serializer_class = UserSerializer
    # Define Custom Queryset
    def get_queryset(self):
        #owner = request.user.owner
        return User.objects.all().filter(email=self.request.user.email)
    
class HotelManagerCreate(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, format=None):
        print(request.data)
        serializer = RegisterHotelManagerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, format='json'):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
