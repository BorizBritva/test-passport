const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../../config/databaseConf');
const Schema = mongoose.Schema;

const admin = new Schema({
  local_id: Number,
  domain: String,
  login: String,
  name: String,
  password: String,
  hash: String,
  salt: String,
  contacts: {
    tlephone: String,
    meesenger: String
  },
  tasks: {
    works: Array,
    considerations: Array,
    appointments: Array,
    status: Array,
    check: Array,
    edits: Array,
    final: Array,
  },
  editors: Array,
  custom_fields: Array
})

admin.methods.validData = function(log, pas) {
  return this.login === log && this.password === pas ? true : false;
}

admin.methods.validData = function(log, pas) {
  return this.login === log && this.password === pas ? true : false;
}

admin.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, null).toString('hex');
}

admin.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, null).toString('hex');
  return this.hash === hash;
}

admin.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    login: this.login,
    name: this.name,
    exp: parseInt(expiry.getTime()/1000),
  }, secret.secret)
}

const Admin = mongoose.model('admin', admin);

module.exports = Admin;
