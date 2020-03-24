const express = require('express');
const secret = require('../config/databaseConf');
const router = express.Router();
const AmoCRM = require('../routes/apiamocrm');
const Admin = require('../models/admin/model');
const Editor = require('../models/editor/model');
const Tasks = require('../models/tasks/model');
const passport = require('passport');
const jwt = require('express-jwt');
const auth = jwt({
  secret: secret.secret,
  userProperty: 'user'
});

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
      // admin.save((err) => {
      //   let token = admin.generateJwt();
      // })

      Promise.all([Tasks.find({}), Editor.find({})])
        .then(data => {
            let tasks = data[0][0].amoTasks;
            let editors = data[1];

            admin.tasks.works = [...tasks];
            admin.editors = [...editors];
            admin.save((err) => {
              let token = admin.generateJwt();
            })
        })

      res.send({message: "Admin added successfully"});
    }
  })
})

router.post('/get-task', auth, (req, res) => {
    let admin = req.body.id.toString().slice(1, -1);
    Admin.findOne({_id: admin}, (err, doc) => {
        if (err) return;
        return res.send({...doc.tasks, editors: doc.editors})
    })
})

router.post('/get-tasks/cons', auth, (req, res) => {
    let admin = req.body.user.toString();
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
        res.send({...doc.tasks, editors: doc.editors})
    })
})

router.post('/get-tasks/toback', auth, (req, res) => {
    let admin = req.body.user.toString();
    let task = req.body.task;

    Admin.findOne({_id: admin}, (err, doc) => {
        if (err) return;
        doc.tasks.considerations.forEach((item, i) => {
            if (item.id == task.id) {
                doc.tasks.considerations.splice(i, 1)
            }
        })
        doc.tasks.works.push(task);
        doc.save();
        res.send({...doc.tasks, editors: doc.editors})
    })
})

router.post('/get-tasks/status', auth, (req, res) => {
    let admin = req.body.user.toString();
    let task = req.body.task;
    let editor = req.body.task.editor;

    Promise.all([Admin.findOne({_id: admin}), Editor.findOne({_id: editor})])
        .then(data => {

            let adminName = { name: 'Аккаунт', values: [ { value: data[0].name } ] };
            let editName = { name: 'Editor', values: [ { value: data[1].name } ] };
            task.resp_id = admin;
            task.custom_fields = [ ...task.custom_fields, adminName, editName ];

            Editor.findOne({_id: editor}, (err, doc) => {
                if (err) return;
                doc.tasks.allTask.push(task);
                doc.save();
            })

            Admin.findOne({_id: admin}, (err, doc) => {
                if (err) return;
                doc.tasks.considerations.forEach((item, i) => {
                    if (item.id == task.id) {
                        doc.tasks.considerations.splice(i, 1)
                    }
                })
                //doc.tasks.status.push(task);
                doc.save();
                res.send({...doc.tasks, editors: doc.editors})
            })
        })
        .catch(err => {
            return
        })

})

router.post('/get-tasks/revs', auth, (req, res) => {
    let admin = req.body.user.toString();
    let task = req.body.task;
    let editor = req.body.task.editor;

    Promise.all([Admin.findOne({_id: admin}), Editor.findOne({_id: editor})])
        .then(data => {

            Editor.findOne({_id: editor}, (err, doc) => {
                if (err) return;
                doc.tasks.inChecks.forEach((item, i) => {
                    if (item.id == task.id) {
                        doc.tasks.inChecks.splice(i, 1)
                    }
                })
                doc.tasks.completion.push(task);
                doc.save()
            })

            Admin.findOne({_id: admin}, (err, doc) => {
                if (err) return;
                doc.tasks.check.forEach((item, i) => {
                    if (item.id == task.id) {
                        doc.tasks.check.splice(i, 1)
                    }
                })
                doc.tasks.edits.push(task);
                doc.save();
                res.send({...doc.tasks, editors: doc.editors})
            })
        })
        .catch(err => {
            return
        })
})

router.post('/get-tasks/accept', auth, (req, res) => {
    let admin = req.body.user.toString();
    let task = req.body.task;
    let editor = req.body.task.editor;

    Promise.all([Admin.findOne({_id: admin}), Editor.findOne({_id: editor})])
        .then(data => {

            Editor.findOne({_id: editor}, (err, doc) => {
                if (err) return;
                doc.tasks.inChecks.forEach((item, i) => {
                    if (item.id == task.id) {
                        doc.tasks.inChecks.splice(i, 1)
                    }
                })
                doc.tasks.final.push(task);
                doc.save()
            })

            Admin.findOne({_id: admin}, (err, doc) => {
                if (err) return;
                doc.tasks.check.forEach((item, i) => {
                    if (item.id == task.id) {
                        doc.tasks.check.splice(i, 1)
                    }
                })
                doc.tasks.final.push(task);
                doc.save();
                res.send({...doc.tasks, editors: doc.editors})
            })

            AmoCRM.request
                .post( '/api/v2/leads', {
                    update: [
                        {
                            id: task.id,
                            status_id: 31945801,
                            updated_at: Date.now(),
                            name: task.name,
                            // другие поля ...
                        }
                    ]
                })
                .then( data => {
                    console.log("ZBS", data);
                })
                .catch( e => {
                    console.log("PZDC", data);
                })

            Tasks.findOne({name: 'amoCRMtasksContainer'}, (err, doc) => {
              if (err) return;

              if (doc.oldTasks.length == 0) {
                task.cycle = 1;
                task.date = Date.now();
                doc.oldTasks.push(task);
              } else {

                doc.oldTasks.forEach((item, i) => {
                    if (item.id == task.id) {
                      task.cycle = item.cycle + 1;
                      task.date = Date.now();
                      doc.oldTasks.splice(i, 1);
                      doc.oldTasks.push(task);
                    } else {
                      task.cycle = 1;
                      task.date = Date.now();
                      doc.oldTasks.push(task);
                    }
                })

              }

              doc.save();
            })


        })
        .catch(err => {
            return
        })

})

module.exports = router;
