const mongoose = require('mongoose');
const statisticsSchema = new mongoose.Schema({
  event: {
      type: String,
      required: true
  },
  timeOfEvent:{
      type: Date,
      default: new Date(Date.now())
  }
})

const Logger = new mongoose.model('Logger', statisticsSchema);
module.exports = Logger;