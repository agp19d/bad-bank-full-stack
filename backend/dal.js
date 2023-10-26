// dal.js
const mongoose = require('mongoose');
const User = require('./Users');
const connectionString = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/myproject_dev"

const connectDb = () => {
  return mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
};

// Create user function
const create = async (name, email, password) => {
  try {
    const user = new User({ name, email, password });
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};

// Find user function
const find = async ({ name, email }) => {
  try {
      let query = {};

      if (name) {
          query.name = name;
      } else if (email) {
          query.email = email;
      } else {
          throw new Error("Either name or email must be provided.");
      }

      const user = await User.findOne(query);
      return user;
  } catch (err) {
      throw err;
  }
};

// // To find by name
// const userByName = await findUser({ name: "testuser" });

// // To find by email
// const userByEmail = await findUser({ email: "testuser@email.com" });



module.exports = { create, connectDb, find };
