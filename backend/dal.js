const mongoose = require('mongoose');
const User = require('./Users');

const connectDb = () => {
  return mongoose.connect('mongodb://localhost:27017/myproject', {useNewUrlParser: true, useUnifiedTopology: true});
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

// // Find user function
// const find = async (email) => {
//     try {
//       const user = await User.findOne({ email });
//       return user;
//     } catch (err) {
//       throw err;
//     }
//   };
  
//   // Find user function
// const findUser = async (name) => {
//   try {
//     const user = await User.findOne({ name });
//     return user;
//   } catch (err) {
//     throw err;
//   }
// };

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
