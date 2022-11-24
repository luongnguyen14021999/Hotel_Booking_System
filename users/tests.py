from rest_framework import status
from rest_framework.test import APITestCase
from users.models import User, CustomAccountManager 
from django.contrib.auth.models import Permission, Group
from django.urls import reverse
from backend.models import Hotel, Room, Booking, CardPayment
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.files.uploadedfile import SimpleUploadedFile

# Unit testings for authentication and authorization
class UserTests(APITestCase):
    def setUp(self):
        group_name = "customer"
        self.group = Group(name=group_name)
        self.group.save()
        self.data = {
            'email': 'test@gmail.com',
            'user_name':'username',
            'first_name':'firstname',
            'last_name':'lastname',
            'password':'password',
        }

    #Register with credentials already exist
    def test_register_with_exist_user(self):
        self.user = User.objects.create_user('test@gmail.com', 'username', 'firstname', 'lastname', 'password')
        
        url = reverse('users:create_user')
        
        response = self.client.post(url, self.data, format = 'json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    #Register with new credentials
    def test_register_new_user(self):
        url = reverse('users:create_user')
        
        response = self.client.post(url, self.data, format = 'json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    #Login with wrong credentials
    def test_login_with_wrong_credentials(self):
        self.credential = {
            'email': 'test@gmail.com',
            'password': 'password'
        }
        
        url = reverse('token_obtain_pair')
        
        response = self.client.post(url, self.credential, format = 'json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    #Login with exist credentials but inactive 
    def test_login_exist_credentials_inactive(self):
        
        self.user = User.objects.create_user('test2@gmail.com', 'username2', 'firstname', 'lastname', 'password2')

        self.user.is_active = False
        self.user.save()
        
        self.credential = {
            'email': 'test2@gmail.com',
            'password': 'password2'
        }
        
        url = reverse('token_obtain_pair')
        
        response = self.client.post(url, self.credential, format = 'json')
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    #Login with exist and active credentials 
    def test_login_exist_credentials_active(self):
        
        self.user = User.objects.create_user('test2@gmail.com', 'username2', 'firstname', 'lastname', 'password2')

        self.user.is_active = True
        self.user.save()
        
        self.credential = {
            'email': 'test2@gmail.com',
            'password': 'password2'
        }
        
        url = reverse('token_obtain_pair')
        
        response = self.client.post(url, self.credential, format = 'json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# Unit testings for hotel and room features
class HotelAndRoomTests(APITestCase):
    def setUp(self):
        group_name = "hotel_manager"
        self.group = Group(name=group_name)
        self.group.save()
        self.user = User.objects.create_user('test2@gmail.com', 'username2', 'firstname', 'lastname', 'password2')
        self.user.groups.add(self.group)
        self.user.is_active = True
        self.user.save()
        
        self.credential = {
            'email': 'test2@gmail.com',
            'password': 'password2'
        }
        
        url = reverse('token_obtain_pair')
        
        response = self.client.post(url, self.credential, format = 'json')
        
        token = response.data['refresh']
        
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {token}')
        
        url1 = reverse('users:manager_hotel_detail')
        
        response1 = self.client.get(url1, format = 'json')
        
        self.id = response1.data[0]['id']

        self.png_hex = ['\x89', 'P', 'N', 'G', '\r', '\n', '\x1a', '\n', '\x00',
           '\x00', '\x00', '\r', 'I', 'H', 'D', 'R', '\x00',
           '\x00', '\x00', '\x01', '\x00', '\x00', '\x00', '\x01',
           '\x08', '\x02', '\x00', '\x00', '\x00', '\x90',
           'w', 'S', '\xde', '\x00', '\x00', '\x00', '\x06', 'b', 'K',
           'G', 'D', '\x00', '\x00', '\x00', '\x00',
           '\x00', '\x00', '\xf9', 'C', '\xbb', '\x7f', '\x00', '\x00',
           '\x00', '\t', 'p', 'H', 'Y', 's', '\x00',
           '\x00', '\x0e', '\xc3', '\x00', '\x00', '\x0e', '\xc3',
           '\x01', '\xc7', 'o', '\xa8', 'd', '\x00', '\x00',
           '\x00', '\x07', 't', 'I', 'M', 'E', '\x07', '\xe0', '\x05',
           '\r', '\x08', '%', '/', '\xad', '+', 'Z',
           '\x89', '\x00', '\x00', '\x00', '\x0c', 'I', 'D', 'A', 'T',
           '\x08', '\xd7', 'c', '\xf8', '\xff', '\xff',
           '?', '\x00', '\x05', '\xfe', '\x02', '\xfe', '\xdc', '\xcc',
           'Y', '\xe7', '\x00', '\x00', '\x00', '\x00',
           'I', 'E', 'N', 'D', '\xae', 'B', '`', '\x82']

        self.valid_png_bin = str.encode("".join(self.png_hex))
        self.png = SimpleUploadedFile("test.png", self.valid_png_bin)
        
    # Test for viewing all current hotels    
    def test_view_hotels(self):
        url = reverse('backend_api:list_hotel')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    #  Test for creating a new hotel
    def test_create_hotels(self):
        self.hotel = {
            'name': 'test',
		    'address': 'test',
		    'services': 'test',
		    'rating': 'test',
		    'image': self.png,
            'owner': self.id
        }
        url = reverse('backend_api:create_hotel')
        response = self.client.post(url, self.hotel, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    # Test for viewing rooms     
    def test_view_rooms(self):
        url = reverse('backend_api:list_room')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
       
    # Test for creating a new room
    def test_create_room(self):
        self.hotel = {
            'name': 'test',
		    'address': 'test',
		    'services': 'test',
		    'rating': 'test',
		    'image': self.png,
            'owner': self.id
        }
        url = reverse('backend_api:create_hotel')
        response = self.client.post(url, self.hotel, format='json')
        
        self.room = {
            'name': 'test',
            'type': 'double',
            'price': 200,
            'size': 500,
            'capacity': 5,
            'pets': True,
            'breakfast': False,
            'featured': False,
            'description': 'Test',
		    'image': self.png,
            'hotel': response.data['id'],
        }
        
        url = reverse('backend_api:create_room')
        response1 = self.client.post(url, self.room, format='json')
        self.assertEqual(response1.status_code, status.HTTP_200_OK)

# Test for hotel manager
class HotelManagerTests(APITestCase):
    def setUp(self):
        group_name = "admin"
        self.group = Group(name=group_name)
        self.group.save()
        self.user = User.objects.create_user('test2@gmail.com', 'username2', 'firstname', 'lastname', 'password2')
        self.user.groups.add(self.group)
        self.user.is_active = True
        self.user.save()
        
        self.credential = {
            'email': 'test2@gmail.com',
            'password': 'password2'
        }
        
        url = reverse('token_obtain_pair')
        
        response = self.client.post(url, self.credential, format = 'json')
        
        token = response.data['refresh']
        
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {token}')

    # Test for viewing all hotel managers
    def test_view_hotelmanagers(self):
        url = reverse('users:list_hotel_manager')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    # Test for creating new hotel managers    
    def test_create_hotelmanagers(self):
        self.hotel_manager = {
            'email': 'test@gmail.com',
		    'user_name': 'test',
		    'first_name': 'test',
		    'last_name': 'test',
		    'password': 'password',
        }
        self.group = Group(name="hotel_manager")
        self.group.save()
        self.user.groups.add(self.group)
        url2 = reverse('users:create_hotel_manager')
        response2 = self.client.post(url2, self.hotel_manager, format='json')
        self.assertEqual(response2.status_code, status.HTTP_200_OK)
        
class BookingTests(APITestCase):
    def setUp(self):
        group_name = "hotel_manager"
        self.group = Group(name=group_name)
        self.group.save()
        self.user = User.objects.create_user('test2@gmail.com', 'username2', 'firstname', 'lastname', 'password2')
        self.user.groups.add(self.group)
        self.user.is_active = True
        self.user.save()
        
        self.credential = {
            'email': 'test2@gmail.com',
            'password': 'password2'
        }
        
        url = reverse('token_obtain_pair')
        
        response = self.client.post(url, self.credential, format = 'json')
        
        token = response.data['refresh']
        
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {token}')
        
        url1 = reverse('users:manager_hotel_detail')
        
        response1 = self.client.get(url1, format = 'json')
        
        self.id = response1.data[0]['id']

        self.png_hex = ['\x89', 'P', 'N', 'G', '\r', '\n', '\x1a', '\n', '\x00',
           '\x00', '\x00', '\r', 'I', 'H', 'D', 'R', '\x00',
           '\x00', '\x00', '\x01', '\x00', '\x00', '\x00', '\x01',
           '\x08', '\x02', '\x00', '\x00', '\x00', '\x90',
           'w', 'S', '\xde', '\x00', '\x00', '\x00', '\x06', 'b', 'K',
           'G', 'D', '\x00', '\x00', '\x00', '\x00',
           '\x00', '\x00', '\xf9', 'C', '\xbb', '\x7f', '\x00', '\x00',
           '\x00', '\t', 'p', 'H', 'Y', 's', '\x00',
           '\x00', '\x0e', '\xc3', '\x00', '\x00', '\x0e', '\xc3',
           '\x01', '\xc7', 'o', '\xa8', 'd', '\x00', '\x00',
           '\x00', '\x07', 't', 'I', 'M', 'E', '\x07', '\xe0', '\x05',
           '\r', '\x08', '%', '/', '\xad', '+', 'Z',
           '\x89', '\x00', '\x00', '\x00', '\x0c', 'I', 'D', 'A', 'T',
           '\x08', '\xd7', 'c', '\xf8', '\xff', '\xff',
           '?', '\x00', '\x05', '\xfe', '\x02', '\xfe', '\xdc', '\xcc',
           'Y', '\xe7', '\x00', '\x00', '\x00', '\x00',
           'I', 'E', 'N', 'D', '\xae', 'B', '`', '\x82']

        self.valid_png_bin = str.encode("".join(self.png_hex))
        self.png = SimpleUploadedFile("test.png", self.valid_png_bin)
        
        self.hotel = {
            'name': 'test',
		    'address': 'test',
		    'services': 'test',
		    'rating': 'test',
		    'image': self.png,
            'owner': self.id
        }
        url = reverse('backend_api:create_hotel')
        self.response = self.client.post(url, self.hotel, format='json')
        
        self.room = {
            'name': 'test',
            'type': 'double',
            'price': 200,
            'size': 500,
            'capacity': 5,
            'pets': True,
            'breakfast': False,
            'featured': False,
            'description': 'Test',
		    'image': self.png,
            'hotel': self.response.data['id'],
        }
        
        url = reverse('backend_api:create_room')
        self.response1 = self.client.post(url, self.room, format='json')
        
    # Test for viewing all bookings
    def test_view_book(self):
        url = reverse('backend_api:list_booking')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    #Test for creating a new booking    
    def test_create_booking(self):
        self.user = User.objects.create_user('test4@gmail.com', 'username4', 'firstname', 'lastname', 'password4')
        self.user.groups.add(self.group)
        self.user.is_active = True
        self.user.save()
        
        self.credential = {
            'email': 'test4@gmail.com',
            'password': 'password4'
        }
        
        self.group = Group(name="customer")
        self.group.save()
        self.user.groups.add(self.group)
        
        url3 = reverse('token_obtain_pair')
        
        response3 = self.client.post(url3, self.credential, format = 'json')
        
        token = response3.data['refresh']
        
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {token}')
        
        url4 = reverse('users:customer_detail')
        
        response4 = self.client.get(url4, format = 'json')
        
        self.id = response4.data[0]['id']
        
        self.booking = {
            'total_price': 4000,
		    'check_in': '2022-11-09T00:13',
		    'check_out': '2022-11-25T00:13',
		    'customer': self.id,
		    'room': self.response.data['id'],
            'hotel': self.response1.data['id'],
        }
        url = reverse('backend_api:create_booking')
        response = self.client.post(url, self.booking, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class PaymentTests(APITestCase):
    def setUp(self):
        group_name = "customer"
        self.group = Group(name=group_name)
        self.group.save()
        self.user = User.objects.create_user('test5@gmail.com', 'username5', 'firstname', 'lastname', 'password5')
        self.user.groups.add(self.group)
        self.user.is_active = True
        self.user.save()
        
        self.credential = {
            'email': 'test5@gmail.com',
            'password': 'password5'
        }
        
        url = reverse('token_obtain_pair')
        
        self.response = self.client.post(url, self.credential, format = 'json')
        
        token = self.response.data['refresh']
        
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {token}')
        
        url4 = reverse('users:customer_detail')
        
        response4 = self.client.get(url4, format = 'json')
        
        self.id = response4.data[0]['id']
        
    # Test for creating a payment
    def test_create_payment(self):
        self.payment = {
            'cardName': 'test',
		    'cardNumber': 'test',
		    'expDate': 'test',
		    'cvv': 556,
		    'owner': self.id,
        }
        url6 = reverse('backend_api:create_cardpayment')
        response6 = self.client.post(url6, self.payment, format='multipart')
        self.assertEqual(response6.status_code, status.HTTP_200_OK)
    
    
        
        
        
        
        
        