/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import CryptoJS, { HmacSHA256 } from 'crypto-js';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const defaultInputForm = {
  amount: '',
};

const useStyles = makeStyles({
  root: {
    width: '80%',
    margin: '2rem auto',
  },
  containerGrid: {
    padding: '2rem',
  },
  itemGrid: {
    textAlign: 'center',
  },
});

const Checkout = () => {
  const classes = useStyles();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputForm, setInputForm] = useState(defaultInputForm);

  const handleChange = (e) => {
    e.persist();
    setInputForm((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleVerifyResponse = async (response, razorpay_order_id) => {
    const { razorpay_payment_id, razorpay_signature } = response;
    const secret = process.env.REACT_APP_RAZORPAY_KEY_SECRET;
    const generated_signature = HmacSHA256(`${razorpay_order_id}|${razorpay_payment_id}`, secret).toString(CryptoJS.enc.Hex);
    if (generated_signature === razorpay_signature) {
      await axios.post('/api/payments', response, { timeout: 20000 });
      setMessage('Successful');
    } else {
      setMessage('Unsuccessful');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const body = { amount: parseInt(inputForm.amount, 10) };
      const reqOptions = { timeout: 30000 };
      const response = await axios.post('/api/razorpay', body, reqOptions);

      const key = process.env.REACT_APP_RAZORPAY_KEY_ID;
      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: response.data.amount, // Amount is in currency subunits. Default currency is INR.
        currency: response.data.currency,
        name: 'Acme Corp',
        description: 'Test Transaction',
        image: null, // URL
        order_id: response.data.id, // This is the `id` obtained in the response.
        handler: (res) => { handleVerifyResponse(res, response.data.id); },
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999',
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      setMessage('error');
    } finally {
      setLoading(false);
      setInputForm({ amount: '' });
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container className={classes.containerGrid}>
          <Grid item xs={12} className={classes.itemGrid}>
            <TextField
              margin="dense"
              name="amount"
              variant="outlined"
              id="amount"
              value={inputForm.amount}
              label="amount"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className={classes.itemGrid}>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size="1rem" /> : null}
            >
              {loading ? 'wait...' : 'pay'}
            </Button>
          </Grid>
          {message === null ? null : (
            <Grid item xs={12} className={classes.itemGrid}>
              <Typography component="small" align="center" color="error" gutterBottom>
                {message}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default Checkout;
