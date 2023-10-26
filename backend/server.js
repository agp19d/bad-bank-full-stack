// server.js

// Environment setup
const envPath = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
require('dotenv').config({ path: envPath });

const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');
const User = require('./Users');

// Extract port. Default to 5000 if not set
const port = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json()); // For parsing JSON request body

// create user account
app.post('/api/register', async function (req, res) { // Changed from GET to POST for security reasons

    const { name, email, password } = req.body;

    try {
        // check if account exists
        const existingUsers = await dal.find({ email });

        // if user exists, return error message
        if (existingUsers)  {
            console.log('User already exists');
            return res.status(400).send('User already exists');
        }

        // create user with hashed password
        const newUser = await dal.create(name, email, password);
        console.log(newUser);
        res.status(201).send(newUser);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server Error');
    }
});


// Fetch all users
app.get('/api/getAllUsers', async (req, res) => {
    try {
      const users = await User.find();  // Fetch all users
      res.status(200).json(users);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server Error');
    }
  });
  
  // Login route
  app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;
    console.log(req.body);
    try {
      const user = await dal.find({ name });
      if (!user) {
        return res.status(401).send('Invalid username or password');
      }
  
      const isMatch = password === user.password;

      if (!isMatch) {
        return res.status(401).send('Invalid username or password');
      }
  
      // Create JWT or just send back user data.
      res.status(200).json({
        message: 'Logged in successfully',
        username: user.name,
        balance: user.balance,
        // Optional: token: "YOUR_JWT_HERE"
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server Error');
    }
  });

  // Update balance route
  app.post('/api/updateBalance', async (req, res) => {
    const { name, newBalance } = req.body;
    try {
        const user = await User.findOne({ name: name });
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.balance = newBalance;
        await user.save();

        res.json({ balance: newBalance });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server Error');
    }
});

  
// Connect to the database
dal.connectDb().then(() => {
    console.log('Connected successfully to the database');
    app.listen(port, () => {
        console.log('Running on port: ' + port);
    });
}).catch((err) => {
    console.error('Failed to connect to the database', err);
});
