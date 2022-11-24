import React, { useEffect, useState } from 'react';
import HotelManager from './components/admin/hotelManagers';
import HotelManagerLoadingComponent from './components/hotelManagers/hotelManagerLoading';
import axiosInstance from './axios';


//Admin Page
function Admin() {
	const HotelManagerLoading = HotelManagerLoadingComponent(HotelManager);
	const [appState, setAppState] = useState({
		loading: true,
		hotelManagers: null,
	});

	useEffect(() => {
		axiosInstance.get('user/').then((res) => {
			const allHotelManagers = res.data;
			setAppState({loading: false, hotelManagers: allHotelManagers});
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div className="App">
			<h1>CURRENT HOTEL MANAGERS</h1>
			<HotelManagerLoading isLoading={appState.loading} hotelManagers={appState.hotelManagers} />
		</div>
	);
}
export default Admin;