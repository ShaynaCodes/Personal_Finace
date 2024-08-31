const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'finance',
    password: '10coolgirl',
    port: 5432, 
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', '../client/pages/index.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '', '../client/pages/signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '', '../client/pages/login.html'));
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users;';

  pool.query(query, (error, result) => {
    if (error) {
      console.error('Error occurred:', error);
      res.status(500).send('An error occurred while retrieving data from the database.');
    } else {
      const users = result.rows;
      res.json(users);
    }
  });
});

app.post('/register', (req, res) => {
    const {firstname, lastname, email, password } = req.body;

    pool.query('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, email, password], (error, results) => {
        if (error) {
          throw error;
        }
        res.send('User registered successfully!');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
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