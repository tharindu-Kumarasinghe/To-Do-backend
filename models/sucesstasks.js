const mongoose = require('mongoose');

const sucess_taskSchema = mongoose.Schema({
  task: { type: String, required: true },
  date: { type: String, required: true }
});

module.exports = mongoose.model('sucesstask',sucess_taskSchema);
