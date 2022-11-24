import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import HotelManager from './HotelManager';
import Navbar from './components/navbar';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Create from './components/hotelManager/create';
import Edit from './components/hotelManager/edit';
import Delete from './components/hotelManager/delete';
import CreateHotelManger from './components/admin/create';
import EditHotelManger from './components/admin/edit';
import DeleteHotelManger from './components/admin/delete';
import CreateRoom from './components/roomManager/create';
import EditRoom from './components/roomManager/edit';
import DeleteRoom from './components/roomManager/delete';
import Search from './components/search';
import Admin from './Admin';
import Home from './pages/Home';
import { RoomProvider } from './RoomContext';
import RoomManager from './RoomManager';
import ListRoom from './components/rooms/ListRoom';
import SingleRoom from './components/rooms/SingleRoom';
import Booking from './components/bookings/Booking';
import ConfirmationBooking from './components/bookings/ConfirmationBooking';
import PaymentForm from './components/bookings/PaymentForm';
import Review from './components/bookings/Review';
import Notification from './components/bookings/Notification';
import BookingManager from './BookingManager';

//Routing 
const routing = (
	<RoomProvider>
	<Router>
		<React.StrictMode>
			<Navbar />
			<Switch>
			    <Route exact path="/" component={Home} />
				<Route exact path="/hotels" component={App} />
				<Route exact path="/hotel" component={HotelManager} />
				<Route exact path="/hotelmanager" component={Admin} />
				<Route exact path="/hotel/create" component={Create} />
				<Route exact path="/hotel/edit/:id" component={Edit} />
				<Route exact path="/hotel/delete/:id" component={Delete} />
				<Route exact path="/room" component={RoomManager} />
				<Route exact path="/room/create" component={CreateRoom} />
				<Route exact path="/room/edit/:id" component={EditRoom} />
				<Route exact path="/room/delete/:id" component={DeleteRoom} />
				<Route exact path="/booking" component={BookingManager} />
				<Route exact path="/booking/:id" component={Booking} />
				<Route exact path="/confirmationbooking" component={ConfirmationBooking} />
				<Route exact path="/admin/delete/:id" component={DeleteHotelManger} />
				<Route exact path="/admin/edit/:id" component={EditHotelManger} />
				<Route exact path="/admin/create" component={CreateHotelManger} />
				<Route path="/hotel/:id" component={ListRoom} />
				<Route path="/room/:id" component={SingleRoom} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
				<Route path="/search" component={Search} />
				<Route path="/paymentform/" component={PaymentForm} />
				<Route path="/review/" component={Review} />
				<Route path="/notification/" component={Notification} />
			</Switch>
		</React.StrictMode>
	</Router>
	</RoomProvider>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
