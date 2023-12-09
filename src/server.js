const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001; 

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'escape', 
  database: 'dayplanner'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

app.post('/api/save-entry', (req, res) => {
  const { entry } = req.body;

  const sql = 'INSERT INTO journal_entries (content) VALUES (?)';
  connection.query(sql, [entry], (err, result) => {
    if (err) {
      console.error('Error saving entry:', err);
      res.status(500).json({ error: 'Failed to save entry' });
      return;
    }
    console.log('Entry saved successfully!');
    res.status(200).json({ message: 'Entry saved successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
