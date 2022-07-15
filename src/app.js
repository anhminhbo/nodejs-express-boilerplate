// App module will handle all application logic from security to business logic
const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const path = require('path');

const { ResponseService } = require('./services');
const { Error } = require('./config');
const { globalErrorHandler } = require('./middlewares');

require('dotenv').config({ path: path.join(__dirname, '/config.env') });
// Get router
const { UserRouter } = require('./routers');

// Use morgan to log any requests come to server
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// **
// FOR SSR ONLY
// **
// tell express to look into public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup for serving ssr in views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up for express to read cookies send by frontend
app.use(cookieParser());

// set security http headers
app.use(helmet());

// CORS for server and client communication
app.use(cors());

// set limit request from same API in timePeroid from same ip
// set this limit to API calls only
const limiter = rateLimit({
  max: 20, //   max number of limits
  windowMs: 5 * 60 * 1000, // 5 minutes
  message: ' Too many req from this IP , please Try  again in 5 minutes!',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skipSuccessfulRequests: true, // skip if the request is succesful
});

app.use('/api', limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
// parses incoming requests with JSON payloads
// content-type: application/json
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); // filter out the dollar signs protect from  query injection attack

// Data sanitization against XSS
app.use(xss()); // protect from molision code coming from html

// // testing middleware
// app.use((req, res, next) => {
//   console.log('this is a middleware');
//   next();
// });

// Deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
    res.end();
  });
}
// Use specific Router to handle each end point
app.use('/api/v1/users', UserRouter);

// handling all (get,post,update,delete.....) unhandled routes
app.use('*', (req, res, next) => {
  next(ResponseService.newError(Error.UrlNotFound.errCode, Error.UrlNotFound.errMessage));
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
