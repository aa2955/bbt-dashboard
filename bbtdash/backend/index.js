const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Amit1234$',
  database: 'bbtdash'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.get('/regions', (req, res) => {
  db.query('SELECT * FROM Region', (err, results) => {
    if (err) {
      console.error('Error fetching regions:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ data: results });
    }
  });
});

app.get('/countries/:regionId', (req, res) => {
  const { regionId } = req.params;
  db.query('SELECT * FROM Country WHERE Region_ID = ?', [regionId], (err, results) => {
    if (err) {
      console.error('Error fetching countries:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ data: results });
    }
  });
});

app.get('/communities/:countryId', (req, res) => {
  const { countryId } = req.params;
  db.query('SELECT * FROM Community WHERE Country_ID = ?', [countryId], (err, results) => {
    if (err) {
      console.error('Error fetching communities:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ data: results });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
