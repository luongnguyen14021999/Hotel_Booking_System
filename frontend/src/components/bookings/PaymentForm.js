import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

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

export default function PaymentForm() {

    const history = useHistory();

    const [cardName, setCardName] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
    const [expDate, setExpDate] = useState(null);
    const [cvv, setCvv] = useState(null);

    const handleChange = (e) => {
        if ([e.target.name] == 'cardName') {
            setCardName(e.target.value.trim());
            console.log(e.target.value.trim());
        }

        if ([e.target.name] == 'cardNumber') {
            setCardNumber(e.target.value.trim());
            console.log(e.target.value.trim());
        }

        if ([e.target.name] == 'expDate') {
            setExpDate(e.target.value.trim());
            console.log(e.target.value.trim());
        }

        if ([e.target.name] == 'cvv') {
            setCvv(e.target.value.trim());
            console.log(e.target.value.trim());
        }
    }

    const handleSubmit = (e) => {
		e.preventDefault();
        localStorage.setItem("cardName", cardName);
        localStorage.setItem("cardNumber", cardNumber);
        localStorage.setItem("expDate", expDate);
        localStorage.setItem("cvv", cvv);
        
        history.push({
          pathname: '/review/',
        });
        window.location.reload();
	  };

    const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Payment details
          </Typography>
          <Stepper activeStep='1' className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>
              <React.Fragment>
                <Container maxWidth="md" component="main">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        required 
                        id="cardName" 
                        name="cardName" 
                        label="Name on card" 
                        fullWidth 
                        autoComplete="cc-name" 
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        required 
                        id="cardNumber" 
                        name="cardNumber" 
                        label="Card Number" 
                        fullWidth 
                        autoComplete="cc-name" 
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        required 
                        id="expDate" 
                        name="expDate" 
                        label="Expiry Date" 
                        fullWidth 
                        autoComplete="cc-name" 
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField 
                        required 
                        id="cvv" 
                        name="cvv" 
                        label="CVV" 
                        helperText="Last three digits on signature strip"
                        fullWidth 
                        autoComplete="cc-name" 
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="Remember credit card details for next time"
                      />
                    </Grid>
                  </Grid>
                </Container>
              </React.Fragment>
                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    className={classes.button}
                  >
                    Next
                  </Button>
                </div>
              </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}