const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  task: { type: String, required: true },
  date: { type: String, required: true },
  creator: {type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true}

});

module.exports = mongoose.model('task', taskSchema);
