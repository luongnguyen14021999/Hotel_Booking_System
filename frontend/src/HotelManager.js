import React, { useEffect, useState } from 'react';
import Hotels from './components/hotelManager/hotels';
import HotelLoadingComponent from './components/hotels/hotelLoading';
import axiosInstance from './axios';

// Hotel Manager Page
function HotelManager() {
	const HotelManagerLoading = HotelLoadingComponent(Hotels);
	const [appState, setAppState] = useState({
		loading: true,
		hotels: null,
	});

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allHotels = res.data;
			setAppState({loading: false, hotels: allHotels });
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div className="App">
			<h1>CURRENT HOTELS</h1>
			<HotelManagerLoading isLoading={appState.loading} hotels={appState.hotels} />
		</div>
	);
}
export default HotelManager;