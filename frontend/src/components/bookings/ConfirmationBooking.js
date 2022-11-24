import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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

    const history = useHistory();
    const classes = useStyles();

    const handleSubmit = (e) => {
		e.preventDefault();

        history.push({
            pathname: '/paymentform/',
        });
        window.location.reload();
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Confirmation Booking
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
                            <h6>Check In: {localStorage.getItem("checkin")}</h6>
		                </Grid>
                        <Grid item xs={12}>
                            <h6>Check Out: {localStorage.getItem("checkout")}</h6>
		                </Grid>
                        <Grid item xs={12}>
                            <h6>Total Price: ${localStorage.getItem("totalPrice")}</h6>
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
						Payment
					</Button>
				</form>
			</div>
		</Container>
	);
}