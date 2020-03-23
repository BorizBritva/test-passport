const express = require('express');
const secret = require('../config/databaseConf');
const Session = require('../models/store/session');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  passport.authenticate('local', (err, user, info) => {

    let token;
    if (err) res.send({error: err});
    if (user) {
      token = user.generateJwt();
      res.send({token: token, user: user._id, edit: info.editor, username: info.username})
    } else {
      res.send(info)
    }
  })(req, res)
})

  module.exports = router;
