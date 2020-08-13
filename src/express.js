/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// eslint-disable-next-line
const { mongoose } = require('./database');

const app = express();

// Settings
app.set('port', process.env.PORT || 3001);

// MiddleWares
app.use(morgan('dev'));
app.use(express.json());

// Routes

// Static Files
const index = path.join(__dirname, '../build');
app.use(express.static(index));

// Stating Server
app.listen(app.get('port'), () => {
  console.log(`Server on Port ${app.get('port')}`);
});
