var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  task: String,
  isComplete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Todo', TodoSchema);