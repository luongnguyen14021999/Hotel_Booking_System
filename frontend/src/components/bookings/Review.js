import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const details = [
  { name: 'Email', desc: localStorage.getItem('email')},
  { name: 'Hotel', desc: localStorage.getItem('currentHotel')},
  { name: 'Room', desc:  localStorage.getItem('currentRoom')},
  { name: 'Check In', desc: localStorage.getItem('checkin')},
  { name: 'Check Out', desc:  localStorage.getItem('checkout')},
];

const payments = [
  { name: 'Card type', detail: "Visa"},
  { name: 'Card holder', detail: localStorage.getItem("cardName") },
  { name: 'Card number', detail: localStorage.getItem("cardNumber")},
  { name: 'Expiry date', detail: localStorage.getItem("expDate") },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  stepper: {
    padding: theme.spacing(3, 0, 5),
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Payment details', 'Review your booking'];

export default function Review() {

    const history = useHistory();

    const classes = useStyles();

    const handleSubmit1 = (e) => {
      e.preventDefault();

      history.push({
          pathname: '/paymentform/',
      });
  };


   const handleSubmit2 = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('total_price', localStorage.getItem("totalPrice"));
		    formData.append('check_in', localStorage.getItem("checkin"));
        formData.append('check_out', localStorage.getItem("checkout"));
        formData.append('customer', localStorage.getItem("customerId"));
        formData.append('room', localStorage.getItem("roomId"));
		    formData.append('hotel', localStorage.getItem("hotelId"));

		    axiosInstance.post(`booking/create/`, formData);

        let formData1 = new FormData();
        formData1.append('cardName', localStorage.getItem("cardName"));
		    formData1.append('cardNumber', localStorage.getItem("cardNumber"));
        formData1.append('expDate', localStorage.getItem("expDate"));
        formData1.append('cvv', localStorage.getItem("cvv"));
        formData1.append('owner', localStorage.getItem("customerId"));

        axiosInstance.post(`cardpayment/create/`, formData1);

		    history.push({
			      pathname: '/notification/',
		  });
  };

  return (
    <React.Fragment>
      <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Booking Summary
            </Typography>
            <Stepper activeStep='2' className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
            </Stepper>
              <React.Fragment>
                <React.Fragment>
                  <React.Fragment>
                    <Container maxWidth="md" component="main"  style={{ background: '#f2f6fc' }}>
                      <List disablePadding>
                        {details.map((detail) => (
                          <ListItem className={classes.listItem} key={detail.name}>
                          <ListItemText primary={detail.name} secondary={detail.desc} />
                          </ListItem>
                        ))}
                      <ListItem className={classes.listItem}>
                        <ListItemText primary="Total" />
                        <Typography variant="subtitle1" className={classes.total}>
                          ${localStorage.getItem('totalPrice')}
                        </Typography>
                      </ListItem>
                      </List>
                      <Grid container spacing={2}>
                        <Grid item container direction="column" xs={12} sm={6}>
                          <Typography variant="h6" gutterBottom className={classes.title}>
                            Payment details
                          </Typography>
                          <Grid container>
                            {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                            <Grid item xs={6}>
                              <Typography gutterBottom>{payment.name}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography gutterBottom>{payment.detail}</Typography>
                            </Grid>
                            </React.Fragment>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                  </Container>
                </React.Fragment>
                  <div className={classes.buttons}>
                    <Button onClick={handleSubmit1} className={classes.button}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit2}
                      className={classes.button}
                    >
                      Place Booking
                    </Button>
                  </div>
            </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}