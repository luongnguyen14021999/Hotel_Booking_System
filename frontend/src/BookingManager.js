import React, { useEffect, useState } from 'react';
import Bookings from './components/bookingManager/bookings';
import BookingLoadingManager from './components/bookingManagers/bookingManagerLoading';
import axiosInstance from './axios';

// Booking List Page
function BookingManager() {
	const BookingManagerLoading = BookingLoadingManager(Bookings);
	const [appState, setAppState] = useState({
		loading: true,
		bookings: null,
	});

	useEffect(() => {
		axiosInstance.get('/booking/').then((res) => {
			const allBookings = res.data;
			setAppState({loading: false, bookings: allBookings });
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div className="App">
			<h1>BOOKINGS</h1>
			<BookingManagerLoading isLoading={appState.loading} bookings={appState.bookings} />
		</div>
	);
}
export default BookingManager;