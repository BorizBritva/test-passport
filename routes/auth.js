const express = require('express');
const router = express.Router();
const Editor = require('../models/editor/model');
const Admin = require('../models/admin/model');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/auth', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  Admin.findOne({login: login}, (err, doc) => {
    if (err) console.log("Error: Что-то пошло не так", err);

    if (!doc) return res.send({error: "User is not found"});

    if (doc.validData(login, password)) {

        let token = jwt.sign(doc.toJSON(), 'secret', {
          expiresIn: 1000
        });

        res.send({
          success: true,
          token: `JWT ${token}`,
          editor: {
            id: doc._id,
            login: doc.login,
            name: doc.name
          }
        })

    } else {
      res.send({error: "Wrong login or password"})
    };
  })

})

module.exports = router;
