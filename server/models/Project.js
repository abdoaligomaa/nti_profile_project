const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  icon: String
});

module.exports = mongoose.model('Project', projectSchema);
