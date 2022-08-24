const db = require('../db');

const main = () => {
  const sql = `
    INSERT INTO categories (title) 
    VALUES ('a'), ('bb'), ('cc');
  `;
  db.query(sql, (err, results) => {
    if (err) console.log(err);
    else console.log(results);
  });
  db.end();
};

main();
