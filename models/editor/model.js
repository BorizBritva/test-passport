const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const editor = new Schema({
  local_id: Number,
  login: String,
  name: String,
  password: String,
  contacts: {
    tlephone: String,
    meesenger: String
  },
  tasks: {
    allTask: Array,
    inWorks: Array,
    inChecks: Array,
    completion: Array,
    final: Array
  },
  custom_fields: Array
})

editor.methods.validData = function(log, pas) {
  return this.login === log && this.password === pas ? true : false;
}

/*editor.methods.cryptoSalt = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

editor.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
}

editor.methods.generateJwt = function() {
  let expiry - new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    login: this.login,
    name: this.name,
    exp: parseInt(expiry.getTime()/1000),
  }, 'thisIsSecret')
}*/

const Editor = mongoose.model('editor', editor);

module.exports = Editor;
