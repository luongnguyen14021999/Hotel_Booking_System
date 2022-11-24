import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
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

export default function ConfirmationBooking() {
    const { id } = useParams();
    const classes = useStyles();
	const history = useHistory();
    
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);

    const [appState, setAppState] = useState({
		bookings: null,
	});

    const [message, setMessage] = useState(null);

	useEffect(() => {
		axiosInstance.get('/booking/'+id).then((res) => {
			const allBookings = res.data;
			setAppState({bookings: allBookings });
			console.log(res.data);
		});
	}, [setAppState]);

	const handleChange = (e) => {
        if ([e.target.name] == 'checkin') {
            setCheckIn(e.target.value.trim());
            console.log(e.target.value.trim());
        }

        if ([e.target.name] == 'checkout') {
            setCheckOut(e.target.value.trim());
            console.log(e.target.value.trim());
        }
    }



    const handleSubmit = (e) => {
		e.preventDefault();
        let error_message = null;
        localStorage.setItem("checkin", checkIn);
        localStorage.setItem("checkout", checkOut);
        var one_day = 1000 * 60 * 60 * 24
        
        var check_in = new Date(checkIn);

        var check_out = new Date(checkOut);

        var current = new Date();
  
        // To Calculate the result in milliseconds and then converting into days
        var Result = Math.round(check_out.getTime() - check_in.getTime()) / (one_day);
  
        // To remove the decimals from the (Result) resulting days value
        var Final_Result = Result.toFixed(0);
        localStorage.setItem("totalPrice", Final_Result*localStorage.getItem('roomPrice'));

        if(Final_Result < 0) {
            error_message = <p style={{color: "red", marginTop: "0.2rem", marginLeft:"8px"}}>**Your check out should be selected after check in time. Please select again</p>
            setMessage(error_message);
        } else if(check_in.getTime() <= current.getTime()) {
            error_message = <p style={{color: "red", marginTop: "0.2rem", marginLeft:"8px"}}>**Your check in is already passed. Please select again</p>
            setMessage(error_message);
        } else {
            let time_in = null;
            let time_out = null;
    
            for(let i=0;i<appState.bookings.length;i++) {
                time_in = new Date(appState.bookings[i].check_in).getTime();
                time_out = new Date(appState.bookings[i].check_out).getTime();
                if((time_in <= check_in.getTime() && check_in.getTime() <= time_out) || (time_in <= check_out.getTime() && check_out.getTime() <= time_out)) {
                    error_message = <p style={{color: "red", marginTop: "0.2rem", marginLeft:"8px"}}>**Your room is not available for whole this range of time. Please select again</p>;
                    setMessage(error_message);
                    return;
                }
            }

            history.push({
                pathname: '/confirmationbooking/',
            });
            window.location.reload();
        }
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Room Booking
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h6>Customer Email: {localStorage.getItem("email")}</h6>
		                </Grid>
                        <Grid item xs={12}>
                            <h6>Hotel: {localStorage.getItem("currentHotel")}</h6>
		                </Grid>
                        <Grid item xs={12}>
                            <h6>Requested Room: {localStorage.getItem("currentRoom")}</h6>
		                </Grid>
                        <Grid item xs={12}>
                        <TextField
                            id="checkin"
                            name="checkin"
                            label="Check In"
                            type="datetime-local"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="checkin"
                            onChange={handleChange}
                        />
						</Grid>
						<Grid item xs={12}>
                        <TextField
                            id="checkout"
                            name="checkout"
                            label="Check Out"
                            type="datetime-local"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoComplete="checkout"
                            onChange={handleChange}
                        />
						</Grid>
                        <Grid item xs={12}>
                        {message}
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
						Book the room
					</Button>
				</form>
			</div>
		</Container>
	);
}