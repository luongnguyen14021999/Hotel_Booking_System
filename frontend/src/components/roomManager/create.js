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
        type: '',
        price: '',
        size: '',
        capacity: '',
        pets: '',
        breakfast: '',
        featured: '',
        description: '',
		image: '',
        hotel: '',
	});

	const [roomData, updateFormData] = useState(initialFormData);
    const [roomImage, setRoomImage] = useState(null);

    const options = [
        {value: '', text: '--Choose a type of room--'},
        {value: 'single', text: 'single'},
        {value: 'double', text: 'double'},
        {value: 'family', text: 'family'},
        {value: 'president', text: 'president'},
    ];
    
    const [selected, setSelected] = useState(null);
    const [pet, setPet] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [featured, setFeatured] = useState(false);
    const [appState, setAppState] = useState([]);
    const [hotel, setHotel] = useState(null);

	useEffect(() => {
		axiosInstance.get().then((res) => {
			const allHotels = res.data;
            const arr = [];
            arr.push({value: '', text: '--Choose a hotel--'},)
            for(let i=0;i<allHotels.length; i++)
            {
                arr.push({value: allHotels[i].id, text:allHotels[i].name})
            }
            setAppState(arr);
		});
	}, [0]);


	const handleChange = (e) => {
		if ([e.target.name] == 'image') {
			setRoomImage({
				image: e.target.files,
		    });
			console.log(e.target.files);
		}

        if ([e.target.name] == 'type') {
			setSelected(e.target.value);
		}

        if ([e.target.name] == 'hotel') {
			setHotel(e.target.value);
		}

        if ([e.target.name] == 'pet') {
			setPet(current => !current);
		}

        if ([e.target.name] == 'breakfast') {
			setBreakfast(current => !current);
		}

        if ([e.target.name] == 'featured') {
			setFeatured(current => !current);
		}

		if ([e.target.name] == 'name') {
			updateFormData({
				...roomData,
				[e.target.name]: e.target.value.trim(),
			});
		} else {
			updateFormData({
				...roomData,
				[e.target.name]: e.target.value.trim(),
			});
		} 
	};

    const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('name', roomData.name);
        formData.append('type', selected);
        formData.append('price', roomData.price);
        formData.append('size', roomData.size);
		formData.append('capacity', roomData.capacity);
        formData.append('description', roomData.description);
		formData.append('pets', pet);
		formData.append('breakfast', breakfast);
        formData.append('featured', featured);
        formData.append("image", roomImage.image[0]);
		formData.append('hotel', hotel);

		axiosInstance.post(`room/create/`, formData);

		history.push({
			pathname: '/room/',
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
					Create New Room
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Room"
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
								id="price"
								label="Price"
								name="price"
								autoComplete="price"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="size"
								label="Size"
								name="size"
								autoComplete="size"
								onChange={handleChange}
								multiline
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="capacity"
								label="Capacity"
								name="capacity"
								autoComplete="capacity"
								onChange={handleChange}
								multiline
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="description"
								label="Description"
								name="description"
								autoComplete="description"
								onChange={handleChange}
								multiline
								rows={4}
							/>
						</Grid>
                        <Grid item xs={12}>
                            <select name="type" value={selected} onChange={handleChange}>
                                {options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                                ))}
                            </select>
						</Grid>
                        <Grid item xs={12}>
                            <select name="hotel" value={hotel} onChange={handleChange}>
                                {appState.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                                ))}
                            </select>
						</Grid>
                        <Grid item xs={12}>
                            Pet
                            <input
                                type="checkbox"
                                defaultChecked={false}
                                value={pet}
                                onChange={handleChange}
                                id="pet"
                                name="pet"
                            />
						</Grid>
                        <Grid item xs={12}>
                            Breakfast
                            <input
                                type="checkbox"
                                defaultChecked={false}
                                value={breakfast}
                                onChange={handleChange}
                                id="breakfast"
                                name="breakfast"
                            />
						</Grid>
                        <Grid item xs={12}>
                            Featured
                            <input
                                type="checkbox"
                                defaultChecked={false}
                                value={featured}
                                onChange={handleChange}
                                id="featured"
                                name="featured"
                            />
						</Grid>
                        <Grid item xs={12}>
						<input
							accept="image/*"
							className={classes.input}
							id="hotel-image"
							onChange={handleChange}
							name="image"
							type="file"
						/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Create Room
					</Button>
				</form>
			</div>
		</Container>
	);
}