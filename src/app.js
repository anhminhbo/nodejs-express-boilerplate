const express = require('express');

const app = express();

// Use morgan to log what requests come to server
const morgan = require('morgan');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

module.exports = app;
