// Import required modules
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Create a connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });


// Connect to the database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
      return;
    }
    console.log('Connected to the MySQL database');
  });
  

// Question 1 goes here
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving patients:', err.message);
        res.status(500).json({ error: 'Failed to retrieve patients' });
      } else {
        res.status(200).json(results);
      }
    });
  });

// Question 2 goes here
// Retrieve all providers
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving providers:', err.message);
        res.status(500).json({ error: 'Failed to retrieve providers' });
      } else {
        res.status(200).json(results);
      }
    });
  });  


// Question 3 goes here
// Filter patients by first name
app.get('/patients/filter', (req, res) => {
    const firstName = req.query.first_name;
  
    if (!firstName) {
      return res.status(400).json({ error: 'First name is required' });
    }
  
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    
    db.query(query, [firstName], (err, results) => {
      if (err) {
        console.error('Error retrieving patients by first name:', err.message);
        res.status(500).json({ error: 'Failed to retrieve patients' });
      } else {
        res.status(200).json(results);
      }
    });
  });  


// Question 4 goes here
// Retrieve all providers by specialty
app.get('/providers/specialty', (req, res) => {
    const specialty = req.query.specialty;
  
    if (!specialty) {
      return res.status(400).json({ error: 'Specialty is required' });
    }
  
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    
    db.query(query, [specialty], (err, results) => {
      if (err) {
        console.error('Error retrieving providers by specialty:', err.message);
        res.status(500).json({ error: 'Failed to retrieve providers' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});