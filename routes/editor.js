const express = require('express');
const secret = require('../config/databaseConf');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: secret.secret,
  userProperty: 'user'
});
const Editor = require('../models/editor/model');
const passport = require('passport');
//const jwt = require('jsonwebtoken');

router.post('/addeditor', (req, res) => {

  let {login, password, name, phone} = req.body;

  Editor.findOne({login: login}, (err, doc) => {
    if (doc != null && doc.login === login) {
      res.send({error: "User already exists"})
      return;
    } else {
      //new Editor(req.body).save();
      let editor = new Editor();
      editor.login = login;
      editor.password = password;
      editor.name = name;
      editor.phone = phone;

      editor.setPassword(password);
      editor.save((err) => {
        let token = editor.generateJwt();
      })
      res.send({message: "User added successfully"});
    }
  })
})

/*router.post('/login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  passport.authenticate('local', (err, editor, info) => {
    console.log(editor)
    let token;
    if (err) res.send({error: err});
    if (editor) {
      token = editor.generateJwt();
      res.send({token: token, editor: editor._id})
    } else {
      res.send(info)
    }
  })(req, res)

  // Editor.findOne({login: login}, (err, doc) => {
  //   if (err) console.log("Error: Что-то пошло не так", err);
  //
  //   if (!doc) return res.send({error: "User is not found"});
  //
  //   if (doc.validEditor(login, password)) {
  //
  //       let token = jwt.sign(doc.toJSON(), 'testsecret', {
  //         expiresIn: 1000
  //       });
  //
  //       res.send({
  //         success: true,
  //         token: `JWT ${token}`,
  //         editor: {
  //           id: doc._id,
  //           login: doc.login,
  //           name: doc.name
  //         }
  //       })
  //
  //   } else {
  //     res.send({error: "Wrong login or password"})
  //   };
  // })
})*/

router.post('/dashboard', auth, (req, res) => {
    console.log(req.user);
    res.send({test: "test"})
})

module.exports = router;
