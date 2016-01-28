const mongoose = require('mongoose');

var sharkSchema = new mongoose.Schema({
  name: String,
  size: String,
  food: {type: String, default: 'people'}
});

module.exports = exports = mongoose.model('Shark', sharkSchema);
