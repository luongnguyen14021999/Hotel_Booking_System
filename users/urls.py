from xml.etree.ElementInclude import include
from django.urls import path
from .views import AdminDetail, CustomerDetail, HotelManager, HotelManagerDelete, HotelManagerCreate, HotelManagerEdit, HotelManagerDetail, HotelManagerList, HotelManagerDetail, CustomUserCreate, BlacklistTokenUpdateView
from .views import  CustomUserCreate, BlacklistTokenUpdateView

app_name = 'users'

urlpatterns = [
    # URLs for login, register and User Editing
    path('<int:pk>/', HotelManagerDetail.as_view(), name='detail_create'),
    path('', HotelManagerList.as_view(), name='list_hotel_manager'),
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('hotelmanager/', HotelManager.as_view(), name="manager_hotel_detail"),
    path('admin/', AdminDetail.as_view(), name="admin_detail"),
    path('customer/', CustomerDetail.as_view(), name="customer_detail"),
    path('admin/create/', HotelManagerCreate.as_view(), name="create_hotel_manager"),
    path('admin/edit/hotelmanagerdetail/<int:pk>/', HotelManagerDetail.as_view(), name="detail_hotel"),
    path('admin/edit/<int:pk>/', HotelManagerEdit.as_view(), name="edit_hotel"),
    path('admin/delete/<int:pk>/', HotelManagerDelete.as_view(), name="delete_hotel"),
]