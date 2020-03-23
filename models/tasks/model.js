const mongoose = require('mongoose');
const amocrm = require('amocrm-js');
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
  id: Number,
  name: String,
  amoTasks: Array,
  oldTasks: Array,
})

const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = Tasks;
