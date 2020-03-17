const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Editor = require('../editor/model');
const Schema = mongoose.Schema;

const admin = new Schema({
  local_id: Number,
  domain: String,
  login: String,
  name: String,
  password: String,
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

const Admin = mongoose.model('admin', admin);

module.exports = Admin;
