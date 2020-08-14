import React, { useState } from 'react';
// import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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
  const [inputForm, setInputForm] = useState({});

  const handleChange = (e) => {
    e.persist();
    setInputForm((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      setMessage('done');
    } catch (err) {
      setMessage('error');
    } finally {
      setLoading(false);
      setInputForm({ amount: '' });
    }
  };

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
              startIcon={loading ? <CircularProgress size="1rem" color="white" /> : null}
            >
              {loading ? 'wait...' : 'pay'}
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.itemGrid}>
            <Typography component="small" align="center" color="error" gutterBottom>
              {message}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Checkout;
