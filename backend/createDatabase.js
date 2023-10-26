// createDatabase.js

const { Int32 } = require('bson');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myproject', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected successfully to MongoDB');

    // Define a schema for the 'customers' collection
    const customerSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      balance: {
        type: Number,
        integer: true
      }
    });

    // Check if the 'users' model has already been registered
    let Customer;
    try {
      Customer = mongoose.model('users');
    } catch (e) {
      // If the model doesn't exist, create and register it
      Customer = mongoose.model('users', customerSchema);
    }

    // Generate random user data
    const name = `user${Math.floor(Math.random() * 10000)}`;
    const email = `${name}@mit.edu`;
    const password = `Pa$$w0rd${Math.floor(Math.random() * 10000)}`;
    const balance = 0;

    // Create a new customer document
    const newCustomer = new Customer({ name, email, password, balance });

    // Save the customer document to the database
    newCustomer.save()
      .then(() => {
        console.log('Document inserted');
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Find and log all customer documents
    const customers = await Customer.find();
    console.log('Collection:', customers);

    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('Connection closed');
  })
  .catch(error => {
    console.error('Error:', error);
  });
