const db = require('../db');

/*
    CATEGORY CONTROLS
*/

const createCategory = (req, res) => {
  const title = { title: req.body.title };
  const sql = `INSERT INTO categories SET ?`;

  db.query(sql, title, (err, results) => {
    err ? res.status(500).json({ error: err.message })
      : res.status(201).send('category has been created');
  });
};
const deleteCategoryById = (req, res) => {
  const { id, title } = req.body;
  const sql = `DELETE FROM categories WHERE id = ? OR title = ?`;

  db.query(sql, [id, title], (err, results) => {
    err ? res.status(500).json({ error: err.message })
      : res.status(200).json('category has been deleted');
  });

};
const getAllCategories = (req, res) => {
  // const sql = `SELECT * FROM categories`; // organize values before sending
  const sql = `
    SELECT categories.id, title, SUM(time) as total_time FROM categories
    LEFT JOIN logs
    ON categories.id = logs.category_id 
    GROUP BY title
    ORDER BY id ASC;`;

  db.query(sql, (err, results) => {
    err ? res.status(500).json({ error: err.message })
      : res.status(200).json({ results });
  });

};
const getCategoryById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM categories WHERE id = ? OR title = ?`;

  db.query(sql, [id, id], (err, results) => {
    err ? res.status(500).json({ error: err.message })
      : res.status(200).json({ results });
  });

};
const getCategoryLogs = (req, res) => {
  const { id } = req.params;
  const sql = `
  SELECT title as category, category_id, logs.id as log_id, time, finished_date 
  FROM categories
  LEFT JOIN logs
  ON categories.id = logs.category_id 
  WHERE categories.id = ? OR title = ?`;

  db.query(sql, [id, id], (err, results) => {
    err ? res.status(500).json({ error: err.message })
      : res.status(200).json({ results });
  });
};
const updateCategory = (req, res) => {
  const { new_title, id, title } = req.body;
  const sql = `UPDATE categories SET title = ? WHERE id = ? OR title = ?`;
  db.query(sql, [new_title, id, title], (err, results) => {
    err ? res.status(500).json({ error: err.message })
      : res.status(200).send('category has been updated');
  });
};

/*
    LOG CONTROLS
*/

const createLog = (req, res) => {
  const { category_id, finished_date, time } = req.body;
  const log = { category_id, finished_date, time };
  const sql = `INSERT INTO logs SET ?`;

  db.query(sql, log, (err, results) => {
    err ? res.status(500).json({ error: err.message })
      : res.status(201).send({ results });
  });
};
const deleteLogById = (req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM logs WHERE id = ?`;

  db.query(sql, [id], (err) => {
    err ? res.status(500).json({ error: err.message })
      : res.status(200).send('log has been deleted');
  });
};
const getAllLogs = (req, res) => {
  const sql = `SELECT * FROM logs;`;

  db.query(sql, (err, results) => {
    err ? res.status(500).json({ error: err.message })
      : res.status(200).json({ results });
  });
};
const getLogById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM logs WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    err ? res.status(500).json({ error: err.message })
      : res.status(200).json({ results });
  });
};
const updateLogById = (req, res) => {
  const { category_id, finished_date, time, id } = req.body;
  const conditions = [];
  const values = [];

  if (category_id !== undefined) {
    conditions.push('category_id = ?');
    values.push(category_id);
  }
  if (finished_date !== undefined) {
    conditions.push('finished_date = ?');
    values.push(finished_date);
  }
  if (time !== undefined) {
    conditions.push('time = ?');
    values.push(time);
  }

  if (conditions.length !== 0) {
    const sql = `UPDATE logs SET ${conditions.join(', ')} WHERE id = ?`;
    console.log(sql);
    console.log([...values, id]);

    db.query(sql, [...values, id], (err, results) => {
      err ? res.status(500).json({ error: err.message })
        : res.status(200).json('log has been created');
    });
  }
};

module.exports = {
  createCategory,
  createLog,
  deleteCategoryById,
  deleteLogById,
  getAllCategories,
  getAllLogs,
  getCategoryById,
  getCategoryLogs,
  getLogById,
  updateCategory,
  updateLogById,
};
