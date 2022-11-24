import React, { useEffect, useState } from 'react';
import './App.css';
import Hotels from './components/hotels/hotels';
import HotelLoadingComponent from './components/hotels/hotelLoading';
import axiosInstance from './axios';

//List all current hotels
function App() {
	const HotelLoading = HotelLoadingComponent(Hotels);
	const [appState, setAppState] = useState({
		loading: true,
		hotels: null,
	});

	useEffect(() => {
		axiosInstance.get(`/listofhotels/`).then((res) => {
			const allHotels = res.data;
			setAppState({ loading: false, hotels: allHotels });
			console.log(res.data);
		});
	}, [setAppState]);

	return ( 
		<div className="App">
			<h1>CURRENT HOTELS</h1>
			<HotelLoading isLoading={appState.loading} hotels={appState.hotels} />
		</div>
	);
}
export default App;