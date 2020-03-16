const express = require('express');
//const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Editor = require('../models/editor/model');

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secret';
  opts.audience = 'localhost';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({id: jwt_payload.sub}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              return done(null, user);
          } else {
              return done(null, false);
              // or you could create a new account
          }
      });
  }));
}
