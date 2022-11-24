import React, { useEffect, useState } from 'react';
import Rooms from './components/roomManager/rooms';
import RoomLoadingComponent from './components/roomManagers/roomManagerLoading';
import axiosInstance from './axios';

// Room Manager Page
function RoomManager() {
	const RoomManagerLoading = RoomLoadingComponent(Rooms);
	const [appState, setAppState] = useState({
		loading: true,
		rooms: null,
	});

	useEffect(() => {
		axiosInstance.get('/room/').then((res) => {
			const allRooms = res.data;
			setAppState({loading: false, rooms: allRooms });
			console.log(res.data);
		});
	}, [setAppState]);

	return (
		<div className="App">
			<h1>CURRENT ROOMS</h1>
			<RoomManagerLoading isLoading={appState.loading} rooms={appState.rooms} />
		</div>
	);
}
export default RoomManager;