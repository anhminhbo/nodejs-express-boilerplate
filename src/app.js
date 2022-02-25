const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');

// Use morgan to log any requests come to server
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// **
// FOR SSR ONLY
// **
// tell express to look into public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup for serving ssr in views foler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// set security http headers
app.use(helmet());

// CORS for server and client communication
app.use(cors());

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
  max: 60, //   max number of limits
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: ' Too many req from this IP , please Try  again in 15 minutes!',
});

app.use('/api', limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
// parses incoming requests with JSON payloads
// content-type: application/json
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

// testing middleware
app.use((req, res, next) => {
  console.log('this is a middleware');
  next();
});

module.exports = app;
