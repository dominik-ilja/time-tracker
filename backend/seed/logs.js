const db = require('../db');
const date = require('date-and-time');

const main = () => {
  // const sql = `
  // INSERT INTO logs (time, finished_date)
  // VALUES (20, '${new Date().toISOString()}');`;
  const timestamp = date.format(new Date(), 'YYYY-MM-DD', 'HH:mm:ss');
  const sql = `
  INSERT INTO logs (categoryId, time, finished_date) 
  VALUES (1, 20, '${timestamp}');`;

  db.query(sql, (err, results) => {
    if (err) console.log(err);
    else console.log(results);
  });
  db.end();
};

main();
