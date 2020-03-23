const express = require('express');
const secret = require('../config/databaseConf');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: secret.secret,
  userProperty: 'user'
});
const Editor = require('../models/editor/model');
const Admin = require('../models/admin/model');
const AmoCRM = require('../routes/apiamocrm');
const passport = require('passport');
//const jwt = require('jsonwebtoken');

router.post('/addeditor', (req, res) => {

  let {login, password, name, phone} = req.body;

      if (login.length==0 || password.length==0) {
          res.send({message: "Data not filled in"})
          return;
      }

  Editor.findOne({login: login}, (err, doc) => {
    if (doc != null && doc.login === login) {
      res.send({message: "User already exists"})
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

      Admin.find({}, (err, admin) => {
          if (err) return;
          admin.forEach(item => {
              item.editors.push(editor);
              item.save();
          })
      })

      res.send({message: "User added successfully"});
    }
  })
})

router.post('/get-tasks', auth, (req, res) => {
    let editor = req.body.id.toString().slice(1, -1);
    Editor.findOne({_id: editor}, (err, doc) => {
        if (err) res.send({error: 'error'});
        if (!doc) res.send({error: 'error'});
        !doc.tasks ? res.send({error: 'error'}) : res.send(doc.tasks)
    })
})

router.post('/get-tasks/takework', auth, (req, res) => {
    let admin = req.body.task.resp_id;
    let editor = req.body.task.editor;
    let task = req.body.task;


        Promise.all([Admin.findOne({_id: admin}), Editor.findOne({_id: editor})])
            .then(data => {

                Admin.findOne({_id: admin}, (err, doc) => {
                    if (err) return;
                    doc.tasks.status.push(task);
                    doc.save();
                })

                Editor.findOne({_id: editor}, (err, doc) => {
                    if (err) return;
                    doc.tasks.allTask.forEach((item, i) => {
                        if (item.id == task.id) {
                            doc.tasks.allTask.splice(i, 1)
                        }
                    })
                    doc.tasks.inWorks.push(task);
                    doc.save();
                    res.send(doc.tasks)
                })

                AmoCRM.request
                    .post( '/api/v2/leads', {
                        update: [
                            {
                                id: task.id,
                                status_id: 28958398,
                                updated_at: Date.now(),
                                name: task.name,
                                custom_fields: [{
                                  id: 640185,
                                  values: [{
                                    value: data[0].name
                                  }]
                                }, {
                                  id: 640187,
                                  values: [{
                                    value: data[1].name
                                  }]
                                }]
                                // другие поля ...
                            }
                        ]
                    })
                    .then( data => {
                        return;
                    })
                    .catch( e => {
                        return;
                    })

            })
            .catch(err => {
                return
            })

})

router.post('/get-tasks/tocheck', auth, (req, res) => {
    let admin = req.body.task.resp_id;
    let editor = req.body.task.editor;
    let task = req.body.task;

    Admin.findOne({_id: admin}, (err, doc) => {
        if (err) return;
        doc.tasks.status.forEach((item, i) => {
            if (item.id == task.id) {
                doc.tasks.status.splice(i, 1)
            }
        })
        doc.tasks.check.push(task);
        doc.save();
    })

    Editor.findOne({_id: editor}, (err, doc) => {
        if (err) return;
        doc.tasks.inWorks.forEach((item, i) => {
            if (item.id == task.id) {
                doc.tasks.inWorks.splice(i, 1)
            }
        })
        doc.tasks.inChecks.push(task);
        doc.save();
        res.send(doc.tasks)
    })


})

router.post('/get-tasks/revs', auth, (req, res) => {
    let admin = req.body.task.resp_id;
    let editor = req.body.task.editor;
    let task = req.body.task;

    Admin.findOne({_id: admin}, (err, doc) => {
        if (err) return;
        doc.tasks.edits.forEach((item, i) => {
            if (item.id == task.id) {
                doc.tasks.edits.splice(i, 1)
            }
        })
        doc.tasks.check.push(task);
        doc.save();
    })

    Editor.findOne({_id: editor}, (err, doc) => {
        if (err) return;
        doc.tasks.completion.forEach((item, i) => {
            if (item.id == task.id) {
                doc.tasks.completion.splice(i, 1)
            }
        })
        doc.tasks.inChecks.push(task);
        doc.save();
        res.send(doc.tasks)
    })


})

router.post('/get-tasks/back', auth, (req, res) => {

    let admin = req.body.task.resp_id;
    let editor = req.body.task.editor;
    let task = req.body.task;

    Admin.findOne({_id: admin}, (err, doc) => {
        if (err) return;
        doc.tasks.works.forEach((item, i) => {
            if (item.id == task.id) {
                doc.tasks.works.splice(i, 1)
            }
        })
        doc.tasks.considerations.push(task);
        doc.save();
    })

    Editor.findOne({_id: editor}, (err, doc) => {
        if (err) return;
        doc.tasks.allTask.forEach((item, i) => {
            if (item.id == task.id) {
                doc.tasks.allTask.splice(i, 1)
            }
        })
        doc.save();
        res.send(doc.tasks)
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
