const path = require('path');
const dotenv = require('dotenv').config({ path: path.join(__dirname, '/config.env') });
const morgan = require('morgan');

const port = process.env.PORT || '8000';

const app = require('./app.js');


app.get('/food', (req, res) => {
  res.status(200).send('WHATABYTE: Food For Devs');
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
