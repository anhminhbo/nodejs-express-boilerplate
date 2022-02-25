const mongoose = require('mongoose');

const dbConnection = async () => {
  const db = await mongoose.connect(process.env.DATABASE_LOCAL);
  console.log('DB connection successful!');
  return db;
};

const dbDisconnect = (db) => {
  db.disconnect()
    .then(() => console.log('DB Disconnect succesfully!'))
    .catch((err) => console.log('DB Disconnect Failed! err: ', err));
};

module.exports = { dbConnection, dbDisconnect };
