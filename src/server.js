// Server module only handle request from browser, opening port and handle Exceptions
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/config.env') });

// // handle uncaught Exception
// process.on('uncaughtException', (error) => {
//   // using uncaughtException event
//   console.log(' uncaught Exception => shutting down..... ');
//   console.log(error.name, error.message);
//   process.exit(1); //  emidiatly exists all from all the requests
// });

// Set up the application for the server
const app = require('./app');

const port = process.env.PORT || '7000';

const server = app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

// handle Globaly  the unhandle Rejection Error which is  outside the express
// e.g database connection
process.on('unhandledRejection', (error) => {
  // it uses unhandledRejection event
  // using unhandledRejection event
  console.log(' Unhandled Rejection => shutting down..... ');
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1); //  emidiatly exists all from all the requests sending OR pending
  });
});
