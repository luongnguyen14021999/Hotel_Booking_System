import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fade, makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';
import logo from '../images/logo.svg';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
}));

// Navigation of web application
function Header() {
	const classes = useStyles();
	let history = useHistory();
	const [data, setData] = useState({ search: '' });
	const email = localStorage.getItem("email");
	const [appState, setAppState] = useState({
		admin: null,
	});

	const [appState1, setAppState1] = useState({
		hotels: null,
	});

	useEffect(() => {
		axiosInstance.get('user/admin/').then((res) => {
			const adminDetail = res.data;
			setAppState({admin: adminDetail});
			console.log(res.data);
		});
	}, [setAppState]);

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allHotels = res.data;
			setAppState1({hotels: allHotels });
			console.log(res.data);
		});
	}, [setAppState1]);

	let value;
	let login;
	let register;
	let component;
	let component1;
	let component2;
	let logout;

	if (email != "") {
		value = email;
		login = '/';
		register = null;
		logout = <Button
		href="#"
		color="primary"
		variant="outlined"
		className={classes.link}
		component={NavLink}
		to="/logout"
	    >
		    Logout
	    </Button>;
		if(appState.admin != null) {
			component = <Button
			href="#"
			color="primary"
			variant="outlined"
			className={classes.link}
			component={NavLink}
			to='/hotelmanager'>
			Hotel Manager Management
			</Button>
		} 

		if(appState1.hotels != null)
		{
			component = <Button
			href="#"
			color="primary"
			variant="outlined"
			className={classes.link}
			component={NavLink}
			to='/hotel'>
			Hotel Management
			</Button>
			component1 = <Button
			href="#"
			color="primary"
			variant="outlined"
			className={classes.link}
			component={NavLink}
			to='/room'>
			Rooms
			</Button>
			component2 = <Button
			href="#"
			color="primary"
			variant="outlined"
			className={classes.link}
			component={NavLink}
			to='/booking'>
			Bookings
			</Button>
		}
	}
	
	if(email == null){
		value = "Sign In";
		login = '/login';
		register = <Link
		color="textPrimary"
		href="#"
		className={classes.link}
		component={NavLink}
		to="/register">Register</Link>;
		component = null;
		component1 = null;
		component2 = null;
		logout = null;
	}

	const goSearch = (e) => {
		history.push({
			pathname: '/search/',
			search: '?search=' + data.search,
		});
		window.location.reload();
	};
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							<img src={logo} alt="Hotel Booking"/>
						</Link>
						<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to= '/'>
						    Home
					    </Button>
						<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to= '/hotels'>
						    Hotels
					    </Button>
					</Typography>

					<SearchBar
						value={data.search}
						placeholder="Find your location"
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>

					<nav>
						{register}
					</nav>
					{component2}
					{component1}
					{component}
					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to={login}
					>
						{value}
					</Button>
					{logout}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;