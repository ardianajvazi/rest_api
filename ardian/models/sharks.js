const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sharkSchema = new Schema({
  name: String,
  size: String,
  food: {type: String, default: 'people'}
});

module.exports = mongoose.model('Shark', sharkSchema);
