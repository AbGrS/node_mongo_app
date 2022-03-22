const mongoose = require('mongoose');
const userSchemma = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
      type: String,
      required: true
  },
  dob: Date,
  address: String,
  contact: String,
  password: {
      type: String,
      required: true
  },

})

const User = new mongoose.model('User', userSchemma);
module.exports = User;