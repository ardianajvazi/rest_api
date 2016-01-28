const mongoose = require('mongoose');

var peopleSchema = new mongoose.Schema({
  name: String,
  weapon: String,
  food: {type: String, default: 'sharks'}
});

module.exports = exports = mongoose.model('People', peopleSchema);
