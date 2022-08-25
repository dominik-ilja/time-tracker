const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

db.connect((err) => {
  if (err) {
    console.log('Error occurred: ', err);
  }
  else {
    console.log('Connected to MySQL Server');
  }
});

db.on('error', (err) => {
  if (err) {
    console.log('Error occurred: ', err);
  }
  else {
    console.log('Connected to MySQL Server');
  }
});

module.exports = db;
