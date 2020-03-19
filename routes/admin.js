const express = require('express');
const router = express.Router();
const Admin = require('../models/admin/model');
const Editor = require('../models/editor/model');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/addadmin', (req, res) => {
  let {login, password, name} = req.body;

  Admin.findOne({login: login}, (err, doc) => {
    if (doc != null && doc.login === login) {
      res.send({error: "Admin already exists"})
    } else {

      let admin = new Admin();
      admin.login = login;
      admin.password = password;
      admin.name = name;

      admin.setPassword(password);
      admin.save((err) => {
        let token = admin.generateJwt();
      })

      Editor.find({})
        .then(editors => {
            return editors
        })
        .then(editors => {
            Admin.findOne({login: login})
                .then(() => {
                    Admin.findOne({login: login}, (err, admin) => {
                        editors.forEach(item => {
                            admin.editors.push(item);
                        })
                        admin.save();
                    })
                })
        })
      res.send({message: "Admin added successfully"});
    }
  })
})



/*router.post('/auth', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  Editor.findOne({login: login}, (err, doc) => {
    if (err) console.log("Error: Что-то пошло не так", err);

    if (!doc) return res.send({error: "User is not found"});

    if (doc.validEditor(login, password)) {

        let token = jwt.sign(doc.toJSON(), 'testsecret', {
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
})*/

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send({test: 'Test'});
})

module.exports = router;
