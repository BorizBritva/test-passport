const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
/*const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;*/
const Editor = require('../models/editor/model');
const Admin = require('../models/admin/model');

passport.use(new LocalStrategy(
  {
  usernameField: 'login'
  },
  (username, password, done) => {
    Editor.findOne({login: username}, (err, editor) => {
      if (err) return done(err);
      if (!editor) {
        Admin.findOne({login: username}, (err, admin) => {
          if (err) return done(err);
          if (!admin) {
            return done(null, false, {error: 'Неверный логин'})
          }
          if (!admin.validPassword(password)) {
            return done(null, false, {error: 'Неверный пароль'})
          }
          return done(null, admin, {editor: 0, username: admin.name})
        })
        return;
        /*return done(null, false, {
          error: 'Неверный логин'
        })*/
      }
      if (!editor.validPassword(password)) {
        return done(null, false, {
          error: 'Неверный пароль'
        })
      }
      return done(null, editor, {editor: 1, username: editor.name})
    })
}))


/*module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secret';
  opts.audience = 'localhost';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      Editor.findOne({id: jwt_payload.sub}, function(err, user) {
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
}*/
