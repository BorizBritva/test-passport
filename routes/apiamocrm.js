const amocrm = require('amocrm-js');


// generate ID for tasks data
const createDBid = (min, max) => {
    let id = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(id);
}

//const idTaskData = createDBid(10000000, 99999999);

const AmoCRM = new amocrm({
    // логин пользователя в портале, где адрес портала domain.amocrm.ru
    domain: 'admincrecerru', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
    auth: {
        login: 'admin@crecer.ru',
        hash: '68e5abf63f05cdeeec1cc437208896c9095c4749', // API-ключ доступа
    }
});

AmoCRM.Lead.findById(28958392)
.then( leads => {
    console.log( "Найденное", leads.save() );
})


module.exports = AmoCRM;
