const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: String,
  email: String,
  description: String,
  icon: String
});

module.exports = mongoose.model('Service', serviceSchema);
