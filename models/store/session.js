const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const session = new Schema({
  user: String,
  token: String,
  edit: String,
})

session.methods.clearRecord = function(id) {

}

const Session = mongoose.model('session', session);

module.exports = Session;
