const express = require('express');
const session = require ('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();

async function startServer() {
    try {
        mongoose.connect('mongodb://localhost/dacrm', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true
        })

        mongoose.connection.on('connected', () => { console.log('MongoDB is connect') });
        mongoose.connection.on('error', (err) => { console.log('Error: no connection with MongoDB', err) });

        // app.use((err, req, res, next) => {
        //     if (err.name === 'UnauthorizedError') {
        //         console.log('test')
        //         res.send('tesr')
        //     }
        // })

        require('./routes/apiamocrm');
        require('./config/passportCrm');

        app.use(cors());
        app.use(bodyParser.json());

        app.use('/', require('./routes/auth'));
        app.use('/editor', require('./routes/editor'));
        app.use('/admin', require('./routes/admin'));

        app.use(passport.initialize());
        //app.use(passport.session());

        app.use((err, req, res, next) => {
          if (err.name === 'UnauthorizedError') {
            return res.send({error: 'error'})
          }
        })
        //require('./config/passportCrm')(passport);

        app.listen(4000, () => {
            console.log('Server has been started')
        })

    }
    catch(e) {
        console.log(e, 'Error!')
    }
}

startServer();
