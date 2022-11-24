import React, {useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';

export default function SignUp() {
	const history = useHistory();

	useEffect(() => {
		const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('email');
		localStorage.removeItem('totalPrice');
		localStorage.removeItem('roomPrice');
		localStorage.removeItem('checkin');
		localStorage.removeItem('checkout');
		localStorage.removeItem('currentRoom');
		localStorage.removeItem('currentHotel');
		localStorage.removeItem("cardName");
        localStorage.removeItem("cardNumber");
        localStorage.removeItem("expDate");
        localStorage.removeItem("cvv");
		localStorage.removeItem("hotelId");
		localStorage.removeItem("customerId");
		localStorage.removeItem("roomId");
		localStorage.removeItem("name");
		axiosInstance.defaults.headers['Authorization'] = null;
		history.push('/login');
		window.location.reload();
	});
	return <div>Logout</div>;
}