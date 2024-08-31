const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: '10coolgirl',
    port: 5432, 
  });

app.post('/register', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    pool.query('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, email, password], (error, results) => {
        if (error) {
          throw error;
        }
        res.send('User registered successfully!');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    pool.query('SELECT * FROM users WHERE email = $3 AND password = $4', [email, password], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length > 0) {
        res.send('Login successful!');
      } else {
        res.send('Invalid credentials.');
      }
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});