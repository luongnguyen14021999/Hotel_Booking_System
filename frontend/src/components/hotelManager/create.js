import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Create() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		name: '',
		address: '',
		services: '',
		rating: '',
		image: '',
        owner: '',
	});

	const [hotelData, updateFormData] = useState(initialFormData);
    const [hotelImage, setHotelImage] = useState(null);
	const [appState, setAppState] = useState(0);

	useEffect(() => {
		axiosInstance.get('user/hotelmanager/').then((res) => {
			const hotelManagerDetail = res.data;
			setAppState(hotelManagerDetail[0].id);
		});
	}, [0]);


	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setHotelImage({
				image: e.target.files,
			});
		}

		if ([e.target.name] == 'name') {
			updateFormData({
				...hotelData,
				[e.target.name]: e.target.value.trim(),
			});
		} else {
			updateFormData({
				...hotelData,
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

    const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('name', hotelData.name);
		formData.append('address', hotelData.address);
		formData.append('services', hotelData.services);
		formData.append('rating', hotelData.rating);
		formData.append('image', hotelImage.image[0]);
		formData.append('owner', appState);
		
		axiosInstance.post(`hotel/create/`, formData);
		history.push({
			pathname: '/hotel/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Create New Hotel
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Hotel"
								name="name"
								autoComplete="name"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="address"
								label="Address"
								name="address"
								autoComplete="address"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="services"
								label="Services"
								name="services"
								autoComplete="services"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="rating"
								label="Rating"
								name="rating"
								autoComplete="rating"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
                        <input
							accept="image/*"
							className={classes.input}
							id="hotel-image"
							onChange={handleChange}
							name="image"
							type="file"
						/>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Create Hotel
					</Button>
				</form>
			</div>
		</Container>
	);
}