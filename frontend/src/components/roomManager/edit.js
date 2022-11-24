import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Edit() {
	const history = useHistory();
	const { id } = useParams();
	const initialFormData = Object.freeze({
        id: '',
		name: '',
        type: '',
        price: '',
        size: '',
        capacity: '',
        pets: '',
        breakfast: '',
        featured: '',
        description: '',
        hotel: '',
	});

    const options = [
        {value: '', text: '--Choose a type of room--'},
        {value: 'single', text: 'single'},
        {value: 'double', text: 'double'},
        {value: 'family', text: 'family'},
        {value: 'president', text: 'president'},
    ];

    let option1 = [];

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

	const [formData, updateFormData] = useState(initialFormData);

	useEffect(() => {
		axiosInstance.get('room/edit/roomdetail/'+id+'/').then((res) => {
			updateFormData({
				...formData,
				['name']: res.data.name,
				['type']: res.data.type,
				['price']: res.data.price,
				['size']: res.data.size,
                ['capacity']: res.data.capacity,
                ['pets']: res.data.pets,
                ['breakfast']: res.data.breakfast,
                ['featured']: res.data.featured,
				['description']: res.data.description,
                ['hotel']: res.data.hotel,
			});
			console.log(res.data);
		});
	}, [updateFormData]);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance.put('room/edit/'+id+'/',{
			name: formData.name,
			type: formData.type,
			price: formData.price,
			size: formData.size,
			capacity: formData.capacity,
            pets: formData.pets,
            breakfast: formData.breakfast,
            featured: formData.featured,
            description: formData.description,
            hotel: formData.hotel,
		});
		history.push({
			pathname: '/room/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit Room
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
                                value={formData.name}
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
                                value={formData.price}
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
                                value={formData.size}
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
                                value={formData.capacity}
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
                                value={formData.description}
								multiline
								rows={4}
							/>
						</Grid>
                        <Grid item xs={12}>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                {options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                                ))}
                            </select>
						</Grid>
                        <Grid item xs={12}>
                            <select name="hotel" value={formData.hotel} onChange={handleChange}>
                                {appState.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                                ))}
                            </select>
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
						Update Room
					</Button>
				</form>
			</div>
		</Container>
	);
}