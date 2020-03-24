const amocrm = require('amocrm-js');
const Tasks = require('../models/tasks/model');
const Admin = require('../models/admin/model');

// generate ID for tasks data
const createDBid = (min, max) => {
    let id = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(id);
}

const idTaskData = createDBid(10000000, 99999999);

const AmoCRM = new amocrm({
    // логин пользователя в портале, где адрес портала domain.amocrm.ru
    domain: 'admincrecerru', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
    auth: {
        login: 'admin@crecer.ru',
        hash: '68e5abf63f05cdeeec1cc437208896c9095c4749', // API-ключ доступа
    }
});

Tasks.find({}, (err, doc) => {
        if (!doc.length) {
            Tasks.create({dataID: idTaskData, name: 'amoCRMtasksContainer'})

        }
})
.then(() => {
    Tasks.findOne({name: 'amoCRMtasksContainer'}, (err, doc) => {

        AmoCRM.request
          .get( '/api/v2/leads?status=28958392' )
          .then( data => {

              if (!data.hasOwnProperty('_embedded')) return;

              data._embedded.items.forEach((item, i) => {

                  AmoCRM.request
                    .get(item.contacts._links.self.href)
                    .then( name => {
                        //name._embedded.items[0].custom_fields[0].values[0].value
                        let link = !name._embedded.items[0].custom_fields[0] ? 'ссылка отсутствует' : name._embedded.items[0].custom_fields[0].values[0].value;
                        let customer = {id: item.contacts.id[0], name: 'Заказчик', values: [{ value: name._embedded.items[0].name } ] };
                        let linToCreo = {name: 'Ссылка на креотивы', values: [{ value: link }] };
                        item.custom_fields.push(customer);
                        item.custom_fields.push(linToCreo);
                        //let addtask = {...item, custom_fields: [{id: item.contacts.id[0], name: 'Заказчик', values: [{ value: name._embedded.items[0].name } ] }, {name: 'Ссылка на креотивы', values: [{ value: link }] }, ...item.custom_fields ] };
                        let addtask = item;
                        return addtask;
                    })
                    .then(addtask => {

                        let result = doc.amoTasks.find(item => item.id == addtask.id);
                        if (!result) {
                            doc.amoTasks.push(addtask);
                        };

                        doc.save();

                        return addtask;
                    })
                    .then(addtask => {
                        Admin.find({}, (err, admins) => {
                            if (err) return;
                            admins.forEach(item => {
                                if (!item.tasks.works.find(item => item.id == addtask.id)) item.tasks.works.push(addtask);
                                item.save();
                            })
                        })
                    })

                })

              })

          })

    })
.then(() => {
    Tasks.findOne({name: 'amoCRMtasksContainer'}, (err, doc) => {

        AmoCRM.request
          .get( '/api/v2/leads?status=28958395' )
          .then( data => {
              if (!data.hasOwnProperty('_embedded')) return;

              data._embedded.items.forEach((item, i) => {

                  AmoCRM.request
                    .get(item.contacts._links.self.href)
                    .then( name => {
                        // let link = !name._embedded.items[0].custom_fields[0] ? 'ссылка отсутствует' : name._embedded.items[0].custom_fields[0].values[0].value;
                        // let addtask = {...item, custom_fields: [{id: name._embedded.items[0].id , name: 'Заказчик', values: [{ value: name._embedded.items[0].name } ] }, {name: 'Ссылка на креотивы', values: [{ value: link }] }, ...item.custom_fields ], replacements: true }
                        // return addtask;
                        let link = !name._embedded.items[0].custom_fields[0] ? 'ссылка отсутствует' : name._embedded.items[0].custom_fields[0].values[0].value;
                        let customer = {id: item.contacts.id[0], name: 'Заказчик', values: [{ value: name._embedded.items[0].name } ] };
                        let linToCreo = {name: 'Ссылка на креотивы', values: [{ value: link }] };
                        item.custom_fields.push(customer);
                        item.custom_fields.push(linToCreo);
                        item.replacements = true;
                        //let addtask = {...item, custom_fields: [{id: item.contacts.id[0], name: 'Заказчик', values: [{ value: name._embedded.items[0].name } ] }, {name: 'Ссылка на креотивы', values: [{ value: link }] }, ...item.custom_fields ] };
                        let addtask = item;
                        return addtask;
                    })
                    .then(addtask => {

                        let result = doc.amoTasks.find(item => item.id == addtask.id);
                        if (!result) {
                            doc.amoTasks.push(addtask);
                        };

                        doc.save();
                        return addtask;
                    })
                    .then(addtask => {
                        Admin.find({}, (err, admins) => {
                            if (err) return;
                            admins.forEach(item => {
                                if (!item.tasks.works.find(item => item.id == addtask.id)) item.tasks.works.push(addtask);
                                item.save();
                            })
                        })
                    })

                })

              })

          })

    })
//
const updateTask = () => {
    let newTask = [];
    AmoCRM.request
        .get( '/api/v2/leads?status=28958392' )
        .then( data => {
            if (!data.hasOwnProperty('_embedded')) return;

            Tasks.findOne({name: 'amoCRMtasksContainer'}, (err, doc) => {

                data._embedded.items.forEach( item => {
                    let oldTaskId = item.id;
                    if (doc.amoTasks.find(task => task.id == oldTaskId) == undefined )  newTask.push(item)
                })

                newTask.forEach((item, i) => {

                    AmoCRM.request
                      .get(item.contacts._links.self.href)
                      .then( name => {
                          let link = !name._embedded.items[0].custom_fields[0] ? 'ссылка отсутствует' : name._embedded.items[0].custom_fields[0].values[0].value;
                          let customer = {id: item.contacts.id[0], name: 'Заказчик', values: [{ value: name._embedded.items[0].name } ] };
                          let linToCreo = {name: 'Ссылка на креотивы', values: [{ value: link }] };
                          item.custom_fields.push(customer);
                          item.custom_fields.push(linToCreo);
                          //let addtask = {...item, custom_fields: [{id: item.contacts.id[0], name: 'Заказчик', values: [{ value: name._embedded.items[0].name } ] }, {name: 'Ссылка на креотивы', values: [{ value: link }] }, ...item.custom_fields ] };
                          let addtask = item;
                          return addtask;
                      })
                      .then(addtask => {

                          let result = doc.amoTasks.find(item => item.id == addtask.id);
                          if (!result) {
                              doc.amoTasks.push(addtask);
                          };

                          doc.save();
                          return addtask;
                      })
                      .then(addtask => {
                          Admin.find({}, (err, admins) => {
                              if (err) return;
                              admins.forEach(item => {
                                  if (!item.tasks.works.find(item => item.id == addtask.id)) item.tasks.works.push(addtask);
                                  item.save();
                              })
                          })
                      })

                  })


            })

        })
        .then(() => {

          AmoCRM.request
              .get( '/api/v2/leads?status=28958395' )
              .then( data => {
                  if (!data.hasOwnProperty('_embedded')) return;

                  Tasks.findOne({name: 'amoCRMtasksContainer'}, (err, doc) => {

                      data._embedded.items.forEach( item => {
                          let oldTaskId = item.id;
                          if (doc.amoTasks.find(task => task.id == oldTaskId) == undefined )  newTask.push(item)
                      })

                      newTask.forEach((item, i) => {

                          AmoCRM.request
                            .get(item.contacts._links.self.href)
                            .then( name => {
                                let link = !name._embedded.items[0].custom_fields[0] ? 'ссылка отсутствует' : name._embedded.items[0].custom_fields[0].values[0].value;
                                let customer = {id: item.contacts.id[0], name: 'Заказчик', values: [{ value: name._embedded.items[0].name } ] };
                                let linToCreo = {name: 'Ссылка на креотивы', values: [{ value: link }] };
                                item.custom_fields.push(customer);
                                item.custom_fields.push(linToCreo);
                                //let addtask = {...item, custom_fields: [{id: item.contacts.id[0], name: 'Заказчик', values: [{ value: name._embedded.items[0].name } ] }, {name: 'Ссылка на креотивы', values: [{ value: link }] }, ...item.custom_fields ] };
                                let addtask = item;
                                return addtask;
                            })
                            .then(addtask => {

                                let result = doc.amoTasks.find(item => item.id == addtask.id);
                                if (!result) {
                                    doc.amoTasks.push(addtask);
                                };

                                doc.save();
                                return addtask;
                            })
                            .then(addtask => {
                                Admin.find({}, (err, admins) => {
                                    if (err) return;
                                    admins.forEach(item => {
                                        if (!item.tasks.works.find(item => item.id == addtask.id)) item.tasks.works.push(addtask);
                                        item.save();
                                    })
                                })
                            })

                        })


                  })

              })

        })
}

setInterval(() => updateTask(), 1000);

module.exports = AmoCRM;
